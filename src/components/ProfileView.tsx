import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface User {
  username: string;
  email: string;
  avatar: string;
  role?: string;
}

interface ProfileViewProps {
  user: User;
  onBack: () => void;
}

const ProfileView = ({ user, onBack }: ProfileViewProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mb-4">
            <Icon name="ArrowLeft" size={24} />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-start gap-6 mb-8">
          <Avatar className="h-32 w-32 bg-primary">
            <div className="flex items-center justify-center w-full h-full text-white font-semibold text-4xl">
              {user.avatar}
            </div>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-3xl font-light text-white mb-2">{user.username}</h2>
            {user.role && (
              <p className="text-primary font-medium mb-2">
                {user.role === "creator" ? "Создатель" : user.role === "admin" ? "Администратор" : "Пользователь"}
              </p>
            )}
            <p className="text-muted-foreground mb-4">{user.email}</p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Редактировать профиль
            </Button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProfileView;