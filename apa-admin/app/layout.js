import { ToastProvider } from "./context/ToastContext";
import "./fonts.css";
import "./globals.css";

export const metadata = {
  title: "Admin - Africaine du prod artistique",
  description: "Panel d'administration pour la gestion du contenu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
