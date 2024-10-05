"use client";

import { Cover } from "@/components/ui/cover";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Tabs } from "@/components/ui/tabs";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";

import Image from "next/image";

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


  const CommunityCard = ({ text, title, description, buttonText }) => {
    return (
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-center max-w-sm mx-auto p-4 relative h-[30rem]">
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

const CommunityCardv2 = ({ title, description, buttonText, image, href }) => {
  return(
    <a href={href} className="block">
    <GlareCard className="flex flex-col items-center justify-center p-6">
      <Image
              src={image}
              height="200"
              width="200"
              className="mx-12 h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
          />
      <p className="text-white font-bold text-xl mt-4">{title}</p>
      <p className="text-white font-normal text-sm mt-4">{description}</p>
      <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white dark:text-white px-2 py-0.5 hover:bg-blue-500 hover:text-white hover:border-blue-500">
          {buttonText}
      </p>
    </GlareCard>
    </a>
  );
}

const Communities = [
  {
      text: "hover",
      title: "ETH Kuala Lumpur 2024",
      description: "Running out of copy here.",
      buttonText: "Fund this project",
      image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=1250,height=357.14285714285717/calendar-cover-images/4i/efe41956-0d33-485d-975f-7c5c47a5c2d2",
      href: "https://www.2024.ethkl.org/",
  },
  {
    text: "hover",
    title: "ETH Kuala Lumpur 2024",
    description: "Running out of copy here.",
    buttonText: "Fund this project",
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=1250,height=357.14285714285717/calendar-cover-images/4i/efe41956-0d33-485d-975f-7c5c47a5c2d2",
    href: "https://www.2024.ethkl.org/",
  },
  {
      text: "click",
      title: "ETH Kuala Lumpur 2024",
      description: "More copy needed here.",
      buttonText: "Support this project",
      image: "https://images.unsplash.com/photo-1629910190000-4b3b3b3b3b3b",
      href: "https://www.2024.ethkl.org/",
  },
  {
    text: "click",
    title: "ETH Kuala Lumpur 2024",
    description: "More copy needed here.",
    buttonText: "Support this project",
    image: "https://images.unsplash.com/photo-1629910190000-4b3b3b3b3b3b",
    href: "https://www.2024.ethkl.org/",
  },
];

const words = [
  {
    text: "Support",
  },
  {
    text: "these",
  },
  {
    text: "Cool",
  },
  {
    text: "Communities.",
    className: "text-green-800",
  },
];

const CommunityPage = () => {
  return (
      <div className="my-16 max-w-7xl mx-auto text-center item-center pb-24"> {/* Added pb-24 for bottom padding */}
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              For Communities <Cover>By Communities</Cover>
          </h1>
          <div className="max-w-6xl mx-auto px-8">
              <HoverEffect items={stats} />
          </div>
          <TypewriterEffect words={words} className="text-sm"/>
          <div className="mx-auto my-12 grid md:grid-cols-3 grid-cols-1 gap-6"> {/* Added gap-6 for space between cards */}
              {Communities.map((card, index) => (
                  <CommunityCard
                      key={index}
                      text={card.text}
                      title={card.title}
                      description={card.description}
                      buttonText={card.buttonText}
                  />
              ))}
              <a href="https://www.2024.ethkl.org/" className="block">
              
            </a>
          </div>
          <div className="mx-auto my-12 grid md:grid-cols-4 grid-cols-1 gap-6"> {/* Added gap-6 for space between cards */}
              {Communities.map((card, index) => (
                  <CommunityCardv2
                      key={index}
                      text={card.text}
                      title={card.title}
                      description={card.description}
                      buttonText={card.buttonText}
                      image={card.image}
                      href={card.href}
                  />
              ))}              
          </div>
      </div>
  );
};

export default CommunityPage;