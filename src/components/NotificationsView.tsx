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
  const notifications: Notification[] = [];

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
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Bell" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-lg">Нет уведомлений</p>
          </div>
        ) : (
          <>
            {notifications.map((notif) => (
              <Card key={notif.id} className="bg-card border-border p-4 mb-3">
                <p className="text-white">{notif.action}</p>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsView;