"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Server, Database, PhoneCall, Webhook } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const healthData = [
  { name: "API Server", status: "Operational", uptime: "99.99%", ping: "24ms", icon: Server, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Database", status: "Operational", uptime: "99.98%", ping: "12ms", icon: Database, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Calling Engine", status: "Degraded", uptime: "98.45%", ping: "145ms", icon: PhoneCall, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Webhooks", status: "Operational", uptime: "100%", ping: "45ms", icon: Webhook, color: "text-emerald-500", bg: "bg-emerald-500/10" },
]

export function SystemHealth() {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-4 px-1">System Health</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {healthData.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
          >
            <Card className="hover:border-border/80 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl", item.bg, item.color)}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <div className={cn("h-1.5 w-1.5 rounded-full", item.status === "Operational" ? "bg-emerald-500" : "bg-amber-500")} />
                      <p className="text-xs text-muted-foreground">{item.status}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{item.uptime}</p>
                    <p className="text-xs text-muted-foreground">{item.ping}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
