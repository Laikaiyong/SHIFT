"use client";

import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import BentoGridSecondDemo from "@/components/example/bento-grid-demo-2";
import {
  IconTrendingUp,
  IconBallpen,
  IconCalendarEvent,
  IconEye,
  IconMoneybag,
} from "@tabler/icons-react";

const navItems = [
  {
    title: "Funding",
    href: "/fund",
    icon: <IconTrendingUp className="h-6 w-6 text-green-800" />,
  },
  {
    title: "Register",
    href: "/register",
    icon: <IconBallpen className="h-6 w-6 text-green-800" />,
  },
  {
    title: "Event Hub",
    href: "/event",
    icon: <IconCalendarEvent className="h-6 w-6 text-green-800" />,
  },
  {
    title: "Verify",
    href: "/verify",
    icon: <IconEye className="h-6 w-6 text-green-800" />,
  },
  {
    title: "Bounties",
    href: "/bounty",
    icon: <IconMoneybag className="h-6 w-6 text-green-800" />,
  },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="mb-8">
          <Image src="/shift.png" alt="Shift Logo" width={200} height={200} />
        </div>
        <div className="m-10 flex flex-col px-16 sm:w-full sm:flex-col md:flex-row">
          <div
            className="h-72 w-60 cursor-pointer rounded-lg border-2 bg-white p-4 shadow-lg hover:border-gray-400"
            style={{
              zIndex: 4,
              opacity: 1,
              transform:
                "translateX(0px) translateY(0px) rotate(-10deg) translateZ(0px)",
            }}>
            <div className="mb-4 h-32 overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer "></div>
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Heading
              </h5>
            </a>
            <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
              Placeholder text / description to this card component.
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-lg text-center text-xs font-medium text-gray-800 ">
              Read more
              <svg
                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M1 5h12m0 0L9 1m4 4L9 9"></path>
              </svg>
            </a>
          </div>
          <div
            className="h-72 w-60 cursor-pointer rounded-lg border-2 bg-white p-4 shadow-lg hover:border-gray-400"
            style={{
              zIndex: 3,
              opacity: 1,
              transform:
                "translateX(0px) translateY(0px) rotate(-5deg) translateZ(0px)",
            }}>
            <div className="mb-4 h-32 overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer "></div>
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Heading
              </h5>
            </a>
            <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
              Placeholder text / description to this card component.
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-lg text-center text-xs font-medium text-gray-800 ">
              Read more
              <svg
                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M1 5h12m0 0L9 1m4 4L9 9"></path>
              </svg>
            </a>
          </div>
          <div
            className="h-72 w-60 cursor-pointer rounded-lg border-2 bg-white p-4 shadow-lg hover:border-gray-400"
            style={{
              zIndex: 2,
              opacity: 1,
              transform:
                "translateX(0px) translateY(0px) rotate(5deg) translateZ(0px)",
            }}>
            <div className="mb-4 h-32 overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer "></div>
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Heading
              </h5>
            </a>
            <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
              Placeholder text / description to this card component.
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-lg text-center text-xs font-medium text-gray-800 ">
              Read more
              <svg
                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M1 5h12m0 0L9 1m4 4L9 9"></path>
              </svg>
            </a>
          </div>
          <div
            className="h-72 w-60 cursor-pointer rounded-lg border-2 bg-white p-4 shadow-lg hover:border-gray-400"
            style={{
              zIndex: 1,
              opacity: 1,
              transform:
                "translateX(0px) translateY(0px) rotate(10deg) translateZ(0px)",
            }}>
            <div className="mb-4 h-32 overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer "></div>
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Heading
              </h5>
            </a>
            <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
              Placeholder text / description to this card component.
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-lg text-center text-xs font-medium text-gray-800 ">
              Read more
              <svg
                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M1 5h12m0 0L9 1m4 4L9 9"></path>
              </svg>
            </a>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-green-800 mb-12">
          Welcome to Shift, my name is Lai
        </h1>
        <BentoGridSecondDemo />
        <div className="h-20"></div>
      </div>
      <FloatingDock
        items={navItems}
        desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
        mobileClassName="fixed bottom-4 right-4"
      />
    </div>
  );
};

export default function Home() {
  return <Dashboard />;
}
