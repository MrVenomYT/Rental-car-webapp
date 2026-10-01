import "./globals.css";

export const metadata = {
  title: "DriveNest Verified Rental and Sales Platform",
  description: "Find your perfect car and drive your dreams with DriveNest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
        {children}
      </body>
    </html>
  );
}
