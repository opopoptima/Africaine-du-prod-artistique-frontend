import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="relative w-full py-6 text-sm bg-[linear-gradient(to_top,var(--color-secondary-100),var(--color-primary-100))]"
    >
      {/* Top-right image */}
      <Image
        src="/images/vector-footer-top.png"
        alt="Logo L’Africaine de Prod Artistique"
        width={100}
        height={100}
        quality={75}
        className="absolute -top-2 right-20"
      />

      <div className="max-w-7xl mx-auto px-12">
        {/* Réseaux sociaux */}
        <div className="text-center mb-4">
          <h3 className="font-bold mb-3 text-primary-500">Suivez-nous</h3>
          <div className="flex justify-center gap-4 text-primary-300">
            <Link href="https://www.facebook.com/Africaineprod" aria-label="Facebook">
              <FaFacebook className="w-6 h-6 transition cursor-pointer" />
            </Link>
            <Link href="https://www.instagram.com/lafricaineprod" aria-label="Instagram">
              <FaInstagram className="w-6 h-6 transition cursor-pointer" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6 transition cursor-pointer" />
            </Link>
          </div>
        </div>

        {/* Ligne principale */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:items-start">
          {/* Colonne 1 */}
          <div className="flex flex-col items-start md:w-1/3">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/images/apa-logo.png"
                alt="Logo L’Africaine de Prod Artistique"
                width={50}
                height={50}
                quality={75}
              />
              <h2 className="font-semibold text-primary-500">
                L’Africaine de Prod Artistique
              </h2>
            </div>
            <p className="text-secondary-900">
              Des livres qui éveillent l’imagination et accompagnent
              l’apprentissage des enfants.
            </p>
          </div>

          {/* Colonne 2 */}
          <div className="md:w-1/3">
            <h3 className="font-semibold mb-3 text-primary-500">Contact</h3>
            <p>52, av Bab Djedid Tunis-Tunisie Tunis, Tunisia</p>
            <p>+216 70 039 426</p>
            <p>lafricaine-de-production-artistique@hotmail.com</p>
          </div>

          {/* Colonne 3 */}
          <div className="md:w-1/3">
            <h3 className="font-semibold mb-3 text-primary-500">Pages</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:underline text-secondary-900">Accueil</Link>
              </li>
              <li>
                <Link href="/boutique" className="hover:underline text-secondary-900">Boutique</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline text-secondary-900">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="my-6 text-primary-300 border-t border-primary-300"></div>

        {/* Bas du footer */}
        <div className="text-center text-xs text-secondary-900">
          © 2025 L’Africaine de Prod Artistique. Tous droits réservés.
        </div>
      </div>

      {/* Bottom-left image */}
      <Image
        src="/images/vector-footer-bottom.png"
        alt="Logo L’Africaine de Prod Artistique"
        width={100}
        height={100}
        quality={75}
        className="absolute bottom-0 left-0"
      />
    </footer>
  );
}
