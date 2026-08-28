import Link from "next/link";
import { RefreshCw, LayoutGrid } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r bg-sidebar p-4">
        <div className="flex items-center gap-2 px-2 pb-6 font-medium">
          <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-primary">
            <RefreshCw className="size-4"/>
          </span>
          Checklo
        </div>

        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2 text-sm text-sidebar-accent-foreground"
            >
              <LayoutGrid className="size-5"/>
              Tableau de bord
          </Link>
        </nav>

        <div className="mt-auto flex items-center gap-2 rounded-md bg-muted px-3 py-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
            {user.name[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1 truncate text-sm">{user.name}</div>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  )
}