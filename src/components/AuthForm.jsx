import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/components/CartContext";
import { signInWithEmail } from "@/lib/auth";

export const AuthForm = () => {
  const [mode, setMode] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { login } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (mode === "signin") {
        const { user } = await signInWithEmail(email, password);
        login(user.email, password);
        toast({
          title: user.isSuperUser 
            ? "Welcome back, Super User!" 
            : "Welcome back!",
          description: user.isSuperUser 
            ? "You now have admin privileges." 
            : "You're now logged in.",
        });
        navigate("/");
      } else {
        throw new Error("Super user registration is not allowed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : mode === "signin" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-sm text-amber-600 hover:text-amber-700 underline"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>


      </div>
    </div>
  );
};