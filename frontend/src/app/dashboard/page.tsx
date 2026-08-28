import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Bonjour {user.name}</h1>
      <p className="text-muted-foreground">Bienvenue sur ton tableau de bord.</p>
    </div>
  );
}
