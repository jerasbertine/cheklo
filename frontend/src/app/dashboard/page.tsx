import { getCurrentUser } from "@/lib/auth";
import { getSubscriptions } from "@/lib/subscriptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionFormDialog } from "@/components/subscription-form-dialog";
import { SubscriptionsList } from "@/components/subscription-list";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const { subscriptions, totals } = await getSubscriptions();

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Bonjour {user.name}</h1>
          <p className="text-muted-foreground">Bienvenue sur ton tableau de bord.</p>
        </div>
        <SubscriptionFormDialog />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Dépenses mensuelles
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {totals.monthly.toFixed(2)} €
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Sur l&apos;année
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {totals.annual.toFixed(2)} €
          </CardContent>
        </Card>
      </div>

      <SubscriptionsList subscriptions={subscriptions} />
    </div>
  );
}
