import type { Metadata } from "next";
import "./globals.css";
import "./birthday.css";

export const metadata: Metadata = { title: "Une surprise pour toi", description: "Une carte d'anniversaire interactive" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
