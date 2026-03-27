import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Naawal 🎉 | Special Birthday Website",
  description:
    "A beautifully crafted birthday website made with love for Naawal Farah. Celebrating her 30th with memories, moments, and magic.",

  keywords: [
    "Happy Birthday Naawal",
    "Naawal Farah",
    "Birthday website",
    "30th birthday",
    "birthday surprise",
  ],

  authors: [{ name: "Made with love ❤️" }],

  openGraph: {
    title: "Happy Birthday Naawal 🎉",
    description:
      "A special birthday experience made just for Naawal Farah. Not your regular birthday message 😉",
    url: "https://happybirthdaynaawal.com",
    siteName: "HappyBirthdayNaawal",
    images: [
      {
        url: "/images/00-book.jpeg", // your first image
        width: 1200,
        height: 630,
        alt: "Happy Birthday Naawal",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Naawal 🎉",
    description: "A special birthday experience made just for Naawal Farah 💫",
    images: ["/images/00-book.jpeg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
