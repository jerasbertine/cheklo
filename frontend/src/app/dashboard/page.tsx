import { getCurrentUser } from "@/lib/auth";
import { getSubscriptions } from "@/lib/subscriptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddSubscriptionDialog } from "@/components/add-subscription-dialog";

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
        <AddSubscriptionDialog />
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

      <div className="space-y-2">
        {subscriptions.length === 0 ? (
          <p className="text-muted-foreground">Aucun abonnement pour l&apos;instant.</p>
        ) : (
          subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <div>
                <p className="font-medium">{sub.name}</p>
                <p className="text-sm text-muted-foreground">{sub.category}</p>
              </div>
              <p className="font-semibold">{sub.price.toFixed(2)} €</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
