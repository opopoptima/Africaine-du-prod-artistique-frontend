"use client";

import { Bell, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/articles", label: "Articles" },
    { href: "/commandes", label: "Commandes" },
    { href: "/actualites", label: "Actualités" },
    { href: "/filtres", label: "Filtres" },
  ];

  return (
    <header className="bg-linear-to-r from-primary-500 to-primary-300 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-500">A</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? "bg-white/20 text-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Settings className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
