import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import NavigationManager from "@/components/NavigationManager";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata = {
  title: "KUMAR VASHISHTHA AND ASSOCIATES | Chartered Accountants",
  description: "Premier CA firm providing Audit, Taxation, GST, and Compliance services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavigationManager>
          {children}
        </NavigationManager>
      </body>
    </html>
  );
}
