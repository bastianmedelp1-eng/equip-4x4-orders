import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Paperclip, Minimize2, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

const AIChat = ({ isMinimized = false, onToggleMinimize }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy tu asistente de IA para el sistema Equipers 4x4. Puedo ayudarte con preguntas sobre usuarios, pedidos, productos, estadísticas y más. ¿En qué puedo ayudarte?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Archivo adjuntado",
        description: `${file.name} - Funcionalidad en desarrollo`,
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key requerida",
        description: "Por favor ingresa tu OpenAI API Key para usar el chat con IA",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Eres un asistente experto en el sistema Equipers 4x4, un sistema de gestión empresarial para negocios de equipamiento 4x4. El sistema incluye:

MÓDULOS PRINCIPALES:
- Productos: Gestión de productos, marcas, modelos, accesorios, listas de cúpulas, racks y especiales
- Pedidos y Ventas: Creación de pedidos, cotizaciones, búsqueda de precios, historial de ventas
- Finanzas: Control de gastos, categorías de gasto, estadísticas financieras
- Personas: Usuarios del sistema, vendedores, trabajadores
- Operaciones: Búsqueda de órdenes de trabajo, corte láser, escaneo QR
- Herramientas: Gestión y vista de herramientas
- Agenda: Calendario para programar actividades

CARACTERÍSTICAS:
- Sistema web responsive
- Gestión de inventarios
- Control de ventas y cotizaciones
- Administración de personal
- Reportes y estadísticas
- Herramientas operativas

Responde siempre en español y de manera útil, enfocándote en cómo el sistema puede ayudar con sus necesidades comerciales específicas.`
            },
            {
              role: "user",
              content: inputValue
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "No pude procesar tu consulta.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Verifica tu API Key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <Card className={`shadow-xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Asistente IA - Equipers 4x4
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMinimize}
              className="h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
          </CardTitle>
        </CardHeader>

        {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[520px]">
          {showApiKeyInput && !apiKey && (
            <div className="p-4 bg-muted">
              <p className="text-sm mb-2">Ingresa tu OpenAI API Key:</p>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="text-xs"
                />
                <Button
                  size="sm"
                  onClick={() => setShowApiKeyInput(false)}
                  disabled={!apiKey}
                >
                  OK
                </Button>
              </div>
            </div>
          )}

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFileAttachment}
                className="px-3"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Escribe tu pregunta sobre el sistema Equipers 4x4..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIChat;