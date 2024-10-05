"use client";

import { Cover } from "@/components/ui/cover";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { HoverEffect } from "@/components/ui/card-hover-effect";


export const projects = [
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
      title: "300K",
      description:
        "Cool Contributors",
      link: "https://netflix.com",
    },
  ];


const EventPage = () => {
    return (
        <div>
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                Unleash the potential of <Cover>Quadratic Funding</Cover>
            </h1>
            <div className="max-w-5xl mx-auto px-8">
                <HoverEffect items={projects} />
            </div>
            <div className="max-w-7xl mx-auto mt-12">
                <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
                    <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
                
                    <EvervaultCard text="hover" />
                
                    <h2 className="dark:text-white text-black mt-4 text-sm font-light">
                        Hover over this card to reveal an awesome effect. Running out of copy
                        here.
                    </h2>
                    <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
                        Fund this project
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventPage;