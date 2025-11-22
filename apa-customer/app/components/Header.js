"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="flex-shrink-0">
      <img className="h-16 w-16" src="/images/apa-logo.png" alt="Logo" />
    </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-6 ml-auto mr-0">
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                color: item === activeItem
                  ? "var(--color-secondary-500)" // jaune si actif
                  : "var(--color-primary-500)",  // violet sinon
              }}
              className="hover:text-yellow-500 "
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Menu Mobile */}
        <div className="md:hidden ml-auto flex items-center">
          {/* Lien fixe visible sur mobile */}
          <a
            href={activeItem.href}
            style={{
              color: isLinkActive(activeItem.href)
                ? "var(--color-secondary-500)"
                : "var(--color-primary-500)",
            }}
            className="mr-4 font-medium "
          >
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary-900 focus:outline-none text-2xl   "
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Menu Mobile complet à droite */}
      {isOpen && (
        <nav className="md:hidden absolute top-4 right-12 bg-white flex flex-col space-y-2 p-4 rounded">

          {/* Exclut l'élément actif déjà affiché */}
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                color: isLinkActive(item.href)
                  ? "var(--color-secondary-500)"
                  : "var(--color-primary-500)",
              }}
              className="block "
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
