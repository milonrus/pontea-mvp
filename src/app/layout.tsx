import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
