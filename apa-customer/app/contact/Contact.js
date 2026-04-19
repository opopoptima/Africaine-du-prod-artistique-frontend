"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  // Pulling credentials from environment variables
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const RECEIVER_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_RECEIVER_EMAIL;

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
  }, [PUBLIC_KEY]);

  const onSubmit = async (data) => {
    if (!SERVICE_ID || !TEMPLATE_ID) {
      console.error("EmailJS configuration is missing in environment variables.");
      setSubmitStatus("error");
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone || "Non renseigné",
        message: data.message,
        to_email: RECEIVER_EMAIL 
      };

      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      
      if (response.status === 200) {
        setSubmitStatus("success");
        reset();
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-auto max-w-5xl mx-4 md:mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-primary-300 shadow-lg flex flex-col md:flex-row gap-6 md:gap-12 my-6 sm:my-8 md:my-10 lg:my-12">
      
      {/* Left side: Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-primary-300 mb-2">Contactez-Nous</h2>
        <p className="text-secondary-700 mb-6 text-sm">
          Une question ? Un projet ? N'hésitez pas à nous écrire, nous serons ravis de vous répondre
        </p>

        {submitStatus === "success" && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✅ Votre message a été envoyé avec succès !
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ❌ Une erreur s'est produite. Veuillez réessayer ou nous contacter à omarchokri03@gmail.com
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "Le prénom est requis" }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    type="text"
                    placeholder="Prénom"
                    {...field}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
                    disabled={isLoading}
                  />
                  {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                </div>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Le nom est requis" }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    type="text"
                    placeholder="Nom"
                    {...field}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
                    disabled={isLoading}
                  />
                  {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                </div>
              )}
            />
          </div>

          <Controller
            name="email"
            control={control}
            rules={{ 
              required: "L'email est requis",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email invalide" }
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...field}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
                  disabled={isLoading}
                />
                {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
              </div>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                type="tel"
                placeholder="Numéro de téléphone (optionnel)"
                {...field}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                disabled={isLoading}
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            rules={{ required: "Le message est requis" }}
            render={({ field, fieldState }) => (
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  {...field}
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none disabled:opacity-50"
                  disabled={isLoading}
                />
                {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
              </div>
            )}
          />

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50 bg-gradient-to-r from-primary-500 to-primary-300 text-white hover:opacity-90 h-10 py-2 px-4 w-full"
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </div>
      </div>

      {/* Right side: Illustration */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center">
        <img
          src="/images/Contact/contact.png"
          alt="Contact illustration"
          className="rounded-xl shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
}
