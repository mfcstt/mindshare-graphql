import { Page } from "@/components/Page"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState, useMemo } from "react"
import { CreateIdeaDialog } from "./components/CreateIdeaDialog"
import { useQuery } from "@apollo/client/react"
import { LIST_IDEAS } from "@/lib/graphql/queries/ideas"
import type { Idea } from "@/types"
import { IdeaCard } from "./components/IdeaCard"
import { IdeaDetailDrawer } from "./components/IdeaDetailDrawer"
import { IdeaBadges } from "./components/IdeaBadges"
import { IdeaSortFilter } from "./components/IdeaSortFilter"
import { calculateIdeaStats, sortIdeas, type SortOption } from "@/lib/utils"


export function IdeasPage() {

  const [openDialog, setOpenDialog] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("recent")

  const { data, loading, error, refetch } = useQuery<{ getAllIdeas: Idea[] }>(LIST_IDEAS)

  const ideas = data?.getAllIdeas ?? []

  const stats = useMemo(() => calculateIdeaStats(ideas), [ideas])
  const sortedIdeas = useMemo(() => sortIdeas(ideas, sortBy), [ideas, sortBy])

  const handleIdeaClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId)
    setOpenDrawer(true)
  }

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Label className="text-3xl font-medium text-indigo-600">
              Ideias
            </Label>
            <IdeaBadges stats={stats} />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <IdeaSortFilter sortBy={sortBy} onSortChange={setSortBy} />

            <Button onClick={() => setOpenDialog(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              Nova Ideia
            </Button>
          </div>
        </div>

        {loading && <p className="text-gray-500 pt-6">Carregando ideias...</p>}
        {error && <p className="text-red-500 pt-6">Erro ao carregar ideias: {error.message}</p>}

        {!loading && !error && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
            {sortedIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onClick={() => handleIdeaClick(idea.id)}
              />
            ))}
          </div>
        )}

      </div>
      <IdeaDetailDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        ideaId={selectedIdeaId}
      />
      <CreateIdeaDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={refetch}
      />
    </Page>
  )
}


