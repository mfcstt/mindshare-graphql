import { Page } from "@/components/Page"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateIdeaDialog } from "./components/CreateIdeaDialog"
export function IdeasPage() {

  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-3xl font-medium text-indigo-600" >
              Ideias
            </Label>
          </div>
          <Button onClick={() => setOpenDialog(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Nova Ideia
          </Button>

        </div>

      </div>
      <CreateIdeaDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </Page>
  )
}
