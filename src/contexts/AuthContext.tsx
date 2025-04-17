
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Mock API call - replace with actual API when integrating backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login (replace with actual auth logic)
      if (email === 'admin@example.com' && password === 'password123') {
        const mockUser = { id: '1', email, name: 'Admin User' };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast({
          title: "Success!",
          description: "You have successfully logged in.",
          variant: "default",
        });
        navigate('/');
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Incorrect email or password.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (): Promise<boolean> => {
    try {
      setLoading(true);
      // Mock Google login - replace with actual Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      const mockUser = { id: '2', email: 'google@example.com', name: 'Google User' };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Success!",
        description: "You have successfully logged in with Google.",
        variant: "default",
      });
      
      navigate('/');
      return true;
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Login failed",
        description: "Failed to login with Google. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      const mockUser = { id: '3', email, name };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
        variant: "default",
      });
      
      navigate('/');
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password reset email sent",
        description: `If an account exists for ${email}, you will receive a password reset link.`,
      });
      return true;
    } catch (error) {
      console.error("Forgot password error:", error);
      toast({
        title: "Failed to send reset email",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate token (mock)
      if (token !== 'valid-token') {
        toast({
          title: "Invalid or expired token",
          description: "Please request a new password reset link.",
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Password reset successful",
        description: "You can now log in with your new password.",
      });
      
      navigate('/login');
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        title: "Failed to reset password",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        googleLogin,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
