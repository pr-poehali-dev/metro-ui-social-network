import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

type View = "home" | "feed" | "profile" | "messages" | "notifications" | "settings";

interface User {
  username: string;
  email: string;
  avatar: string;
}

interface HomeViewProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: View) => void;
}

const HomeView = ({ user, onLogout, onNavigate }: HomeViewProps) => {
  const tiles = [
    { id: "feed", icon: "Newspaper", label: "Лента", color: "bg-[hsl(var(--metro-blue))]", size: "large" },
    { id: "profile", icon: "User", label: "Профиль", color: "bg-[hsl(var(--metro-green))]", size: "small" },
    { id: "messages", icon: "MessageSquare", label: "Сообщения", color: "bg-[hsl(var(--metro-purple))]", size: "small", count: 3 },
    { id: "notifications", icon: "Bell", label: "Уведомления", color: "bg-[hsl(var(--metro-orange))]", size: "medium", count: 7 },
    { id: "settings", icon: "Settings", label: "Настройки", color: "bg-[hsl(var(--muted))]", size: "small" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-white mb-1">FIH</h1>
            <p className="text-sm text-muted-foreground">Альфа 1.0</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <p className="text-sm text-white">{user.username}</p>
              <button onClick={onLogout} className="text-xs text-muted-foreground hover:text-white">
                Выйти
              </button>
            </div>
            <Avatar className="h-12 w-12 bg-primary">
              <div className="flex items-center justify-center w-full h-full text-white font-semibold">
                {user.avatar}
              </div>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
          {tiles.map((tile) => (
            <Card
              key={tile.id}
              onClick={() => onNavigate(tile.id as View)}
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
};

export default HomeView;
