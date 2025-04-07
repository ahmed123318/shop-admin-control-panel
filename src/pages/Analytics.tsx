
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { name: "Jan", sales: 4000, visitors: 2400, conversions: 240 },
  { name: "Feb", sales: 3000, visitors: 1398, conversions: 139 },
  { name: "Mar", sales: 2000, visitors: 9800, conversions: 980 },
  { name: "Apr", sales: 2780, visitors: 3908, conversions: 390 },
  { name: "May", sales: 1890, visitors: 4800, conversions: 480 },
  { name: "Jun", sales: 2390, visitors: 3800, conversions: 380 },
  { name: "Jul", sales: 3490, visitors: 4300, conversions: 430 },
  { name: "Aug", sales: 4000, visitors: 2400, conversions: 240 },
  { name: "Sep", sales: 5000, visitors: 6800, conversions: 680 },
  { name: "Oct", sales: 4500, visitors: 5500, conversions: 550 },
  { name: "Nov", sales: 6000, visitors: 4200, conversions: 420 },
  { name: "Dec", sales: 7000, visitors: 7800, conversions: 780 },
];

const weeklyData = [
  { name: "Mon", sales: 1000, visitors: 1200, conversions: 120 },
  { name: "Tue", sales: 1200, visitors: 1400, conversions: 140 },
  { name: "Wed", sales: 1500, visitors: 1600, conversions: 160 },
  { name: "Thu", sales: 1300, visitors: 1300, conversions: 130 },
  { name: "Fri", sales: 1700, visitors: 1800, conversions: 180 },
  { name: "Sat", sales: 1600, visitors: 2000, conversions: 200 },
  { name: "Sun", sales: 1100, visitors: 1700, conversions: 170 },
];

const conversionData = [
  { name: "Homepage", rate: 3.2 },
  { name: "Product Page", rate: 4.8 },
  { name: "Cart", rate: 9.6 },
  { name: "Checkout", rate: 12.3 },
  { name: "Category Page", rate: 2.8 },
  { name: "Search Results", rate: 5.2 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Track and analyze your store performance
        </p>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly and weekly sales data</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly" className="pt-4">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ borderRadius: "8px" }}
                          formatter={(value) => [`$${value}`, "Sales"]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#6941c6"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="weekly" className="pt-4">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={weeklyData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ borderRadius: "8px" }}
                          formatter={(value) => [`$${value}`, "Sales"]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#6941c6"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Traffic</CardTitle>
              <CardDescription>Monthly and weekly visitor data</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly" className="pt-4">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ borderRadius: "8px" }} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="visitors"
                          stroke="#10b981"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="weekly" className="pt-4">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={weeklyData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ borderRadius: "8px" }} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="visitors"
                          stroke="#10b981"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rates</CardTitle>
              <CardDescription>Page-by-page conversion performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conversionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ borderRadius: "8px" }}
                      formatter={(value) => [`${value}%`, "Conversion Rate"]} 
                    />
                    <Legend />
                    <Bar dataKey="rate" fill="#6941c6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
