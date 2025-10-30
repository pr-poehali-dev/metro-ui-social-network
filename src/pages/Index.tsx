import { useState, useEffect } from "react";
import AuthScreen from "@/components/AuthScreen";
import HomeView from "@/components/HomeView";
import FeedView from "@/components/FeedView";
import ProfileView from "@/components/ProfileView";
import MessagesView from "@/components/MessagesView";
import NotificationsView from "@/components/NotificationsView";

type View = "home" | "feed" | "profile" | "messages" | "notifications" | "settings";

interface User {
  username: string;
  email: string;
  avatar: string;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
  userVote: "up" | "down" | null;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [user, setUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Анна Смирнова",
      avatar: "AS",
      time: "2 часа назад",
      content: "Отличный день для новых проектов! 🚀 Только что завершила разработку нового дизайна.",
      upvotes: 24,
      downvotes: 3,
      comments: 5,
      shares: 2,
      userVote: null,
    },
    {
      id: 2,
      author: "Дмитрий Козлов",
      avatar: "ДК",
      time: "4 часа назад",
      content: "Кто-нибудь работал с Metro UI? Хочу услышать ваше мнение о подходах к дизайну интерфейсов.",
      upvotes: 18,
      downvotes: 2,
      comments: 12,
      shares: 3,
      userVote: null,
    },
    {
      id: 3,
      author: "Мария Петрова",
      avatar: "МП",
      time: "6 часов назад",
      content: "Запускаем новый стартап! Ищем дизайнеров и разработчиков в команду. 💼",
      upvotes: 45,
      downvotes: 5,
      comments: 23,
      shares: 8,
      userVote: null,
    },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem("fih_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("fih_user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("fih_user");
    setCurrentView("home");
  };

  const handleVote = (postId: number, voteType: "up" | "down") => {
    setPosts(posts.map(post => {
      if (post.id !== postId) return post;
      
      let newUpvotes = post.upvotes;
      let newDownvotes = post.downvotes;
      let newUserVote: "up" | "down" | null = voteType;

      if (post.userVote === voteType) {
        newUserVote = null;
        if (voteType === "up") newUpvotes--;
        else newDownvotes--;
      } else if (post.userVote === null) {
        if (voteType === "up") newUpvotes++;
        else newDownvotes++;
      } else {
        if (voteType === "up") {
          newUpvotes++;
          newDownvotes--;
        } else {
          newDownvotes++;
          newUpvotes--;
        }
      }

      return { ...post, upvotes: newUpvotes, downvotes: newDownvotes, userVote: newUserVote };
    }));
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === "home" && (
        <HomeView 
          user={user} 
          onLogout={handleLogout} 
          onNavigate={setCurrentView} 
        />
      )}
      {currentView === "feed" && (
        <FeedView 
          posts={posts} 
          onBack={() => setCurrentView("home")} 
          onVote={handleVote} 
        />
      )}
      {currentView === "profile" && (
        <ProfileView 
          user={user} 
          onBack={() => setCurrentView("home")} 
        />
      )}
      {currentView === "messages" && (
        <MessagesView onBack={() => setCurrentView("home")} />
      )}
      {currentView === "notifications" && (
        <NotificationsView onBack={() => setCurrentView("home")} />
      )}
    </div>
  );
};

export default Index;
