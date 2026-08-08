import { Calendar, ChevronsUpDown } from "lucide-react"
import type { SortOption } from "@/lib/utils"


interface IdeaSortFilterProps {
    sortBy: SortOption
    onSortChange: (sortBy: SortOption) => void
}

export function IdeaSortFilter({ sortBy, onSortChange }: IdeaSortFilterProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Ordenar por:
            </span>
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-800 text-sm font-medium rounded-xl pl-9 pr-8 py-2 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                    <option value="recent">Mais recentes</option>
                    <option value="votes">Mais votadas</option>
                    <option value="comments">Mais comentadas</option>
                    <option value="oldest">Mais antigas</option>
                </select>
                <Calendar className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronsUpDown className="h-3.5 w-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
    )
}
