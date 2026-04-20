import type { Metadata } from "next";
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: "NoHomework Productions",
  description: "No Homework Productions is a Louisiana-based film production studio founded by Wesley Boone, Justus Boone, Caleb Jobe, and Ian Jobe.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
