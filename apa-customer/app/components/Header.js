"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  // Menu principal
  const menu = [
    { name: "Accueil", href: "/home" },
    { name: "À propos", href: "/a-propos" },
    { name: "Boutique", href: "/boutique" },
    { name: "Actualité", href: "/actualite" },
    { name: "Contact", href: "/contact" },
  ];

  // Détecte le lien actif
  const isLinkActive = (href) => {
    if (href === "/home") return pathname === "/home" || pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Lien actif à réutiliser
  const activeItem = menu.find(item => isLinkActive(item.href)) || menu[0];

  return (
    <header className="w-full bg-white shadow-md z-50 relative">
      <div className="flex items-center justify-between h-16 w-full px-[3%]">

        {/* Logo */}
        <div className="shrink-0">
          <img className="h-16 w-16" src="/images/apa-logo.png" alt="Logo" />
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-6 ml-auto mr-8">
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                color: isLinkActive(item.href)
                  ? "var(--color-secondary-500)" // jaune si actif
                  : "var(--color-primary-500)",  // violet sinon
              }}
              className="hover:text-yellow-500 font-medium transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Cart Icon & Mobile Hamburger */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-primary-500 hover:text-secondary-500 transition-colors cursor-pointer"
            title="Panier"
          >
            <IoCartOutline className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-secondary-500 text-white text-[10px] font-bold px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger (Mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-900 focus:outline-none text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Menu Mobile complet à droite */}
      {isOpen && (
        <nav className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-lg flex flex-col space-y-2 p-4 border-t">
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                color: isLinkActive(item.href)
                  ? "var(--color-secondary-500)"
                  : "var(--color-primary-500)",
              }}
              className="block py-2 px-4 hover:bg-gray-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
