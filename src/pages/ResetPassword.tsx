
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Loader2, RefreshCw, AlertCircle, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AuthLayout from "@/components/layout/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";
import { usePasswordStrength } from "@/hooks/use-password-strength";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();
  const { resetPassword, loading } = useAuth();
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [passwordValue, setPasswordValue] = useState("");
  const { getColor, getPercentage, message } = usePasswordStrength(passwordValue);
  
  useEffect(() => {
    // Check token validity
    if (!token) {
      setIsValidToken(false);
      return;
    }
    
    // For demo purposes, we'll consider "valid-token" as valid
    // In a real app, you would verify this token with your backend
    setIsValidToken(token === "valid-token");
  }, [token]);
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    if (isValidToken) {
      await resetPassword(token, values.password);
    }
  }

  // If no token or invalid token, show error
  if (isValidToken === false) {
    return (
      <AuthLayout 
        title="Invalid or expired link"
        subtitle="This password reset link is invalid or has expired."
      >
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The password reset link you've used is invalid or has expired.
          </AlertDescription>
        </Alert>
        
        <Button asChild className="w-full">
          <Link to="/forgot-password">
            Request a new link
          </Link>
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset your password"
      subtitle="Create a new password for your account"
      footer={
        <Button variant="link" asChild>
          <Link to="/login" className="flex items-center text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      {...field}
                      onChange={(e) => {
                        setPasswordValue(e.target.value);
                        field.onChange(e);
                      }}
                      disabled={loading}
                    />
                  </div>
                </FormControl>
                {passwordValue && (
                  <div className="mt-2">
                    <Progress value={getPercentage()} className={`h-2 ${getColor()}`} />
                    <p className="text-xs mt-1 text-muted-foreground">{message}</p>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      {...field}
                      disabled={loading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting password...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset password
              </>
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
