import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PONTEA School | ARCHED & TIL-A Exam Preparation",
  description:
    "The only online school that comprehensively prepares international students for ARCHED & TIL-A entrance exams to Italian architecture universities.",
  keywords: [
    "ARCHED exam",
    "TIL-A exam",
    "Politecnico di Milano",
    "Politecnico di Torino",
    "architecture entrance exam",
    "Italy architecture school",
    "architecture exam preparation",
  ],
  openGraph: {
    title: "PONTEA School | ARCHED & TIL-A Exam Preparation",
    description:
      "Prepare for Italian architecture university entrance exams with expert guidance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${nunito.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
