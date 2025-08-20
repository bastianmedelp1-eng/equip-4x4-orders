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
    <>
      {/* Floating AI Assistant Button */}
      {isMinimized && (
        <div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
          onClick={onToggleMinimize}
        >
          <div className="relative">
            {/* Outer aura - breathing slowly */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-gray-800/30 via-gray-600/20 to-gray-800/30 animate-aura-breathe blur-lg"></div>
            
            {/* Middle aura - pulsing slowly */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-gray-700/40 via-gray-500/30 to-gray-700/40 animate-aura-pulse-slow blur-md"></div>
            
            {/* Inner aura - drifting slowly */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-gray-600/50 via-gray-400/40 to-gray-600/50 animate-aura-drift-slow blur-sm"></div>
            
            {/* Core glow - subtle breathing */}
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-gray-500/60 via-gray-300/50 to-gray-500/60 animate-aura-breathe blur-xs"></div>
            
            {/* Main button - circular */}
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(100,100,100,0.4)] group overflow-hidden">
              {/* Inner gradient overlay */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-600/40 via-transparent to-black/40"></div>
              
              {/* Inner circular forms - rotating */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-gray-400/20 animate-aura-drift-slow"></div>
                
                {/* Middle ring */}
                <div className="absolute inset-1 rounded-full border border-gray-300/30 animate-aura-drift-slow" style={{animationDirection: 'reverse', animationDuration: '20s'}}></div>
                
                {/* Inner spiral forms */}
                <div className="absolute inset-2 rounded-full">
                  {/* Rotating inner circles */}
                  <div className="absolute top-1 left-1/2 w-2 h-2 bg-gray-300/40 rounded-full animate-aura-drift-slow transform -translate-x-1/2"></div>
                  <div className="absolute bottom-1 left-1/2 w-1.5 h-1.5 bg-gray-400/30 rounded-full animate-aura-drift-slow transform -translate-x-1/2" style={{animationDirection: 'reverse', animationDuration: '12s'}}></div>
                  <div className="absolute left-1 top-1/2 w-1 h-1 bg-gray-200/50 rounded-full animate-aura-drift-slow transform -translate-y-1/2" style={{animationDuration: '8s'}}></div>
                  <div className="absolute right-1 top-1/2 w-1 h-1 bg-gray-300/40 rounded-full animate-aura-drift-slow transform -translate-y-1/2" style={{animationDirection: 'reverse', animationDuration: '10s'}}></div>
                </div>
                
                {/* Central swirling effect */}
                <div className="absolute inset-3 rounded-full border border-gray-200/20 animate-aura-drift-slow" style={{animationDuration: '25s'}}></div>
              </div>
              
              {/* Subtle pulsing border */}
              <div className="absolute inset-0 rounded-full border border-gray-500/20 animate-aura-breathe"></div>
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <MessageCircle className="h-6 w-6 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {!isMinimized && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[700px] animate-scale-in animate-fade-in">
          <Card className="shadow-2xl border border-border h-[500px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                    Asistente IA
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleMinimize}
                  className="h-8 w-8 p-0 hover:bg-accent transition-all duration-200 hover:scale-110"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-[420px] animate-fade-in">
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
          </Card>
        </div>
      )}
    </>
  );
};

export default AIChat;