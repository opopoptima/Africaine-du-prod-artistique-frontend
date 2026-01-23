import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: " Africaine du prod artistique",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        
        {children}
      </body>
    </html>
  );
}
