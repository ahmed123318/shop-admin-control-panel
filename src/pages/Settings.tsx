
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Define available accent colors
const accentColors = [
  { name: "Purple", value: "#6941c6", class: "bg-[#6941c6]" },
  { name: "Blue", value: "#0ea5e9", class: "bg-[#0ea5e9]" },
  { name: "Green", value: "#10b981", class: "bg-[#10b981]" },
  { name: "Orange", value: "#f97316", class: "bg-[#f97316]" },
  { name: "Red", value: "#ef4444", class: "bg-[#ef4444]" }
];

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAccentColor, setSelectedAccentColor] = useState(accentColors[0].value);
  const [sidebarPosition, setSidebarPosition] = useState("left");
  const { toast } = useToast();

  // Handle accent color change
  const handleAccentColorChange = (colorValue: string) => {
    setSelectedAccentColor(colorValue);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary', colorValue);
    
    toast({
      title: "Appearance updated",
      description: "Accent color has been changed successfully.",
    });
  };

  // Handle appearance settings save
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance saved",
      description: "Your appearance preferences have been saved.",
    });
  };

  // Handle general settings save
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your store information has been updated successfully.",
    });
  };

  // Handle account settings save
  const handleUpdateAccount = () => {
    toast({
      title: "Account updated",
      description: "Your account information has been updated successfully.",
    });
  };

  // Handle notification settings save
  const handleSaveNotifications = () => {
    toast({
      title: "Notifications saved",
      description: "Your notification preferences have been saved.",
    });
  };

  // Handle billing settings save
  const handleSaveBilling = () => {
    toast({
      title: "Billing updated",
      description: "Your billing information has been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your store preferences and configuration
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4 grid grid-cols-3 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your store information and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Store Information</h3>
                  <p className="text-sm text-muted-foreground">Update your store details</p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" defaultValue="My Awesome Shop" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="store-url">Store URL</Label>
                    <Input id="store-url" defaultValue="my-awesome-shop" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="store-email">Contact Email</Label>
                    <Input id="store-email" type="email" defaultValue="contact@myawesomeshop.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="store-phone">Contact Phone</Label>
                    <Input id="store-phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Store Address</h3>
                  <p className="text-sm text-muted-foreground">Set your store's physical address</p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="address-line1">Address Line 1</Label>
                    <Input id="address-line1" defaultValue="123 E-Commerce St" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address-line2">Address Line 2</Label>
                    <Input id="address-line2" defaultValue="Suite 100" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="San Francisco" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Input id="state" defaultValue="CA" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input id="zip" defaultValue="94105" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  <p className="text-sm text-muted-foreground">Update your account details</p>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Admin" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="User" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@example.com" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">Change your password</p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleUpdateAccount}>Update Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive email notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Select notification types</h4>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Order</Label>
                        <p className="text-sm text-muted-foreground">When a customer places a new order</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock</Label>
                        <p className="text-sm text-muted-foreground">When product inventory is running low</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Returns</Label>
                        <p className="text-sm text-muted-foreground">When a customer requests a return</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Updates</Label>
                        <p className="text-sm text-muted-foreground">News and feature updates</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Manage your billing information and plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Current Plan</h3>
                  <div className="mt-2 flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">Business Plan</h4>
                      <p className="text-sm text-muted-foreground">$49/month, billed monthly</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Payment Method</h3>
                  <div className="mt-2 flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-muted p-2 text-muted-foreground">
                        <span className="text-sm font-medium">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 04/24</p>
                      </div>
                    </div>
                    <Button variant="outline">Update</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Billing Address</h3>
                  <div className="mt-2 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="Acme Inc." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-email">Billing Email</Label>
                      <Input id="billing-email" type="email" defaultValue="billing@acme.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-address">Billing Address</Label>
                      <Textarea id="billing-address" defaultValue="123 Business Ave, Suite 500, San Francisco, CA 94105, USA" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveBilling}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how your admin dashboard looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Toggle dark mode on/off</p>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium">Accent Color</h3>
                  <p className="text-sm text-muted-foreground">Choose your preferred accent color</p>
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {accentColors.map((color) => (
                      <div
                        key={color.value}
                        className={`h-10 w-full cursor-pointer rounded-md ${color.class} ${
                          selectedAccentColor === color.value 
                            ? "ring-2 ring-offset-2" 
                            : ""
                        }`}
                        onClick={() => handleAccentColorChange(color.value)}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected: {accentColors.find(c => c.value === selectedAccentColor)?.name || "Purple"}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium">Sidebar Position</h3>
                  <p className="text-sm text-muted-foreground">Choose the position of the sidebar</p>
                  <div className="mt-4">
                    <Select defaultValue={sidebarPosition} onValueChange={setSidebarPosition}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveAppearance}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
