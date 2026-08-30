"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Subscription } from "@/lib/subscriptions";

interface SubscriptionFormDialogProps {
  subscription?: Subscription;
} 

export function SubscriptionFormDialog({ subscription }: SubscriptionFormDialogProps) {
  const isEditing = !!subscription;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(subscription?.name ?? "");
  const [price, setPrice] = useState(subscription ? String(subscription.price) : "");
  const [frequency, setFrequency] = useState<"monthly" | "yearly">(
    subscription?.frequency ?? "monthly"
  );
  const [category, setCategory] = useState(subscription?.category ?? "");
  const [nextBillingDate, setNextBillingDate] = useState(
    subscription?.nextBillingDate ?? ""
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const url = isEditing
    ?`/api/subscriptions/${subscription.id}`
    : "/api/subscriptions";

    const response = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        frequency,
        category,
        nextBillingDate,
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Une erreur est survenue");
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="icon">
            <Pencil className="size-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="size-4" />
            Ajouter un abonnement
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier l'abonnement" : "Nouvel abonnement"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nom du service</FieldLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Netflix, Spotify..."
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="price">Prix</FieldLabel>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="frequency">Fréquence</FieldLabel>
              <Select
                value={frequency}
                onValueChange={(value) => setFrequency(value as "monthly" | "yearly")}
              >
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="yearly">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="category">Catégorie</FieldLabel>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Vidéo, Musique..."
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="nextBillingDate">Prochain prélèvement</FieldLabel>
              <Input
                id="nextBillingDate"
                type="date"
                value={nextBillingDate}
                onChange={(e) => setNextBillingDate(e.target.value)}
                required
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ajout..." : "Enregistrer"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
