
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/layout/AuthLayout";
import { usePasswordStrength } from "@/hooks/use-password-strength";

// Modify the schema to handle password strength
const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must include uppercase, lowercase, and number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Register() {
  const { register: authRegister } = useAuth();
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  });

  const passwordValue = watch("password") || "";
  const { strength, message, getColor, getPercentage } = usePasswordStrength(passwordValue);

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await authRegister(data.email, data.password, data.fullName);
      toast({
        title: "Registration Successful",
        description: "You have been registered successfully!",
      });
      // Redirect or handle successful registration
    } catch (error) {
      toast({
        title: "Registration Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Enter your information to get started"
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name Input */}
        <div>
          <Input 
            {...register("fullName")}
            placeholder="Full Name" 
            type="text"
          />
          {errors.fullName && (
            <p className="text-destructive text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <Input 
            {...register("email")}
            placeholder="Email" 
            type="email"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <Input 
            {...register("password")}
            placeholder="Password" 
            type="password"
          />
          {passwordValue && (
            <div className="mt-1">
              <div className="h-1 w-full bg-gray-200">
                <div 
                  className={`h-full transition-all duration-300 ${getColor()}`}
                  style={{ width: getPercentage() }}
                />
              </div>
              {message && (
                <p className="text-xs mt-1 text-muted-foreground">{message}</p>
              )}
            </div>
          )}
          {errors.password && (
            <p className="text-destructive text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div>
          <Input 
            {...register("confirmPassword")}
            placeholder="Confirm Password" 
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}
