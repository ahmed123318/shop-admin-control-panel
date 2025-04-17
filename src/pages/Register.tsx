
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

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

  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;
    return Math.min(strength, 5); // Cap at 5
  };

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

  // Watch password to update strength
  const passwordValue = watch("password");
  React.useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(passwordValue || ""));
  }, [passwordValue]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
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
            {/* Password Strength Indicator */}
            <div className="h-1 w-full bg-gray-200 mt-1">
              <div 
                className={`h-full transition-all duration-300 ${
                  passwordStrength === 1 ? 'bg-red-500 w-1/5' :
                  passwordStrength === 2 ? 'bg-orange-500 w-2/5' :
                  passwordStrength === 3 ? 'bg-yellow-500 w-3/5' :
                  passwordStrength === 4 ? 'bg-green-500 w-4/5' :
                  passwordStrength === 5 ? 'bg-green-600 w-full' : 'bg-gray-200 w-0'
                }`}
              />
            </div>
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
      </div>
    </div>
  );
}
