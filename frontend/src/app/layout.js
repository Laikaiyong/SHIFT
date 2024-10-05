import { Pixelify_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import './home.css';
import {NextUIProvider} from "@nextui-org/react";
import {
  IconHome,
  IconTrendingUp,
  IconMeeple,
  IconCalendarEvent,
  IconEye,
  IconMoneybag,
  IconUsers,
  IconPlus,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Navbar from "@/components/custom/navbar";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: <IconHome className="h-6 w-6 text-green-800" />,
  },
  {
    title: "Community",
    href: "/community",
    icon: <IconUsers className="h-6 w-6 text-green-800" />,
  },
  // {
  //   title: "Community Hub",
  //   href: "/community",
  //   icon: <IconMeeple className="h-6 w-6 text-green-800" />, removed due to redudancy
  // },
  {
    title: "Event Hub",
    href: "/event",
    icon: <IconCalendarEvent className="h-6 w-6 text-green-800" />,
  },
  {
    title: "Bounties",
    href: "/bounty",
    icon: <IconMoneybag className="h-6 w-6 text-green-800" />,
  },
  {
    title: "Create Event",
    href: "/create",
    icon: <IconPlus className="h-6 w-6 text-green-800" />,
  },
];

export const metadata = {
  title: "SHIFT",
  description: "Community events by SHIFT, SHIFTing how's engagement work",
};

const pixelify = JetBrains_Mono({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <NextUIProvider>
        <body className={`${pixelify.className} antialiased`}>
        <Navbar />
          {children}

          <div className="fixed bottom-0 right-0 z-50 md:items-center md:flex md:w-full md: md:justify-center md:mx-auto m-10">
            <FloatingDock
              items={navItems}
              desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
              mobileClassName="fixed bottom-4 right-4"
            />
          </div>
        </body>
        </NextUIProvider>
      </html>
  );
}
