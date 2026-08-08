import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { data } from "react-router-dom";
import { toast } from "sonner";
import { CREATE_IDEA } from "@/lib/graphql/mutations/idea";

interface CreateIdeaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreated?: () => void;
}

export function CreateIdeaDialog({
    open,
    onOpenChange,
    onCreated
}: CreateIdeaDialogProps) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [createIdea, { loading }] = useMutation(CREATE_IDEA, {
        onCompleted() {
            toast.success("Idea criada com sucesso")
            onOpenChange(false)
            onCreated?.()
            setTitle('')
            setDescription('')
        },
        onError() {
            toast.error("Falha ao criar a ideia")
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        createIdea({
            variables: {
                data: {
                    title,
                    description
                }
            }
        })

    }

    const handleCancel = () => {
        setTitle('')
        setDescription('')
        onOpenChange(false)
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-xl">Compartilhe sua ideia</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Adicione uma nova ideia para seu time
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                    <div className="space-y-1">
                        <Label htmlFor="title" >Título</Label>
                        <Input
                            id="title"
                            placeholder="Dê um nome para a ideia"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="description" >Descrição</Label>
                        <Textarea
                            id="description"
                            placeholder="Descreva sua ideia"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            className="resize-none"
                            disabled={loading}
                        />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={handleCancel}
                            className="cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                        >
                            Salvar
                        </Button>

                    </div>

                </form>

            </DialogContent>



        </Dialog>
    )
}