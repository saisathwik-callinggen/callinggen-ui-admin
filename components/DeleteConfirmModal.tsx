"use client"

import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMockData } from "@/contexts/MockDataContext"
import { User } from "./UserDetailsDrawer"

type DeleteConfirmModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userToDelete: User | null
  onSuccess?: () => void
}

export function DeleteConfirmModal({ open, onOpenChange, userToDelete, onSuccess }: DeleteConfirmModalProps) {
  const { deleteUser } = useMockData()

  const handleDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id)
      toast.success("User deleted successfully")
      onOpenChange(false)
      onSuccess?.()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete User?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user{" "}
            <span className="font-medium text-foreground">{userToDelete?.id}</span> and remove all of their data from the servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
