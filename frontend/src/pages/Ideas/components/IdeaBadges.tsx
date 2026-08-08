import { Lightbulb, MessageSquare, ThumbsUp } from "lucide-react"
import type { IdeaStats } from "@/lib/utils"


interface IdeaBadgesProps {
    stats: IdeaStats
}

export function IdeaBadges({ stats }: IdeaBadgesProps) {
    const { totalIdeas, totalComments, totalVotes } = stats

    return (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-900">
                <Lightbulb className="h-3.5 w-3.5 text-indigo-700" />
                <span>
                    <strong className="font-semibold">{totalIdeas}</strong>{" "}
                    {totalIdeas === 1 ? "ideia" : "ideias"}
                </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
                <MessageSquare className="h-3.5 w-3.5 text-blue-700" />
                <span>
                    <strong className="font-semibold">{totalComments}</strong>{" "}
                    {totalComments === 1 ? "comentário" : "comentários"}
                </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-900">
                <ThumbsUp className="h-3.5 w-3.5 text-emerald-700" />
                <span>
                    <strong className="font-semibold">{totalVotes}</strong>{" "}
                    {totalVotes === 1 ? "voto" : "votos"}
                </span>
            </div>
        </div>
    )
}
