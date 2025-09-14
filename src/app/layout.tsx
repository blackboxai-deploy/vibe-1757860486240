import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickSort Algorithm Demonstration",
  description: "Interactive visualization of the QuickSort algorithm with step-by-step explanations",
  keywords: ["quicksort", "algorithm", "sorting", "visualization", "education"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}>
        <div className="min-h-screen">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  QuickSort Algorithm Demo
                </h1>
                <div className="text-sm text-gray-600">
                  Interactive Sorting Visualization
                </div>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="mt-16 bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-gray-600 text-sm">
                Learn how QuickSort works through interactive visualization
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}