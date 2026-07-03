"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const activities = [
  { id: 1, title: "New Enterprise Plan", time: "10 mins ago", type: "success" },
  { id: 2, title: "API Limit Reached - DemoUser4", time: "1 hr ago", type: "warning" },
  { id: 3, title: "Server Restart Completed", time: "3 hrs ago", type: "info" },
  { id: 4, title: "Database Backup Success", time: "5 hrs ago", type: "success" },
]

const recentUsers = [
  { name: "Acme Corp", email: "admin@acme.com", plan: "Enterprise", status: "Active" },
  { name: "Jane Smith", email: "jane@startup.io", plan: "Pro", status: "Active" },
  { name: "Demo User", email: "demo234@gmail.com", plan: "Free Tier", status: "Inactive" },
  { name: "TechFlow", email: "team@techflow.dev", plan: "Pro", status: "Active" },
]

export function RecentActivity() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mt-4">
      {/* Activity Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity, i) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {i !== activities.length - 1 && (
                    <div className="absolute left-1.5 top-5 h-full w-px bg-border" />
                  )}
                  <div className={cn(
                    "relative mt-1 h-3 w-3 shrink-0 rounded-full border-2 bg-background",
                    activity.type === "success" && "border-emerald-500",
                    activity.type === "warning" && "border-amber-500",
                    activity.type === "info" && "border-blue-500",
                  )} />
                  <div className="flex flex-col gap-1 pb-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Users Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} className="lg:col-span-2">
        <Card className="h-full overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Users</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground border-y">
                <tr>
                  <th className="px-6 py-3 font-medium">User / Company</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Plan</th>
                  <th className="px-6 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentUsers.map((user) => (
                  <tr key={user.email} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        user.plan === "Enterprise" && "bg-primary/10 text-primary",
                        user.plan === "Pro" && "bg-blue-500/10 text-blue-600",
                        user.plan === "Free Tier" && "bg-slate-500/10 text-slate-600",
                      )}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          user.status === "Active" ? "bg-emerald-500" : "bg-slate-300"
                        )} />
                        <span className="text-muted-foreground">{user.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
