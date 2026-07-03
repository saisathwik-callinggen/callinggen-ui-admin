import { cn } from "@/lib/utils"

type StatusVariant =
  | "Active" | "Inactive" | "Suspended"
  | "Pending" | "Approved" | "Rejected"
  | "Demo Scheduled" | "Completed" | "Converted" | "Expired"
  | "Monthly" | "Annual" | "Custom"
  | "Free Tier" | "Pro" | "Enterprise"
  | "Regular" | "Demo"

const styles: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Converted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",

  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Demo Scheduled": "bg-blue-50 text-blue-700 ring-blue-600/20",

  Inactive: "bg-slate-100 text-slate-600 ring-slate-500/20",
  Expired: "bg-slate-100 text-slate-600 ring-slate-500/20",

  Suspended: "bg-red-50 text-red-700 ring-red-600/20",
  Rejected: "bg-red-50 text-red-700 ring-red-600/20",

  Enterprise: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Pro: "bg-blue-50 text-blue-700 ring-blue-600/20",
  "Free Tier": "bg-slate-100 text-slate-600 ring-slate-500/20",

  Monthly: "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
  Annual: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  Custom: "bg-purple-50 text-purple-700 ring-purple-600/20",

  Regular: "bg-slate-100 text-slate-600 ring-slate-500/20",
  Demo: "bg-orange-50 text-orange-700 ring-orange-600/20",
}

export function StatusBadge({ status, className }: { status: StatusVariant | string; className?: string }) {
  const style = styles[status] ?? "bg-slate-100 text-slate-600 ring-slate-500/20"
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
      style,
      className
    )}>
      {status}
    </span>
  )
}
