import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import funcUrls from "../../backend/func2url.json";

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
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await fetch(funcUrls.auth, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Ошибка входа");
        setLoading(false);
        return;
      }
      
      const user: User = {
        username: data.user.username,
        email: data.user.email,
        avatar: data.user.avatar,
      };
      
      onLogin(user);
      setLoginForm({ username: "", password: "" });
    } catch (err) {
      setError("Ошибка соединения с сервером");
    }
    
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }
    
    if (registerForm.username.length < 3) {
      setError("Имя должно быть минимум 3 символа");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(funcUrls.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerForm.username,
          password: registerForm.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Ошибка регистрации");
        setLoading(false);
        return;
      }
      
      const user: User = {
        username: data.user.username,
        email: data.user.email,
        avatar: data.user.avatar,
      };
      
      onLogin(user);
      setRegisterForm({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError("Ошибка соединения с сервером");
    }
    
    setLoading(false);
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

        {error && (
          <div className="mb-4 p-3 bg-destructive/20 border border-destructive text-destructive rounded">
            {error}
          </div>
        )}

        {authView === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Имя аккаунта</label>
              <Input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="bg-background border-border text-white"
                placeholder="username"
                required
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading}>
              {loading ? "Вход..." : "Войти"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Имя аккаунта</label>
              <Input
                type="text"
                value={registerForm.username}
                onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                className="bg-background border-border text-white"
                placeholder="username"
                required
                disabled={loading}
                minLength={3}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default AuthScreen;