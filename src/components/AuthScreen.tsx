import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthView = "login" | "register";

interface User {
  username: string;
  email: string;
  avatar: string;
}

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [authView, setAuthView] = useState<AuthView>("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      username: loginForm.email.split("@")[0],
      email: loginForm.email,
      avatar: loginForm.email.substring(0, 2).toUpperCase(),
    };
    onLogin(newUser);
    setLoginForm({ email: "", password: "" });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    const newUser: User = {
      username: registerForm.username,
      email: registerForm.email,
      avatar: registerForm.username.substring(0, 2).toUpperCase(),
    };
    onLogin(newUser);
    setRegisterForm({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-card border-border p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light tracking-tight text-white mb-1">FIH</h1>
          <p className="text-sm text-muted-foreground">Альфа 1.0</p>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setAuthView("login")}
            className={`flex-1 ${authView === "login" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
          >
            Вход
          </Button>
          <Button
            onClick={() => setAuthView("register")}
            className={`flex-1 ${authView === "register" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
          >
            Регистрация
          </Button>
        </div>

        {authView === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <Input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="bg-background border-border text-white"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Пароль</label>
              <Input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="bg-background border-border text-white"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
              Войти
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Имя пользователя</label>
              <Input
                type="text"
                value={registerForm.username}
                onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                className="bg-background border-border text-white"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <Input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                className="bg-background border-border text-white"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Пароль</label>
              <Input
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                className="bg-background border-border text-white"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Подтверждение пароля</label>
              <Input
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                className="bg-background border-border text-white"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
              Зарегистрироваться
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default AuthScreen;
