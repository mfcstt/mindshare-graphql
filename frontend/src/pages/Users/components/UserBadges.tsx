import { Crown, User } from "lucide-react"
import type { UserStats } from "@/lib/utils"

interface UserBadgesProps {
    stats: UserStats
}

export function UserBadges({ stats }: UserBadgesProps) {
    const { totalAdmins, totalMembers } = stats

    return (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-900">
                <Crown className="h-3.5 w-3.5 text-indigo-700" />
                <span>
                    <strong className="font-semibold">{totalAdmins}</strong>{" "}
                    {totalAdmins === 1 ? "admin" : "admins"}
                </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-900">
                <User className="h-3.5 w-3.5 text-purple-700" />
                <span>
                    <strong className="font-semibold">{totalMembers}</strong>{" "}
                    {totalMembers === 1 ? "membro" : "membros"}
                </span>
            </div>
        </div>
    )
}
