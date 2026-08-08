import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Edit, MessageSquare, ThumbsUp, Trash2 } from "lucide-react"
import type { Idea } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatRelativeDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface IdeaCardProps {
    idea: Idea
    onClick: () => void
    isOwner?: boolean
    onEdit?: () => void
    onDelete?: () => void
}

export function IdeaCard({ idea, onClick, isOwner = false, onEdit, onDelete }: IdeaCardProps) {
    return (
        <Card
            key={idea.id}
            onClick={onClick}
            className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
        >
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="bg-zinc-950 text-white text-xs font-medium">
                                {idea.author?.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium truncate">
                            {idea.author?.name || "Usuário"}
                        </span>
                        {isOwner && (
                            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full flex-shrink-0">
                                Você
                            </span>
                        )}

                    </div>

                    {isOwner && (onEdit || onDelete) && (
                        <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                            {onDelete && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border-none"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete()
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 text-slate-700" />
                                </Button>
                            )}
                            {onEdit && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border-none"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onEdit()
                                    }}
                                >
                                    <Edit className="h-4 w-4 text-slate-700" />
                                </Button>
                            )}
                        </div>
                    )}

                </div>
            </CardHeader>
            <CardContent className="space-y-1">
                <div className="hover:text-primary transition-colors text-xl font-semibold line-clamp-2 text-zinc-950">
                    {idea.title}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {idea.description || ""}
                </p>
                <div className="flex items-center justify-between pt-6">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground py-1 px-2.5 border border-zinc-200 rounded-md">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            <span>{idea.comments?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground py-1 px-2.5 border border-zinc-200 rounded-md">
                            <ThumbsUp className="h-4 w-4 text-emerald-500" />
                            <span>{idea.countVotes || 0}</span>
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {formatRelativeDate(idea.createdAt)}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}