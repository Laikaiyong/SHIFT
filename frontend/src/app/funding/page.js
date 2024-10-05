"use client";

import { Cover } from "@/components/ui/cover";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Tabs } from "@/components/ui/tabs";



export const stats = [
    {
      title: "120",
      description:
        "Projects",
      link: "https://stripe.com",
    },
    {
      title: "50K USDT",
      description:
        "Matching Pool",
      link: "https://stripe.com",
    },
    {
      title: "10K USDT",
      description:
        "Total Contributions",
      link: "https://netflix.com",
    },
    {
      title: "333",
      description:
        "Cool Contributors",
      link: "https://netflix.com",
    },
  ];


  const FundingCard = ({ text, title, description, buttonText }) => {
    return (
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
        
            <EvervaultCard text={text} />
        
            <h2 className="dark:text-white text-black mt-4 text-sm font-light">
                {title}
            </h2>
            <p className="dark:text-white text-black mt-4 text-sm font-light">
                {description}
            </p>
            <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
                {buttonText}
            </p>
        </div>
    );
};

const FundingProjects = [
  {
      text: "hover",
      title: "Hover over this card to reveal an awesome effect.",
      description: "Running out of copy here.",
      buttonText: "Fund this project",
      category: "tools"
  },
  {
      text: "click",
      title: "Click on this card to reveal more details.",
      description: "More copy needed here.",
      buttonText: "Support this project",
      category: "education"
  },
  {
    text: "click",
    title: "Click on this card to reveal more details.",
    description: "More copy needed here.",
    buttonText: "Support this project",
    category: "research"
  },
];

const FundingPage = () => {
    return (
        <div className="my-16">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                Unleash the potential of <Cover>Quadratic Funding</Cover>
            </h1>
            <div className="max-w-6xl mx-auto px-8">
                <HoverEffect items={stats} />
            </div>
            <div className="max-w-7xl mx-auto my-12 grid md:grid-cols-3 grid-cols-1">
              {FundingProjects.map((card, index) => (
                <FundingCard
                    key={index}
                    text={card.text}
                    title={card.title}
                    description={card.description}
                    buttonText={card.buttonText}
                />
              ))}
            </div>
        </div>
    );
};

export default FundingPage;