import "./fonts.css";
import "./globals.css";
import Footer from './components/Footer';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from "./context/ToastContext";

export const metadata = {
  title: "L'Africaine de Production Artistique",
  description: "Découvrez notre boutique et nos actualités artistiques.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <ToastProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            {/* Main content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
