"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function FeaturedCard() {
  return (
    <Card className="overflow-hidden border-border bg-card shadow-lg relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://publishingperspectives.com/wp-content/uploads/2023/03/710-Salon-du-Livre-Africain-de-Paris-2023-photo-by-Olivier-Thibault-ftw.jpg" 
          alt="Salon du livre visitors" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col justify-between min-h-[300px]">
        {/* Date */}
        <div className="mb-4 flex items-center gap-2 text-[var(--color-secondary-100)]">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">24 Oct-2021</span>
        </div>

        <div className="flex-1">
          {/* Title */}
          <h3 className="mb-3 text-2xl font-bold text-[var(--color-secondary-100)]">
            Salon du livre
          </h3>

          {/* Subtitle */}
          <p className="mb-4 text-base text-[var(--color-secondary-100)] font-semibold">
            Les visiteurs répondent présents
          </p>

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-[var(--color-secondary-100)]">
            Malgré les sorties scolaires annulées en raison de la grève dans...
          </p>
        </div>

        {/* CTA Button */}
        <div className="w-full flex justify-end">
  <Button
    className="
      cursor-pointer
      bg-[var(--color-primary-300)]
      hover:bg-[var(--color-primary-300)]/90
      text-white
      rounded-xl
      px-6 py-3
      shadow-md
      flex items-center gap-2
    "
  >
    Voir Plus
    <span
      className="
        bg-white
        text-[var(--color-primary-300)]
        rounded-xl
        p-1
        flex items-center justify-center
      "
    >
      <ArrowRight className="h-4 w-4" />
    </span>
  </Button>
</div>

      </div>
    </Card>
  );
}