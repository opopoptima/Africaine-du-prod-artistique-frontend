"use client";;
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

  // Logout function
  const handleLogout = () => {
    // Remove token from localStorage (if used)
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      // Remove token cookie
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      // Redirect to login
      window.location.href = "/auth/login";
    }
  };

  return (
    <header className="bg-linear-to-r from-primary-500 to-primary-300 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
            <img className="h-16 w-16" src="/images/apa-logo.png" alt="Logo" />
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
          {/* Logout Button */}
          <button
            onClick={handleLogout}
className="px-4 py-2 ml-4 rounded-full bg-primary-500 text-white font-semibold border-2 border-primary-500 hover:bg-secondary-100 hover:text-primary-500 transition-colors"
          >
            Déconnexion
          </button>
        </nav>
      </div>
    </header>
  );
}
