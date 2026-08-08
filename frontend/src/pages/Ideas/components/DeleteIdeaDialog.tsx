import { useMutation } from "@apollo/client/react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Idea } from "@/types"
import { DELETE_IDEA } from "@/lib/graphql/mutations/idea"
import { LIST_IDEAS } from "@/lib/graphql/queries/ideas"

interface DeleteIdeaDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    idea: Idea | null
    onDeleted?: () => void
}

export function DeleteIdeaDialog({
    open,
    onOpenChange,
    idea,
    onDeleted,
}: DeleteIdeaDialogProps) {
    const [deleteIdeaMutation, { loading }] = useMutation(DELETE_IDEA, {
        refetchQueries: [{ query: LIST_IDEAS }],
        onCompleted: () => {
            onDeleted?.()
            onOpenChange(false)
        },
    })

    const handleDeleteIdea = async () => {
        if (!idea) return
        await deleteIdeaMutation({
            variables: {
                id: idea.id,
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remover Ideia</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    Tem certeza que deseja remover a ideia
                    <span className="font-medium"> "{idea?.title}"</span>? Essa ação não
                    poderá ser desfeita.
                </p>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteIdea}
                        disabled={loading}
                    >
                        Remover
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
