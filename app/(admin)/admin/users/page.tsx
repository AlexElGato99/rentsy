import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getCurrentProfile } from "@/lib/auth/dal"
import { UserRoleSelect } from "@/components/admin/user-role-select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function AdminUsersPage() {
  const currentProfile = await getCurrentProfile()
  const supabase = await createClient()
  const adminClient = createAdminClient()

  const [{ data: profiles }, { data: authUsers }] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false }),
    adminClient.auth.admin.listUsers({ perPage: 200 }),
  ])

  const emailById = new Map(
    authUsers?.users.map((user) => [user.id, user.email]) ?? []
  )

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Users</h1>
      <p className="mt-2 font-medium text-muted-foreground">
        {profiles?.length ?? 0} accounts registered.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-brutal-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(profiles ?? []).map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-bold">
                  {profile.full_name ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {emailById.get(profile.id) ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(profile.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <UserRoleSelect
                    userId={profile.id}
                    role={profile.role}
                    disabled={profile.id === currentProfile?.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
