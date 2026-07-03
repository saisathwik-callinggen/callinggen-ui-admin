"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  Pie, 
  PieChart,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Cell
} from "recharts"

const userGrowthData = [
  { name: "Jan", users: 4000 },
  { name: "Feb", users: 5500 },
  { name: "Mar", users: 7000 },
  { name: "Apr", users: 10500 },
  { name: "May", users: 14000 },
  { name: "Jun", users: 18000 },
  { name: "Jul", users: 24592 },
]

const creditsData = [
  { name: "Mon", credits: 120 },
  { name: "Tue", credits: 180 },
  { name: "Wed", credits: 240 },
  { name: "Thu", credits: 190 },
  { name: "Fri", credits: 310 },
  { name: "Sat", credits: 450 },
  { name: "Sun", credits: 380 },
]

const revenueData = [
  { name: "Jan", revenue: 20000 },
  { name: "Feb", revenue: 35000 },
  { name: "Mar", revenue: 45000 },
  { name: "Apr", revenue: 70000 },
  { name: "May", revenue: 95000 },
  { name: "Jun", revenue: 110000 },
  { name: "Jul", revenue: 124500 },
]

const planDistributionData = [
  { name: "Free Tier", value: 65 },
  { name: "Pro", value: 25 },
  { name: "Enterprise", value: 10 },
]

const COLORS = ["#6C4CF1", "#38BDF8", "#F472B6", "#818CF8", "#C084FC"]

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C4CF1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6C4CF1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#6C4CF1", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="users" stroke="#6C4CF1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Credits Usage (k)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={creditsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <Tooltip 
                  cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#38BDF8", fontWeight: "bold" }}
                />
                <Bar dataKey="credits" fill="#38BDF8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#F472B6", fontWeight: "bold" }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#F472B6" strokeWidth={3} dot={{ r: 4, fill: "#F472B6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {planDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
