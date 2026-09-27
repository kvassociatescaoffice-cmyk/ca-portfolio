import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavigationManager from "@/components/NavigationManager";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "VJA Clone | Chartered Accountants",
  description: "Premier CA firm providing Audit, Taxation, GST, and Compliance services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavigationManager>
          {children}
        </NavigationManager>
      </body>
    </html>
  );
}
