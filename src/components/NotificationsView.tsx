import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Notification {
  id: number;
  type: "like" | "comment" | "friend" | "share";
  user: string;
  action: string;
  time: string;
}

interface NotificationsViewProps {
  onBack: () => void;
}

const NotificationsView = ({ onBack }: NotificationsViewProps) => {
  const notifications: Notification[] = [
    { id: 1, type: "like", user: "Анна Смирнова", action: "оценила ваш пост", time: "5 мин назад" },
    { id: 2, type: "comment", user: "Дмитрий Козлов", action: "прокомментировал", time: "1 час назад" },
    { id: 3, type: "friend", user: "Мария Петрова", action: "добавила вас в друзья", time: "2 часа назад" },
    { id: 4, type: "share", user: "Иван Иванов", action: "поделился вашим постом", time: "3 часа назад" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
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
};

export default NotificationsView;
