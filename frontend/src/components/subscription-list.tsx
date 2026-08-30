"use client";

import { useState } from "react";
import type { Subscription } from "@/lib/subscriptions";
import { SubscriptionFormDialog } from "@/components/subscription-form-dialog";
import { DeleteSubscriptionButton } from "@/components/delete-subscription-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortField = "name" | "price" | "nextBillingDate";

interface SubscriptionsListProps {
  subscriptions: Subscription[];
}

export function SubscriptionsList({ subscriptions }: SubscriptionsListProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [categroyFilter, setCategoryFilter] = useState<string>("all");

  const categories = Array.from(new Set(subscriptions.map((sub) => sub.category)));

  const filtered = subscriptions.filter(
    (sub) => categroyFilter === "all" || sub.category === categroyFilter
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === "price") return a.price - b.price;
    if (sortField === "nextBillingDate") return a.nextBillingDate.localeCompare(b.nextBillingDate);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Trier par"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="price">Prix</SelectItem>
            <SelectItem value="nextBillingDate">Date</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categroyFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Catégorie"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {sorted.length === 0 ? (
          <p className="text-muted-foreground">Aucun abonnement pour l&apos;instant.</p>
        ) : (
          sorted.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between rounded-md border p-4">
              <div>
                <p className="font-medium">{sub.name}</p>
                <p className="text-sm text-muted-foreground">{sub.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold">{sub.price.toFixed(2)} €</p>
                <SubscriptionFormDialog subscription={sub} />
                <DeleteSubscriptionButton id={sub.id} name={sub.name} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}