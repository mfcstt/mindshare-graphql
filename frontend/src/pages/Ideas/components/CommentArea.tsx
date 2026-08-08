import { ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { Textarea } from "../../../components/ui/textarea"
import { useAuthStore } from "../../../stores/auth"
import type { Idea } from "@/types"

interface CommentAreaProps {
    commentContent: string
    setCommentContent: (value: string) => void
    handleAddComment: () => void
    handleVote: () => void
    idea?: Idea
}

export function CommentArea({
    commentContent,
    setCommentContent,
    handleAddComment,
    handleVote,
    idea,
}: CommentAreaProps) {
    const { user } = useAuthStore()

    return (
        <div className="flex-shrink-0 border-t p-6">
            <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-black text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                    <Textarea
                        placeholder="Digite um comentário"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        rows={3}
                        className="resize-none"
                    />
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            onClick={handleVote}
                            disabled={!user}
                            className={`${idea?.votes?.some((v) => v.userId === user?.id)
                                ? "bg-emerald-100 border-emerald-600 text-emerald-800"
                                : "bg-emerald-50 border-emerald-500 text-emerald-700"
                                } hover:bg-emerald-100`}
                        >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            {idea?.countVotes || 0}
                        </Button>
                        <Button
                            onClick={handleAddComment}
                            disabled={!commentContent.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
                        >
                            Comentar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}