import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface User {
  username: string;
  email: string;
  avatar: string;
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
            <p className="text-muted-foreground mb-4">{user.email}</p>
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
};

export default ProfileView;
