import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface SystemInfo {
  modules: any[];
  users: any[];
  userPermissions: any[];
}

async function getSystemInfo(): Promise<SystemInfo> {
  try {
    // Get modules
    const { data: modules } = await supabase
      .from('modules')
      .select('*');

    // Get users
    const { data: users } = await supabase
      .from('users')
      .select('*');

    // Get user permissions
    const { data: userPermissions } = await supabase
      .from('user_module_permissions')
      .select('*');

    return {
      modules: modules || [],
      users: users || [],
      userPermissions: userPermissions || []
    };
  } catch (error) {
    console.error('Error getting system info:', error);
    return {
      modules: [],
      users: [],
      userPermissions: []
    };
  }
}

async function callOpenAI(messages: any[], systemPrompt: string) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1500
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.choices[0].message.content;
}

async function callGemini(messages: any[], systemPrompt: string) {
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiApiKey) {
    throw new Error('Gemini API key not configured');
  }

  // Convert messages to Gemini format
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  // Add system instruction as first user message
  contents.unshift({
    role: 'user',
    parts: [{ text: systemPrompt }]
  });

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      }
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, action, provider = 'openai' } = await req.json();

    // Get system information
    const systemInfo = await getSystemInfo();

    // Create system prompt with current system information
    const systemPrompt = `
Eres un asistente de IA especializado en el sistema Equipers 4x4. Tu función es ayudar a los usuarios con información del sistema y completar formularios automáticamente.

INFORMACIÓN DEL SISTEMA ACTUAL:

MÓDULOS DISPONIBLES:
${systemInfo.modules.map(m => `- ${m.name}: ${m.description || 'Sin descripción'}`).join('\n')}

USUARIOS DEL SISTEMA:
${systemInfo.users.map(u => `- ID: ${u.id}, Usuario: ${u.username}, Perfil: ${u.profile}, Último login: ${u.last_login || 'Nunca'}`).join('\n')}

PERMISOS DE USUARIOS:
${systemInfo.userPermissions.map(p => `- Usuario ID ${p.user_id}, Módulo ID ${p.module_id}, Ver: ${p.can_view}, Editar: ${p.can_edit}`).join('\n')}

CAPACIDADES:
1. Responder preguntas sobre el sistema
2. Ayudar a crear nuevos usuarios, módulos, permisos
3. Proporcionar información sobre el estado actual del sistema
4. Sugerir formularios o datos para completar

Responde de manera útil y precisa. Si el usuario quiere agregar algo al sistema, proporciona sugerencias específicas con los datos exactos que deberían usar.
`;

    let response;
    
    if (provider === 'gemini') {
      response = await callGemini(messages, systemPrompt);
    } else {
      response = await callOpenAI(messages, systemPrompt);
    }

    return new Response(JSON.stringify({ 
      response,
      systemInfo: action === 'getSystemInfo' ? systemInfo : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error',
      response: 'Lo siento, hubo un error procesando tu solicitud. Por favor intenta de nuevo.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});