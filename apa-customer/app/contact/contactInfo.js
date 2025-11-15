import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactInfos() {
  return (
    <div className="flex flex-col items-center  gap-10 text-center md:text-left lg:ml-20 md:ml-10 sm:ml-0">

      {/* Adresse */}
      <div className="flex flex-col items-center  gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-300 text-white ">
          <MapPin size={26} />
        </div>
        <p className="text-primary-300 font-medium text-center ">
          52, av Bab Djedid Tunis - Tunisie
        </p>
      </div>

      {/* Téléphone */}
      <div className="flex flex-col items-center  gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-300 text-white ">
          <Phone size={26} />
        </div>
        <p className="text-primary-300  font-medium text-center ">
          +216 70 039 426
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col items-center  gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-300 text-white ">
          <Mail size={26} />
        </div>
        <p className="text-primary-300  font-medium text-center ">
          lafricaine-de-production-artistique@hotmail.com
        </p>
      </div>
    </div>
  );
}
