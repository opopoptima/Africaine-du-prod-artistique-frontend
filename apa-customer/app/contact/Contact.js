"use client";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/ui/input"; // Shadcn Input
import { Textarea } from "../components/ui/textarea"; // Shadcn Textarea
import { Button } from "../components/ui/button"; // Shadcn Button

export default function ContactForm() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-6 md:gap-12 shadow-lg shadow-primary-300 p-4 bg-white rounded my-6 sm:my-8 md:my-10 lg:my-12">
      
      {/* Left: Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-primary-300 mb-2">Contactez-Nous</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Une question ? Un projet ? Nhésitez pas à nous écrire, nous serons ravis de vous répondre
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input placeholder="Prénom" {...field} />}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input placeholder="Nom" {...field} />}
            />
          </div>

          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input placeholder="Email" {...field} />}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input placeholder="Numéro de téléphone" {...field} />}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => <Textarea placeholder="Message" rows={4} {...field} />}
          />

          <Button type="submit" className="bg-gradient-to-r from-primary-300 to-purple-400 w-full">
            Envoyer le message
          </Button>
        </form>
      </div>

      {/* Right: Image / Info */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <img
          src="/images/Contact/contact.png"
          alt="Contact illustration"
          className="rounded-xl shadow-lg mb-4 md:mb-0"
        />
        
      </div>
    </div>
  );
}
