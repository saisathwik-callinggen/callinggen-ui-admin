"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Eye, Check, X, Building2, Mail, CreditCard, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { useMockData, PricingRequest } from "@/contexts/MockDataContext"
import { cn } from "@/lib/utils"

function PricingRequestModal({ request, open, onOpenChange, onApprove, onReject }: {
  request: PricingRequest | null
  open: boolean
  onOpenChange: (v: boolean) => void
  onApprove: () => void
  onReject: () => void
}) {
  if (!request) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
            Pricing Request
          </DialogTitle>
          <DialogDescription>{request.id} · Submitted {new Date(request.requestedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Requester Info */}
          <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Name</p>
                <p className="font-semibold">{request.name}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Organization</p>
                <p className="font-semibold flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-muted-foreground" />{request.organization}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Email</p>
                <p className="font-medium flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{request.email}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Status</p>
                <StatusBadge status={request.status} />
              </div>
            </div>
          </div>

          {/* Credits & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Credits Selected</p>
              <p className="text-2xl font-bold text-primary">{request.creditsSelected.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Billing Type</p>
              <StatusBadge status={request.type} className="text-sm px-3 py-1" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" />Message</p>
            <div className="rounded-xl border bg-muted/20 p-4 text-sm text-foreground/80 leading-relaxed">
              {request.message}
            </div>
          </div>
        </div>

        {request.status === "Pending" && (
          <DialogFooter className="gap-2">
            <Button variant="outline" className="gap-1.5 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={onReject}>
              <X className="h-4 w-4" /> Reject
            </Button>
            <Button className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onApprove}>
              <Check className="h-4 w-4" /> Approve
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function PricingRequestsPage() {
  const { pricingRequests, updatePricingRequest } = useMockData()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All")
  const [selectedRequest, setSelectedRequest] = useState<PricingRequest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filtered = pricingRequests.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.organization.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "All" || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleView = (request: PricingRequest) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  const handleApprove = (id: string) => {
    updatePricingRequest(id, { status: "Approved" })
    toast.success("Pricing request approved successfully")
    setIsModalOpen(false)
  }

  const handleReject = (id: string) => {
    updatePricingRequest(id, { status: "Rejected" })
    toast.error("Pricing request rejected")
    setIsModalOpen(false)
  }

  const counts = {
    All: pricingRequests.length,
    Pending: pricingRequests.filter(r => r.status === "Pending").length,
    Approved: pricingRequests.filter(r => r.status === "Approved").length,
    Rejected: pricingRequests.filter(r => r.status === "Rejected").length,
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-bold tracking-tight">Pricing Requests</h1>
        <p className="text-muted-foreground mt-1">Review and action plan upgrade requests from users.</p>
      </motion.div>

      {/* Filter Tabs + Search */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border">
          {(["All", "Pending", "Approved", "Rejected"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                statusFilter === s ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              )}>
              {s}
              <span className={cn("text-xs rounded-full px-1.5 py-0.5 font-semibold",
                s === "Pending" ? "bg-amber-100 text-amber-700" :
                s === "Approved" ? "bg-emerald-100 text-emerald-700" :
                s === "Rejected" ? "bg-red-100 text-red-700" :
                "bg-muted text-muted-foreground"
              )}>{counts[s]}</span>
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by name, org, or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-9 w-full sm:w-72 rounded-lg border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-all"
        />
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/40 border-b">
              <tr>
                {["Name", "Organization", "Credits", "Type", "Requested", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3.5 font-medium text-muted-foreground whitespace-nowrap text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <AnimatePresence>
                {filtered.length > 0 ? filtered.map((request, i) => (
                  <motion.tr key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="group hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleView(request)}
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-foreground">{request.name}</p>
                        <p className="text-xs text-muted-foreground">{request.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="font-medium">{request.organization}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-primary">{request.creditsSelected.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={request.type} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        {new Date(request.requestedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={request.status} /></td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5">
                        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground hover:text-foreground" onClick={() => handleView(request)}>
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                        {request.status === "Pending" && (
                          <>
                            <Button size="sm" className="h-8 gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5" onClick={() => handleApprove(request.id)}>
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 gap-1 border-red-200 text-red-600 hover:bg-red-50 px-2.5" onClick={() => handleReject(request.id)}>
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-muted-foreground">No pricing requests found</p>
                        <p className="text-sm text-muted-foreground/70">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        <div className="border-t px-5 py-3 bg-muted/20 text-xs text-muted-foreground">
          Showing {filtered.length} of {pricingRequests.length} requests
        </div>
      </motion.div>

      <PricingRequestModal
        request={selectedRequest}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onApprove={() => selectedRequest && handleApprove(selectedRequest.id)}
        onReject={() => selectedRequest && handleReject(selectedRequest.id)}
      />
    </div>
  )
}
