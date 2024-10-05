import React from 'react';
import Image from "next/image";
import Navbar from "@/components/custom/navbar";

const Card = ({ title, description, imageSrc }) => {
  return (
    <div className="card h-80 w-64 cursor-pointer rounded-lg border-2 bg-white p-4 shadow-lg hover:border-gray-400 transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-4 h-40 overflow-hidden rounded-md bg-gray-100">
        <Image src={imageSrc} alt={title} width={256} height={160} objectFit="cover" />
      </div>
      <a href="#">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <a
        href="#"
        className="inline-flex items-center rounded-lg text-center text-xs font-medium text-gray-800"
      >
        Read more
        <svg
          className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
};

const Dashboard = () => {
  const cards = [
    {
      title: "Event Management",
      description: "Make sure Events don't clash like ETHSG",
      imageSrc: "https://static.vecteezy.com/system/resources/previews/007/110/950/large_2x/group-of-business-people-discussing-and-giving-ideas-photo.jpg",
      rotation: "-10deg",
      zIndex: 4,
    },
    {
      title: "Quadratic Funding",
      description: "Fund your favourite projects through quadratic funding!",
      imageSrc: "https://images.unsplash.com/photo-1593510987760-2d895bc8109d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rotation: "-5deg",
      zIndex: 3,
    },
    {
      title: "Bounties",
      description: "Earn community bounties by completing tasks!",
      imageSrc: "https://images.unsplash.com/photo-1637597383958-d777c022e241?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rotation: "5deg",
      zIndex: 2,
    },
    {
      title: "Community Management",
      description: "Keep track on the status of your community!",
      imageSrc: "https://images.unsplash.com/photo-1724754608947-f86db9039cf9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rotation: "10deg",
      zIndex: 1,
    },
  ];

  return (
      <main className="main" style={{ margin: 0 }}>
        <div className="flex flex-col min-h-screen bg-white">
          <div className="flex-grow flex flex-col items-center justify-center p-8">
            <div className="mb-8">
              <Image src="/shift.png" alt="Shift Logo" width={200} height={200} />
            </div>
            <h1 className="text-5xl font-bold text-green-800 mb-12">
              Welcome to Shift, we are REDEFINING
            </h1>
            <div className="m-10 flex flex-wrap justify-center items-center gap-8">
              {cards.map((card, index) => (
                <div
                  key={index}
                  style={{
                    zIndex: card.zIndex,
                    transform: `translateX(0px) translateY(0px) rotate(${card.rotation})`,
                  }}
                >
                  <Card 
                    title={card.title} 
                    description={card.description} 
                    imageSrc={card.imageSrc}
                  />
                </div>
              ))}
            </div>
            <div className="h-20"></div>
          </div>
        </div>
      </main>
  );
};

export default function Home() {
  return <Dashboard />;
}