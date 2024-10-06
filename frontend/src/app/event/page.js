"use client";

import React from "react";
import { useRef, useState } from "react";
import { Cover } from "@/components/ui/cover";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Timeline } from "@/components/ui/timeline";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Calendar } from "@/components/ui/calendar"
import { BackgroundLines } from "@/components/ui/background-lines";
import {submitEvent, voteForEvent, approveEvent, getEvent} from "../api/EventHubManagement.js";

import {
    IconClock,
    IconMapPin
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";


const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
  ];
  

const intialEventCardsData = [
    {
        title: "#ETHKL PRE PARTY",
        description: "Prepare to get lost in non-stop beats, neon lights, and an electric atmosphere that’s going to set the night on fire. Whether you're a pro dev or just looking for an unforgettable party, this is where the innovators let loose and connect. 💃🕺🔥",
        image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/td/d903d32a-cf54-4957-8ede-b1568f018a80",
        link: "https://lu.ma/z1krlh0f",
        date: "2024-10-06",
        time: "10:00",
        venue: "Kuala Lumpur Convention Centre, Malaysia"
    },
    {
        title: "#ETHKL PRE PARTY",
        description: "Prepare to get lost in non-stop beats, neon lights, and an electric atmosphere that’s going to set the night on fire. Whether you're a pro dev or just looking for an unforgettable party, this is where the innovators let loose and connect. 💃🕺🔥",
        image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/td/d903d32a-cf54-4957-8ede-b1568f018a80",
        link: "https://lu.ma/z1krlh0f",
        date: "2024-10-06",
        time: "13:00",
        venue: "Kuala Lumpur Convention Centre, Malaysia"
    },
    {
        title: "#ETHKL PRE PARTY",
        description: "Prepare to get lost in non-stop beats, neon lights, and an electric atmosphere that’s going to set the night on fire.",
        image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/td/d903d32a-cf54-4957-8ede-b1568f018a80",
        link: "https://lu.ma/z1krlh0f",
        date: "2024-10-07",
        time: "11:00",
        venue: "Kuala Lumpur Convention Centre, Malaysia"
    },
    {
        title: "#ETHKL PRE PARTY",
        description: "The premier conference for Next.js developers",
        image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/td/d903d32a-cf54-4957-8ede-b1568f018a80",
        link: "https://lu.ma/z1krlh0f",
        date: "2024-10-07",
        time: "14:00",
        venue: "Kuala Lumpur Convention Centre, Malaysia"
    },
    {
        title: "#ETHKL PRE PARTY",
        description: "The premier conference for Next.js developers",
        image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/td/d903d32a-cf54-4957-8ede-b1568f018a80",
        link: "https://lu.ma/z1krlh0f",
        date: "2024-10-08",
        time: "10:00",
        venue: "Kuala Lumpur Convention Centre, Malaysia"
    },
    {
        title: "#ETHKL PRE PARTY",
        description: "The premier conference for Next.js developers",
        image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/td/d903d32a-cf54-4957-8ede-b1568f018a80",
        link: "https://lu.ma/z1krlh0f",
        date: "2024-10-08",
        time: "13:00",
        venue: "Kuala Lumpur Convention Centre, Malaysia"
    },
    {
        title: "#ETHKL PRE PARTY",
        description: "The premier conference for Next.js developers",
        image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/td/d903d32a-cf54-4957-8ede-b1568f018a80",
        link: "https://lu.ma/z1krlh0f",
        date: "2024-10-08",
        time: "16:00",
        venue: "Kuala Lumpur Convention Centre, Malaysia"
    },
];

const EventCard = ({ title, description, image, link, date, venue, time }) => {
    return (
        <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-8 border  ">
            <CardItem
            translateZ="110"
            className="text-2xl font-bold text-green-900 dark:text-white"
            >
            {title}
            </CardItem>
            <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
            {description}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
            <Image
                src={image}
                height="600"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
            />
            </CardItem>
            <CardItem translateZ="50" className="w-full mt-4 py-4 text-sm text-green-800">
                <div className="flex flex-row gap-4 py-1">
                    <div><IconClock className="h-5 w-5"/></div>
                    <div>{time}</div>
                </div> 
                <div className="flex flex-row gap-4 py-1">
                    <div><IconMapPin className="h-5 w-5"/></div>
                    <div>{venue}</div>
                </div>
                <div className="flex flex-row items-center justify-left py-4 w-full">
                <AnimatedTooltip items={people} />
                <div className="pl-6">6 attendees</div>
                </div>
            </CardItem>
            <div className="flex justify-between items-center mt-4">
            <CardItem
                translateZ={20}
                as={Link}
                href={link}
                target="__blank"
                className="px-4 py-2 rounded-xl text-xs font-normal text-green-800 dark:text-white"
            >
                More information
            </CardItem>
            <CardItem
                translateZ={20}
                as={Link}
                href={link}
                className="px-4 py-2 rounded-xl bg-green-800 dark:bg-white dark:text-black text-white text-sm font-bold"
                onClick={() => approveEvent(2)}
            >
                Approve Event
            </CardItem>
            <CardItem
                translateZ={20}
                as={Link}
                href={link}
                className="px-4 py-2 rounded-xl bg-green-800 dark:bg-white dark:text-black text-white text-sm font-bold"
                onClick={() => voteForEvent(2)}
            >
                Fund now!
            </CardItem>
            </div>
        </CardBody>
        </CardContainer>
    );
};


const EventPage = () => {
    const [eventCardsData, setEventCardsData] = useState(intialEventCardsData);
    const [date, setDate] = React.useState(new Date());
    const timelineRefs = useRef({});

    const Create = async () => {
        try {
          // Wait for the registerCommunity API call to finish
          await submitEvent("EthSG", 1728424800, 1728597600);
      
          // Add the new community to the state after the API call succeeds
          const newCardData =  {
            title: "#AMAZING PRE PARTY",
            description: "Prepare to get lost in non-stop beats, neon lights, and an electric atmosphere that’s going to set the night on fire. Whether you're a pro dev or just looking for an unforgettable party, this is where the innovators let loose and connect. 💃🕺🔥",
            image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/td/d903d32a-cf54-4957-8ede-b1568f018a80",
            link: "https://lu.ma/z1krlh0f",
            date: "2024-10-06",
            time: "10:00",
            venue: "Kuala Lumpur Convention Centre, Malaysia"
        }
      
          // Update the state by adding the new community
          setEventCardsData((prevCardsData) => [...prevCardsData, newCardData]);
      
          console.log("Community successfully registered!");
        } catch (error) {
          console.error("Error registering community:", error);
        }
      };

    const TimelineData = [
        {
            title: "6 Oct 2024",
            content: (
                <div ref={el => timelineRefs.current['6-10-2024'] = el} className="grid grid-cols-1 gap-2 xl:grid-cols-2">
                    {eventCardsData
                        .filter(event => {
                            const eventDate = new Date(event.date);
                            return eventDate.getMonth() === 9 && eventDate.getDate() === 6; // October is month 9 (0-indexed)
                        }) 
                        .map((event, index) => (
                            <EventCard
                                key={index}
                                title={event.title}
                                description={event.description}
                                image={event.image}
                                link={event.link}
                                date={event.date}
                                venue={event.venue}
                                time={event.time}
                            />
                        ))}
                </div>
            ),
        },
        {
            title: "7 Oct 2024",
            content: (
                <div ref={el => timelineRefs.current['7-10-2024'] = el} className="grid grid-cols-1 gap-2 xl:grid-cols-2">
                    {eventCardsData
                        .filter(event => {
                            const eventDate = new Date(event.date);
                            return eventDate.getMonth() === 9 && eventDate.getDate() === 7; // October is month 9 (0-indexed)
                        }) 
                        .map((event, index) => (
                            <EventCard
                                key={index}
                                title={event.title}
                                description={event.description}
                                image={event.image}
                                link={event.link}
                                date={event.date}
                                venue={event.venue}
                                time={event.time}
                            />
                        ))}
                </div>
            ),
        },
        {
            title: "8 Oct 2024",
            content: (
                <div ref={el => timelineRefs.current['8-10-2024'] = el} className="grid grid-cols-1 gap-2 xl:grid-cols-2">
                    {eventCardsData
                        .filter(event => {
                            const eventDate = new Date(event.date);
                            return eventDate.getMonth() === 9 && eventDate.getDate() === 8; // October is month 9 (0-indexed)
                        }) 
                        .map((event, index) => (
                            <EventCard
                                key={index}
                                title={event.title}
                                description={event.description}
                                image={event.image}
                                link={event.link}
                                date={event.date}
                                venue={event.venue}
                                time={event.time}
                            />
                        ))}
                </div>
            ),
        },
    ];

    const handleDateChange = (newDate) => {
        setDate(newDate);
        const date = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
        scrollToMonth(date);
    };

    const scrollToMonth = (monthYear) => {
        const ref = timelineRefs.current[monthYear];
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="px-4">
            <BackgroundLines className="flex items-start justify-center w-full flex-col">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-8 bg-clip-text text-transparent bg-gradient-to-b from-green-800 via-neutral-700 to-green-700 dark:from-green-800 dark:via-white dark:to-white">
                Level up your experiences by <br /> joining <Cover>exciting events</Cover>
            </h1>
            </BackgroundLines>
            <h1 className="text-2xl text-black">
            <p className="shadow-[0_0_0_3px_#000000_inset] mx-8 px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                ETH KL 2024 Events
            </p>
            </h1>
            <div>
                <button className="bg-green-800 text-white px-4 py-2 rounded-lg mt-4 ml-8" onClick={() =>Create()}>
                    Create Event
                </button>
            </div>
            <div className="flex flex-col sm:flex-row">
                <div>
                    <Timeline data={TimelineData} />
                </div>
                <div className="mt-12">
                    <div className="hidden sm:block">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateChange}
                            className="rounded-md border text-black"
                        />
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default EventPage;