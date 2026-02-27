import type { Metadata } from "next";
import ClientLayout from './layout';

export const metadata: Metadata = {
  title: "NoHomework Productions",
  description: "Independent film production company creating compelling stories",
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