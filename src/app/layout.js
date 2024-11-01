import "./globals.css";
import { ceraRoundPro, inter } from "@/utils/fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "My Lingkeu",
  description: "Buat list link mu sendiri dengan My Lingkeu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter} ${ceraRoundPro}`}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
