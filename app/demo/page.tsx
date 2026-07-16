"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Eye, Edit2, Trash2, Phone, Mail, Building2, Calendar, User, Briefcase, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { useMockData, DemoUser } from "@/contexts/MockDataContext"
import { cn } from "@/lib/utils"

const STATUS_OPTIONS = ["Pending", "Demo Scheduled", "Completed", "Converted", "Expired"] as const

function DemoUserDetailModal({ user, open, onOpenChange, onEdit }: {
  user: DemoUser | null
  open: boolean
  onOpenChange: (v: boolean) => void
  onEdit: () => void
}) {
  if (!user) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary text-sm border border-primary/10">
              {user.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
            </div>
            <div>
              <DialogTitle className="text-base">{user.name}</DialogTitle>
              <DialogDescription className="text-xs">{user.id} · {user.role} at {user.company}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "Phone", value: user.phone },
              { icon: Building2, label: "Company", value: user.company },
              { icon: Briefcase, label: "Role", value: user.role },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border bg-muted/20 p-3 space-y-1">
                <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                  <Icon className="h-3 w-3" />{label}
                </p>
                <p className="text-sm font-semibold truncate">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border bg-muted/20 p-3 space-y-1">
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />Request Date
              </p>
              <p className="text-sm font-semibold">{new Date(user.requestDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
            </div>
            <div className="rounded-xl border bg-muted/20 p-3 space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Status</p>
              <StatusBadge status={user.status} />
            </div>
          </div>

          {user.scheduledAt && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 flex items-start gap-2.5">
              <Clock className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-blue-800">Demo Scheduled</p>
                <p className="text-sm text-blue-700">{new Date(user.scheduledAt).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
          )}

          {user.notes && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                <FileText className="h-3 w-3" />Notes
              </p>
              <div className="rounded-xl border bg-muted/20 p-3 text-sm text-foreground/80 leading-relaxed">{user.notes}</div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onEdit} className="gap-1.5">
            <Edit2 className="h-4 w-4" /> Edit
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DemoUserEditModal({ user, open, onOpenChange }: {
  user: DemoUser | null
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const { updateDemoUser, convertDemoToUser } = useMockData()
  const [status, setStatus] = useState<DemoUser["status"]>(user?.status ?? "Pending")
  const [notes, setNotes] = useState(user?.notes ?? "")
  const [plan, setPlan] = useState<"Demo" | "Starter" | "Standard" | "Pro" | "Optional">("Demo")

  if (!user) return null

  const handleSave = () => {
    if (plan !== "Demo") {
      let credits = 50
      if (plan === "Starter") credits = 500
      if (plan === "Standard") credits = 2000
      if (plan === "Pro") credits = 5000
      if (plan === "Optional") credits = 0 // Custom/optional, default 0

      convertDemoToUser(user.id, plan, credits)
      toast.success(`Demo user converted to ${plan} plan successfully`)
    } else {
      updateDemoUser(user.id, { status, notes })
      toast.success("Demo user updated successfully")
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Edit Demo User</DialogTitle>
          <DialogDescription>Update status and notes for {user.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as DemoUser["status"])}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Convert Plan</label>
            <select
              value={plan}
              onChange={e => setPlan(e.target.value as any)}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Demo">Keep as Demo</option>
              <option value="Starter">Starter (500 credits)</option>
              <option value="Standard">Standard (2000 credits)</option>
              <option value="Pro">Pro (5000 credits)</option>
              <option value="Optional">Optional (Custom)</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">Select a paid plan to convert this demo user to a regular user.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              placeholder="Add internal notes..."
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteDemoModal({ user, open, onOpenChange }: {
  user: DemoUser | null
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const { deleteDemoUser } = useMockData()
  if (!user) return null
  const handleDelete = () => {
    deleteDemoUser(user.id)
    toast.success("Demo user deleted")
    onOpenChange(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Delete Demo User?</DialogTitle>
          <DialogDescription>This action cannot be undone. <span className="font-medium text-foreground">{user.name}</span> will be permanently removed.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function DemoUsersPage() {
  const { demoUsers } = useMockData()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<DemoUser["status"] | "All">("All")
  const [viewUser, setViewUser] = useState<DemoUser | null>(null)
  const [editUser, setEditUser] = useState<DemoUser | null>(null)
  const [deleteUser, setDeleteUser] = useState<DemoUser | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const filtered = demoUsers.filter(u => {
    const q = search.toLowerCase()
    const matchesSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.company.toLowerCase().includes(q)
    const matchesStatus = statusFilter === "All" || u.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleView = (user: DemoUser) => { setViewUser(user); setIsViewOpen(true) }
  const handleEdit = (user: DemoUser) => { setEditUser(user); setIsEditOpen(true) }
  const handleDelete = (user: DemoUser) => { setDeleteUser(user); setIsDeleteOpen(true) }

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    "Demo Scheduled": "bg-blue-100 text-blue-700",
    Completed: "bg-emerald-100 text-emerald-700",
    Converted: "bg-violet-100 text-violet-700",
    Expired: "bg-slate-100 text-slate-600",
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-bold tracking-tight">Demo Users</h1>
        <p className="text-muted-foreground mt-1">Track and manage demo requests and their conversion pipeline.</p>
      </motion.div>

      {/* Stats row */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(["All", ...STATUS_OPTIONS] as const).map(s => {
          const count = s === "All" ? demoUsers.length : demoUsers.filter(u => u.status === s).length
          return (
            <button key={s} onClick={() => setStatusFilter(s as any)}
              className={cn("rounded-xl border p-3 text-left transition-all hover:shadow-sm", statusFilter === s ? "border-primary/30 bg-primary/5 shadow-sm" : "bg-card hover:bg-muted/30")}>
              <p className="text-xs text-muted-foreground font-medium">{s}</p>
              <p className={cn("text-xl font-bold mt-0.5", statusFilter === s ? "text-primary" : "text-foreground")}>{count}</p>
            </button>
          )
        })}
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-9 w-full sm:w-80 rounded-lg border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-all"
        />
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/40 border-b">
              <tr>
                {["Name", "Phone", "Company", "Request Date", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3.5 font-medium text-muted-foreground whitespace-nowrap text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <AnimatePresence>
                {filtered.length > 0 ? filtered.map((user, i) => (
                  <motion.tr key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="group hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleView(user)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {user.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground leading-tight">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-muted-foreground text-xs">{user.phone}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="font-medium">{user.company}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        {new Date(user.requestDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => handleView(user)}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => handleEdit(user)}>
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(user)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-muted-foreground">No demo users found</p>
                        <p className="text-sm text-muted-foreground/70">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        <div className="border-t px-5 py-3 bg-muted/20 text-xs text-muted-foreground">
          Showing {filtered.length} of {demoUsers.length} demo users
        </div>
      </motion.div>

      <DemoUserDetailModal user={viewUser} open={isViewOpen} onOpenChange={setIsViewOpen} onEdit={() => { setIsViewOpen(false); setEditUser(viewUser); setIsEditOpen(true) }} />
      <DemoUserEditModal user={editUser} open={isEditOpen} onOpenChange={setIsEditOpen} />
      <DeleteDemoModal user={deleteUser} open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    </div>
  )
}
