import { ThemeProvider } from "@/components/theme-provider";
import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DalyGames",
  description: "Descubra jogos incriveis!",
  keywords: ['jogos', 'games', 'steam'],
  openGraph: {
    images: [`${process.env.PROJECT_URL}/preview.png`]
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Container>
            <Header/>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
