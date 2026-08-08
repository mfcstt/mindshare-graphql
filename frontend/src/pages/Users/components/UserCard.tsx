import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, Trash2, Crown, User as UserIcon } from "lucide-react"
import type { User } from "@/types"

interface UserCardProps {
    user: User
    isCurrentUser?: boolean
    onEdit?: () => void
    onDelete?: () => void
}

export function UserCard({
    user,
    isCurrentUser = false,
    onEdit,
    onDelete,
}: UserCardProps) {
    const getInitials = (name?: string) => {
        if (!name) return "U"
        return name
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const isAdmin = user.role === "admin" || user.role === "owner"

    return (
        <Card className="hover:shadow-md transition-shadow bg-white border border-gray-100 rounded-xl overflow-hidden">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarFallback className="bg-zinc-950 text-white font-semibold text-sm">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-base text-gray-900 truncate">
                                    {user.name}
                                </p>
                                <p className="text-sm text-muted-foreground truncate mt-0.5">
                                    {user.email}
                                </p>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    {isAdmin ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                                            <Crown className="h-3 w-3 text-indigo-600" />
                                            Admin
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                            <UserIcon className="h-3 w-3 text-gray-500" />
                                            Membro
                                        </span>
                                    )}
                                    {isCurrentUser && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                                            Você
                                        </span>
                                    )}
                                </div>

                            </div>

                            {(onEdit || onDelete) && (
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                    {onDelete && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border-none disabled:opacity-40"
                                            onClick={onDelete}
                                            disabled={isCurrentUser}
                                        >
                                            <Trash2 className="h-4 w-4 text-slate-700" />
                                        </Button>
                                    )}
                                    {onEdit && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border-none"
                                            onClick={onEdit}
                                        >
                                            <Edit className="h-4 w-4 text-slate-700" />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}