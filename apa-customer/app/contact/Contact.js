"use client";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

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

  const onSubmit = (data) => {
    const subject = encodeURIComponent("Nouveau message depuis le site");
    const body = encodeURIComponent(
      `Prénom: ${data.firstName}\nNom: ${data.lastName}\nEmail: ${data.email}\nTéléphone: ${data.phone}\nMessage: ${data.message}`
    );

    window.location.href = `mailto:rais.asma99@gmail.com?subject=${subject}&body=${body}`;
  };


  return (
    <div className="w-auto max-w-5xl mx-4 md:mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-primary-300 shadow-lg flex flex-col md:flex-row gap-6 md:gap-12 my-6 sm:my-8 md:my-10 lg:my-12">
      
      {/* Left: Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-primary-300 mb-2">Contactez-Nous</h2>
        <p className="text-secondary-700 mb-6 text-sm">
          Une question ? Un projet ? N'hésitez pas à nous écrire, nous serons ravis de vous répondre
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Prénom"
                  {...field}
                  className="bg-gray-100"
                />
              )}
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
            render={({ field }) => <Input type="email" placeholder="Email" {...field} />}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input type="tel" placeholder="Numéro de téléphone" {...field} />}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder="Message"
                rows={4}
                {...field}
                className="w-full h-full resize-none"
              />
            )}
          />

          <Button
            type="submit"
            className="bg-gradient-to-r from-primary-500 to-primary-300 rounded-xl w-full"
          >
            Envoyer le message
          </Button>
        </form>
      </div>

      {/* Right: Image / Info */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center">
        <img
          src="/images/Contact/contact.png"
          alt="Contact illustration"
          className="rounded-xl shadow-lg mb-4 md:mb-0 max-w-full h-auto"
        />
      </div>
    </div>
  );
}
