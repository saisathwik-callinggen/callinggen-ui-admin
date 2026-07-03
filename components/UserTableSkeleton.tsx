"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function UserTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Toolbar Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-9 w-full max-w-sm rounded-md bg-muted/60 animate-pulse" />
      </div>

      {/* Table Skeleton */}
      <Card className="overflow-hidden border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                {Array.from({ length: 8 }).map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-4 w-20 rounded bg-muted/60 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 8 }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {colIndex === 1 ? (
                        <div className="space-y-2">
                          <div className="h-4 w-24 rounded bg-muted/60 animate-pulse" />
                          <div className="h-3 w-32 rounded bg-muted/40 animate-pulse" />
                        </div>
                      ) : colIndex === 7 ? (
                        <div className="h-8 w-8 rounded-md bg-muted/60 animate-pulse ml-auto" />
                      ) : (
                        <div className="h-4 w-16 rounded bg-muted/60 animate-pulse" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
