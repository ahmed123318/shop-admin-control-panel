
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

// Reset Password Schema
const resetPasswordSchema = z.object({
  newPassword: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must include uppercase, lowercase, and number"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema)
  });

  // Extract reset token from URL
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get('token');

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    if (!resetToken) {
      toast({
        title: "Invalid Reset Token",
        description: "No reset token found. Please request a new password reset.",
        variant: "destructive",
      });
      return;
    }

    try {
      await resetPassword(resetToken, data.newPassword);
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset. Please log in with your new password.",
      });

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      toast({
        title: "Password Reset Error",
        description: error instanceof Error ? error.message : "An error occurred during password reset",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password Input */}
          <div>
            <Input 
              {...register("newPassword")}
              placeholder="New Password" 
              type="password"
            />
            {errors.newPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <Input 
              {...register("confirmPassword")}
              placeholder="Confirm New Password" 
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
