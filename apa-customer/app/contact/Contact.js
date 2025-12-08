"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
// Removed the import for RadioGroup and RadioGroupItem:
// import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

export default function ContactForm() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      type: "", // This will be handled by native <input type="radio">
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    const subject = encodeURIComponent("Nouveau message depuis le site");
    const body = encodeURIComponent(
      `Prénom: ${data.firstName}
Nom: ${data.lastName}
Email: ${data.email}
Type: ${data.type}
Téléphone: ${data.phone}
Message: ${data.message}`
    );

    window.location.href = `mailto:rais.asma99@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    // Styling remains the same
    <div className="w-auto max-w-5xl mx-4 md:mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-primary-300 shadow-lg flex flex-col md:flex-row gap-6 md:gap-12 my-6 sm:my-8 md:my-10 lg:my-12">
      
      {/* Left: Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-primary-300 mb-2">Contactez-Nous</h2>
        <p className="text-secondary-700 mb-6 text-sm">
          Une question ? Un projet ? N'hésitez pas à nous écrire, nous serons ravis de vous répondre
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input placeholder="Prénom" {...field} className="bg-gray-100" />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input placeholder="Nom" {...field} className="bg-gray-100" />
              )}
            />
          </div>

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input type="email" placeholder="Email" {...field} className="bg-gray-100" />
            )}
          />

          <div className="space-y-2">

            <Controller
              name="type"
              control={control}
              // Destructure field to get onChange and value for manual radio management
              render={({ field: { onChange, value } }) => (
                // Replaced RadioGroup with a simple div with the existing flex class
                <div className="flex gap-6" role="radiogroup">
                  
                  {/* Option 1: Enfant */}
                  <div className="flex items-center space-x-2">
                    {/* Replaced RadioGroupItem with native input[type=radio] */}
                    <input 
                      type="radio"
                      id="enf" 
                      value="enfant"
                      // Use the field's onChange function and current value for checked state
                      checked={value === "enfant"}
                      onChange={() => onChange("enfant")}
                      // Apply default radio styling using Tailwind
                      className="h-4 w-4 text-primary-500 border-gray-300 focus:ring-primary-500 cursor-pointer"
                    />
                    <label htmlFor="enf" className="text-sm cursor-pointer">
                      Enfant
                    </label>
                  </div>

                  {/* Option 2: Parent */}
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio"
                      id="par" 
                      value="parent"
                      checked={value === "parent"}
                      onChange={() => onChange("parent")}
                      className="h-4 w-4 text-primary-500 border-gray-300 focus:ring-primary-500 cursor-pointer"
                    />
                    <label htmlFor="par" className="text-sm cursor-pointer">
                      Parent
                    </label>
                  </div>

                  {/* Option 3: Passionné des livres */}
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio"
                      id="pass" 
                      value="passionne"
                      checked={value === "passionne"}
                      onChange={() => onChange("passionne")}
                      className="h-4 w-4 text-primary-500 border-gray-300 focus:ring-primary-500 cursor-pointer"
                    />
                    <label htmlFor="pass" className="text-sm cursor-pointer">
                      Passionné des livres
                    </label>
                  </div>

                  {/* Option 4: Professionnel */}
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio"
                      id="pro" 
                      value="professionnel"
                      checked={value === "professionnel"}
                      onChange={() => onChange("professionnel")}
                      className="h-4 w-4 text-primary-500 border-gray-300 focus:ring-primary-500 cursor-pointer"
                    />
                    <label htmlFor="pro" className="text-sm cursor-pointer">
                      Professionnel
                    </label>
                  </div>
                </div>
              )}
            />
          </div>
          {/* ------------------------------------------------------------- */}

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input type="tel" placeholder="Numéro de téléphone" {...field} className="bg-gray-100" />
            )}
          />

          {/* Message */}
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder="Message"
                rows={4}
                {...field}
                className="w-full h-full resize-none bg-gray-100"
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

      {/* Right image */}
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