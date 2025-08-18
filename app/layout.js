
import "./globals.css";



export const metadata = {
  title: "TradeBin NITR",
  description: "Marketplace for NITR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cream">
        {children}
      </body>
    </html>
  );
}
