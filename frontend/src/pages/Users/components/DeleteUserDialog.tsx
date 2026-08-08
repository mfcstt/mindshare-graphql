import { useMutation } from "@apollo/client/react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import type { User } from "@/types"
import { DELETE_USER } from "@/lib/graphql/mutations/User"
import { LIST_USERS } from "@/lib/graphql/queries/users"


interface DeleteUserDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: User | null
}

export function DeleteUserDialog({
    open,
    onOpenChange,
    user,
}: DeleteUserDialogProps) {
    const [deleteUserMutation, { loading }] = useMutation(DELETE_USER, {
        onCompleted: () => {
            onOpenChange(false)
        },
        refetchQueries: [LIST_USERS],
    })

    const handledeleteUser = async () => {
        if (!user) return
        await deleteUserMutation({
            variables: {
                id: user.id,
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remover Usuário</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    Tem certeza que deseja remover
                    <span className="font-medium"> {user?.name}</span>? Essa ação não
                    poderá ser desfeita.
                </p>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handledeleteUser}
                        disabled={loading}
                    >
                        Remover
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}