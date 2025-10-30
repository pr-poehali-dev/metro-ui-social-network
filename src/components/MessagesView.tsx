import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface MessagesViewProps {
  onBack: () => void;
}

const MessagesView = ({ onBack }: MessagesViewProps) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const chats: Chat[] = [
    { id: 1, name: "Анна Смирнова", avatar: "AS", lastMessage: "Отлично, созвонимся завтра!", time: "10:30", unread: 2 },
    { id: 2, name: "Команда проекта", avatar: "КП", lastMessage: "Кто будет на встрече?", time: "09:15", unread: 0 },
    { id: 3, name: "Дмитрий Козлов", avatar: "ДК", lastMessage: "Спасибо за помощь!", time: "Вчера", unread: 0 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-light text-white">Сообщения</h2>
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <Icon name="X" size={24} />
            </Button>
          </div>
          <Input placeholder="Поиск..." className="bg-background border-border text-white" />
        </div>

        <ScrollArea className="flex-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedChat === chat.id ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 bg-primary flex-shrink-0">
                  <div className="flex items-center justify-center w-full h-full text-white font-semibold text-sm">
                    {chat.avatar}
                  </div>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-white truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="bg-destructive text-white border-0 ml-2 flex-shrink-0">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-6 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-primary">
                  <div className="flex items-center justify-center w-full h-full text-white font-semibold text-sm">
                    {chats.find((c) => c.id === selectedChat)?.avatar}
                  </div>
                </Avatar>
                <h3 className="text-xl font-light text-white">
                  {chats.find((c) => c.id === selectedChat)?.name}
                </h3>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-primary text-white px-4 py-2 max-w-md">
                    <p>Привет! Как дела с проектом?</p>
                    <span className="text-xs opacity-70 mt-1 block">10:25</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-card text-foreground px-4 py-2 max-w-md border border-border">
                    <p>Отлично, созвонимся завтра!</p>
                    <span className="text-xs text-muted-foreground mt-1 block">10:30</span>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border bg-card">
              <div className="flex gap-3">
                <Input placeholder="Написать сообщение..." className="flex-1 bg-background border-border text-white" />
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-50" />
              <p>Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesView;
