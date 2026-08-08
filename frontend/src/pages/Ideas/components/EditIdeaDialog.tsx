import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Idea } from "@/types"
import { UPDATE_IDEA } from "@/lib/graphql/mutations/idea"
import { LIST_IDEAS } from "@/lib/graphql/queries/ideas"
import { useMutation } from "@apollo/client/react"

interface EditIdeaDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    idea: Idea | null
    onUpdated?: () => void
}

export function EditIdeaDialog({
    open,
    onOpenChange,
    idea,
    onUpdated,
}: EditIdeaDialogProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        setTitle(idea?.title ?? "")
        setDescription(idea?.description ?? "")
    }, [idea])

    const [updateIdeaMutation, { loading }] = useMutation(UPDATE_IDEA, {
        refetchQueries: [{ query: LIST_IDEAS }],
        onCompleted: () => {
            onUpdated?.()
            onOpenChange(false)
        },
    })

    const handleSubmit = async () => {
        if (!idea) return
        await updateIdeaMutation({
            variables: {
                id: idea.id,
                data: {
                    title,
                    description,
                },
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar ideia</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-idea-title">Título</Label>
                        <Input
                            id="edit-idea-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título da ideia"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-idea-description">Descrição</Label>
                        <Textarea
                            id="edit-idea-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição da ideia"
                            rows={4}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading || !title.trim()}>
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
