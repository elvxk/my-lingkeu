import "./globals.css";
import { ceraRoundPro, inter } from "@/utils/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import ClientAOS from "@/lib/ClientAOS";

export const metadata = {
  title: "My Lingkeu",
  description: "Buat list link mu sendiri dengan My Lingkeu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter} ${ceraRoundPro}`}>
        <ClerkProvider>
          <ClientAOS>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ClientAOS>
        </ClerkProvider>
      </body>
    </html>
  );
}
