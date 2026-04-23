// import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";
import { dbConnect } from "@/service/mongo";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
  title: "EduConnect - Wold's Best Learning Platform",
  description: "Explore || Learn || Build || Share",
};

export default async function RootLayout({ children }) {
  const conn = await dbConnect();
  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.className)}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
