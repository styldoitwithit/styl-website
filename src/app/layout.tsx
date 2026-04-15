import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "STYL Digital Marketing | Healthcare Branding Experts",
  description: "India's No.1 Healthcare Branding Expert for Hospitals & Doctors. Based in Chennai, serving hospitals across India.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-background text-white antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111118',
              color: '#fff',
              border: '1px solid #1e1e2e',
            },
          }}
        />
      </body>
    </html>
  );
}
