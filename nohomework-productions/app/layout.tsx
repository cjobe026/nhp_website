import type { Metadata } from "next";
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: "No Homework Productions",
  description: "No Homework Productions is a Louisiana-based film production studio founded by Wesley Boone, Justus Boone, Caleb Jobe, and Ian Jobe.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    google: "Nn3zYw1tnZau5xT1dZ0pOwNYIvabISveB5CiWBRzKzw",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
