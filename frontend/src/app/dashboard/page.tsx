import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}`},
  });

  if (!response.ok) {
    redirect("/login");
  }

  const { user } = await response.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Bonjour {user.name}</h1>
      <p className="text-muted-foreground">Bienvenue sur ton tableau de bord.</p>
    </div>
  )
}