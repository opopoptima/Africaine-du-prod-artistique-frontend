"use client";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";


export default function ContactSection() {
  return (
    <section className="relative w-full bg-primary-300 text-white py-8 px-4 overflow-hidden">

      <img
        src="/images/deco.png"
        alt="decoration"
        className="hidden md:block md:absolute right-0 bottom-2 w-24 md:w-28"
        />

        <img
        src="/images/deco.png"
        alt="decoration"
        className="hidden md:block md:absolute left-0 top-2 w-24 md:w-28"
        />


      {/* Contenu */}
      <div className="max-w-3xl mx-auto text-center">

        <h2
          className="text-3xl md:text-4xl font-bold text-primary-500 leading-tight"
          style={{
            textShadow: `
              3px 3px 0 #FFFFFF,
              -3px 3px 0 #FFFFFF,
              3px -3px 0 #FFFFFF,
              -3px -3px 0 #FFFFFF,
              3px 0px 0 #FFFFFF,
              -3px 0px 0 #FFFFFF,
              0px 3px 0 #FFFFFF,
              0px -3px 0 #FFFFFF
            `
          }}
        >
          Vous souhaitez en savoir plus ?
        </h2>

        <p className="mt-2 text-base md:text-lg leading-snug">
          Notre équipe est à votre disposition pour répondre à toutes
          vos questions
        </p>

        <div className="text-center mt-5">
        <Link href="/contact">
            <Button
            size="lg"
            className="bg-primary-100 hover:bg-secondary-100 hover:text-primary-100 hover:border-primary-100 hover:border-2 text-secondary-100 px-8 sm:px-12 py-3 sm:py-4 text-lg rounded-full shadow-md transition-all hover:shadow-lg hover:scale-105"
            >
            Contactez-Nous
            </Button>
        </Link>
        </div>

      </div>
    </section>
  );
}
