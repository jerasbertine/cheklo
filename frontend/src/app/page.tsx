import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center gap-2 p-6">
        <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-primary">
          <RefreshCw className="size-4" />
        </span>
        <span className="font-medium">Checklo</span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 text-center">
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-widest text-primary uppercase">
            Gestion d&apos;abonnements
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Vos abonnements, sous contrôle.
          </h1>
          <p className="max-w-md text-muted-foreground">
            Checklo suit ce que vous payez chaque mois et vous demande, une
            fois par mois, si ça vaut encore le coup.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/register">Créer un compte</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Se connecter</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
