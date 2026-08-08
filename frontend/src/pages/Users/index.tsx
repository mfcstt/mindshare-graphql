import { Plus, Search } from "lucide-react"
import { Page } from "@/components/Page"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"
import { useQuery } from "@apollo/client/react"
import type { User } from "@/types"
import { useAuthStore } from "@/stores/auth"

import { UserCard } from "./components/UserCard"
import { UserBadges } from "./components/UserBadges"
import { LIST_USERS } from "@/lib/graphql/queries/users"
import { DeleteUserDialog } from "./components/DeleteUserDialog"
import { EditUserDialog } from "./components/EditUserDialog"
import { InviteUserDialog } from "./components/InviteUser"
import { calculateUserStats } from "@/lib/utils"

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openInviteDialog, setOpenInviteDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditMemberDialog, setOpenEditMemberDialog] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const currentUserId = useAuthStore((state) => state.user?.id)
  const { data, loading, error, refetch } = useQuery<{ listUsers: User[] }>(
    LIST_USERS
  )

  const handleAddUser = () => {
    setOpenInviteDialog(true)
  }
  const handleEditUser = (editUser: User) => {
    setUser(editUser)
    setOpenEditMemberDialog(true)
  }
  const handleDeleteUser = (deleteUser: User) => {
    setUser(deleteUser)
    setOpenDeleteDialog(true)
  }

  const users = data?.listUsers ?? []

  const stats = useMemo(() => calculateUserStats(users), [users])

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return users
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
    )
  }, [users, searchQuery])

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium text-indigo-600">Usuários</h1>
            <UserBadges stats={stats} />
          </div>

          <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-2">
              <Label htmlFor="search" className="text-sm whitespace-nowrap">
                Busque membros:
              </Label>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome ou e-mail"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 max-w-[200px]"
                />
              </div>
            </div>
            <Button onClick={handleAddUser} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              Novo usuário
            </Button>
          </div>
        </div>

        {loading && <p className="text-gray-500 pt-6">Carregando usuários...</p>}
        {error && <p className="text-red-500 pt-6">Erro ao carregar usuários: {error.message}</p>}

        {!loading && !error && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
            {filteredUsers.map((member) => (
              <UserCard
                key={member.id}
                user={member}
                isCurrentUser={member.id === currentUserId}
                onEdit={() => handleEditUser(member)}
                onDelete={() => handleDeleteUser(member)}
              />
            ))}
          </div>
        )}
      </div>

      <InviteUserDialog
        open={openInviteDialog}
        onOpenChange={setOpenInviteDialog}
        onCreated={() => refetch()}
      />

      <EditUserDialog
        open={openEditMemberDialog}
        onOpenChange={setOpenEditMemberDialog}
        onUpdated={() => refetch()}
        user={user}
      />

      <DeleteUserDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        user={user}
      />
    </Page>
  )
}
