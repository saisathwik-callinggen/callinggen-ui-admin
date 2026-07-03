"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMockData } from "@/contexts/MockDataContext"
import { cn } from "@/lib/utils"

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { notifications, markAllNotificationsRead } = useMockData()
  
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" 
          />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl border bg-card p-4 shadow-xl z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 text-xs text-primary hover:text-primary hover:bg-transparent"
                  onClick={markAllNotificationsRead}
                >
                  <Check className="mr-1 h-3 w-3" /> Mark all read
                </Button>
              )}
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 -mr-1">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div key={notification.id} className="flex gap-3 items-start relative group">
                    <div className={cn(
                      "mt-1 h-2 w-2 shrink-0 rounded-full",
                      notification.read ? "bg-muted" : "bg-primary"
                    )} />
                    <div>
                      <p className={cn(
                        "text-sm font-medium leading-none mb-1",
                        notification.read ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No notifications.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
