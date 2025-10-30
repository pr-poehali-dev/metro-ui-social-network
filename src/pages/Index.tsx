import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

type View = "home" | "feed" | "profile" | "messages" | "notifications" | "settings";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const tiles = [
    { id: "feed", icon: "Newspaper", label: "Лента", color: "bg-[hsl(var(--metro-blue))]", size: "large" },
    { id: "profile", icon: "User", label: "Профиль", color: "bg-[hsl(var(--metro-green))]", size: "small" },
    { id: "messages", icon: "MessageSquare", label: "Сообщения", color: "bg-[hsl(var(--metro-purple))]", size: "small", count: 3 },
    { id: "notifications", icon: "Bell", label: "Уведомления", color: "bg-[hsl(var(--metro-orange))]", size: "medium", count: 7 },
    { id: "settings", icon: "Settings", label: "Настройки", color: "bg-[hsl(var(--muted))]", size: "small" },
  ];

  const posts = [
    {
      id: 1,
      author: "Анна Смирнова",
      avatar: "AS",
      time: "2 часа назад",
      content: "Отличный день для новых проектов! 🚀 Только что завершила разработку нового дизайна.",
      likes: 24,
      comments: 5,
      shares: 2,
    },
    {
      id: 2,
      author: "Дмитрий Козлов",
      avatar: "ДК",
      time: "4 часа назад",
      content: "Кто-нибудь работал с Metro UI? Хочу услышать ваше мнение о подходах к дизайну интерфейсов.",
      likes: 18,
      comments: 12,
      shares: 3,
    },
    {
      id: 3,
      author: "Мария Петрова",
      avatar: "МП",
      time: "6 часов назад",
      content: "Запускаем новый стартап! Ищем дизайнеров и разработчиков в команду. 💼",
      likes: 45,
      comments: 23,
      shares: 8,
    },
  ];

  const chats = [
    { id: 1, name: "Анна Смирнова", avatar: "AS", lastMessage: "Отлично, созвонимся завтра!", time: "10:30", unread: 2 },
    { id: 2, name: "Команда проекта", avatar: "КП", lastMessage: "Кто будет на встрече?", time: "09:15", unread: 0 },
    { id: 3, name: "Дмитрий Козлов", avatar: "ДК", lastMessage: "Спасибо за помощь!", time: "Вчера", unread: 0 },
  ];

  const notifications = [
    { id: 1, type: "like", user: "Анна Смирнова", action: "оценила ваш пост", time: "5 мин назад" },
    { id: 2, type: "comment", user: "Дмитрий Козлов", action: "прокомментировал", time: "1 час назад" },
    { id: 3, type: "friend", user: "Мария Петрова", action: "добавила вас в друзья", time: "2 часа назад" },
    { id: 4, type: "share", user: "Иван Иванов", action: "поделился вашим постом", time: "3 часа назад" },
  ];

  const renderHome = () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-white mb-1">FIH</h1>
            <p className="text-sm text-muted-foreground">Альфа 1.0</p>
          </div>
          <Avatar className="h-12 w-12 bg-primary">
            <div className="flex items-center justify-center w-full h-full text-white font-semibold">
              ВА
            </div>
          </Avatar>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
          {tiles.map((tile) => (
            <Card
              key={tile.id}
              onClick={() => setCurrentView(tile.id as View)}
              className={`${tile.color} ${
                tile.size === "large" ? "col-span-2 row-span-2" : 
                tile.size === "medium" ? "col-span-2" : ""
              } border-0 cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-95 flex flex-col items-center justify-center text-white relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <Icon name={tile.icon as any} size={tile.size === "large" ? 48 : 32} className="mb-3 relative z-10" />
              <span className="text-lg font-light relative z-10">{tile.label}</span>
              {tile.count && (
                <Badge className="absolute top-3 right-3 bg-destructive text-white border-0 z-10">
                  {tile.count}
                </Badge>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeed = () => (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView("home")} className="text-white">
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h2 className="text-2xl font-light text-white">Лента новостей</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <Icon name="Plus" size={24} />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-card border-border p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-12 w-12 bg-primary">
                <div className="flex items-center justify-center w-full h-full text-white font-semibold text-sm">
                  {post.avatar}
                </div>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium text-white">{post.author}</h3>
                <p className="text-sm text-muted-foreground">{post.time}</p>
              </div>
            </div>
            <p className="text-foreground mb-4">{post.content}</p>
            <div className="flex items-center gap-6 text-muted-foreground">
              <button className="flex items-center gap-2 hover:text-[hsl(var(--metro-red))] transition-colors">
                <Icon name="Heart" size={20} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[hsl(var(--metro-blue))] transition-colors">
                <Icon name="MessageCircle" size={20} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[hsl(var(--metro-green))] transition-colors">
                <Icon name="Share2" size={20} />
                <span>{post.shares}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView("home")} className="text-white mb-4">
            <Icon name="ArrowLeft" size={24} />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-start gap-6 mb-8">
          <Avatar className="h-32 w-32 bg-primary">
            <div className="flex items-center justify-center w-full h-full text-white font-semibold text-4xl">
              ВА
            </div>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-3xl font-light text-white mb-2">Вася Алексеев</h2>
            <p className="text-muted-foreground mb-4">UX/UI Дизайнер • Москва</p>
            <div className="flex gap-6 mb-4">
              <div>
                <div className="text-2xl font-light text-white">248</div>
                <div className="text-sm text-muted-foreground">Друзей</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white">1,234</div>
                <div className="text-sm text-muted-foreground">Подписчиков</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white">89</div>
                <div className="text-sm text-muted-foreground">Постов</div>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Редактировать профиль
            </Button>
          </div>
        </div>

        <Card className="bg-card border-border p-6 mb-4">
          <h3 className="text-xl font-light text-white mb-4">О себе</h3>
          <p className="text-foreground">
            Увлекаюсь созданием интерфейсов и работой с Metro UI. Люблю минимализм и чистый дизайн.
            Открыт к новым проектам и коллаборациям.
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-[hsl(var(--metro-blue))] border-0 p-6 text-white">
            <Icon name="Briefcase" size={32} className="mb-3" />
            <div className="text-2xl font-light mb-1">12</div>
            <div className="text-sm opacity-90">Проектов</div>
          </Card>
          <Card className="bg-[hsl(var(--metro-green))] border-0 p-6 text-white">
            <Icon name="Users" size={32} className="mb-3" />
            <div className="text-2xl font-light mb-1">5</div>
            <div className="text-sm opacity-90">Групп</div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="min-h-screen bg-background flex">
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-light text-white">Сообщения</h2>
            <Button variant="ghost" size="icon" onClick={() => setCurrentView("home")} className="text-white">
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

  const renderNotifications = () => (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView("home")} className="text-white">
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-2xl font-light text-white">Уведомления</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {notifications.map((notif) => (
          <Card key={notif.id} className="bg-card border-border p-4 mb-3 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                notif.type === "like" ? "bg-[hsl(var(--metro-red))]" :
                notif.type === "comment" ? "bg-[hsl(var(--metro-blue))]" :
                notif.type === "friend" ? "bg-[hsl(var(--metro-green))]" :
                "bg-[hsl(var(--metro-orange))]"
              }`}>
                <Icon
                  name={
                    notif.type === "like" ? "Heart" :
                    notif.type === "comment" ? "MessageCircle" :
                    notif.type === "friend" ? "UserPlus" :
                    "Share2"
                  }
                  size={20}
                  className="text-white"
                />
              </div>
              <div className="flex-1">
                <p className="text-white">
                  <span className="font-medium">{notif.user}</span> {notif.action}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{notif.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {currentView === "home" && renderHome()}
      {currentView === "feed" && renderFeed()}
      {currentView === "profile" && renderProfile()}
      {currentView === "messages" && renderMessages()}
      {currentView === "notifications" && renderNotifications()}
    </div>
  );
};

export default Index;
