import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send, Paperclip, Minimize2, Maximize2, Bot, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      text: "¡Hola! Soy tu asistente de IA para el sistema Equipers 4x4. Puedo ayudarte con información del sistema, crear usuarios, módulos, permisos y completar formularios automáticamente. ¿En qué puedo ayudarte?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<"openai" | "gemini">("openai");
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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Convert messages to the format expected by the edge function
      const conversationMessages = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));

      // Add the current message
      conversationMessages.push({
        role: 'user',
        content: currentInput
      });

      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          messages: conversationMessages,
          provider: provider,
          action: 'chat'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "No pude procesar tu consulta.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta de nuevo.",
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
      {/* Floating AI Assistant Button - Siri Style Grayscale */}
      {isMinimized && (
        <div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
          onClick={onToggleMinimize}
        >
          <div className="relative">
            {/* Outer glow - Siri breathing effect */}
            <div className="absolute -inset-12 rounded-full bg-gradient-to-r from-gray-900/20 via-gray-700/20 via-gray-500/20 to-gray-900/20 animate-pulse blur-2xl"></div>
            
            {/* Middle aura - Color shifting */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-gray-800/30 via-gray-600/30 via-gray-400/30 via-gray-600/30 to-gray-800/30 animate-spin-slow blur-lg"></div>
            
            {/* Inner aura - Siri wave effect */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-gray-700/40 via-gray-500/40 via-gray-300/40 to-gray-700/40 animate-bounce blur-md" style={{animationDuration: '3s'}}></div>
            
            {/* Main Siri button - Grayscale circular */}
            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 via-gray-700 via-gray-600 to-black shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-[0_0_60px_rgba(0,0,0,0.8)] group overflow-hidden animate-gradient-x">
              {/* Inner gradient overlay - Siri shimmer */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/20 animate-pulse"></div>
              
              {/* Siri wave rings */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                {/* Outer wave ring */}
                <div className="absolute inset-0 rounded-full border-2 border-gray-300/30 animate-ping" style={{animationDuration: '2s'}}></div>
                
                {/* Middle wave ring */}
                <div className="absolute inset-2 rounded-full border border-gray-200/40 animate-ping" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}></div>
                
                {/* Inner wave ring */}
                <div className="absolute inset-4 rounded-full border border-white/50 animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
                
                {/* Central pulse */}
                <div className="absolute inset-6 rounded-full bg-gray-200/20 animate-pulse"></div>
              </div>
              
              {/* Siri voice wave visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center space-x-1">
                  <div className="w-1 bg-white/90 rounded-full animate-bounce" style={{height: '8px', animationDelay: '0s', animationDuration: '1.5s'}}></div>
                  <div className="w-1 bg-gray-200/90 rounded-full animate-bounce" style={{height: '12px', animationDelay: '0.2s', animationDuration: '1.5s'}}></div>
                  <div className="w-1 bg-white/90 rounded-full animate-bounce" style={{height: '16px', animationDelay: '0.4s', animationDuration: '1.5s'}}></div>
                  <div className="w-1 bg-gray-200/90 rounded-full animate-bounce" style={{height: '12px', animationDelay: '0.6s', animationDuration: '1.5s'}}></div>
                  <div className="w-1 bg-white/90 rounded-full animate-bounce" style={{height: '8px', animationDelay: '0.8s', animationDuration: '1.5s'}}></div>
                </div>
              </div>
              
              {/* Subtle pulsing border */}
              <div className="absolute inset-0 rounded-full border border-gray-400/30 animate-pulse"></div>
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
                    {provider === 'openai' ? <Bot className="h-5 w-5 text-white" /> : <Brain className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                      Asistente IA
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {provider === 'openai' ? 'OpenAI GPT' : 'Google Gemini'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={provider} onValueChange={(value: "openai" | "gemini") => setProvider(value)}>
                    <SelectTrigger className="w-24 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="gemini">Gemini</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleMinimize}
                    className="h-8 w-8 p-0 hover:bg-accent transition-all duration-200 hover:scale-110"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-[420px] animate-fade-in">

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
                    placeholder="Pregunta sobre usuarios, crear formularios, completar datos..."
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