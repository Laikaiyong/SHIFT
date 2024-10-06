"use client";

import { useState } from "react";
import { Cover } from "@/components/ui/cover";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Tabs } from "@/components/ui/tabs";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";
import {registerCommunity} from "../api/RegisterCommunity.js";
// import {calculateAIResult } from "../api/prompts.js";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

import { 
  IconBrandInstagram,
  IconBrandX,
  IconWorldWww
} from "@tabler/icons-react";

import Image from "next/image";
import axios from "axios";

// const prompt = "Write a story about a magic backpack.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

export const stats = [
    {
      title: "120",
      description: "Projects",
      link: "https://stripe.com",
    },
    {
      title: "50K USDT",
      description: "Matching Pool",
      link: "https://stripe.com",
    },
    {
      title: "10K USDT",
      description: "Total Contributions",
      link: "https://netflix.com",
    },
    {
      title: "333",
      description: "Cool Contributors",
      link: "https://netflix.com",
    },
];

const CommunityCardv2 = ({ title, description, buttonText, image, href }) => {
  return (
    <div className="block">
      {/* <a
        href={href}
        className="block transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      > */}
        <GlareCard className="flex flex-col items-center justify-center p-6" >
          <Image
            src={image}
            height="200"
            width="200"
            className="mx-12 h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
          <p className="text-white font-bold text-xl mt-4">{title}</p>
          <p className="text-white font-normal text-sm mt-4">{description}</p>
          <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white dark:text-white px-2 py-0.5 hover:bg-blue-500 hover:text-white hover:border-blue-500" >
            {buttonText}
          </p>
          {/* New buttons for AI Analysis and About Project */}
          {/* <div className="mt-4 flex space-x-4 pb-4"> 
            <button className="text-sm border font-light border-white/[0.2] rounded-full px-4 py-2 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out" >
              AI Analysis
            </button>
            <button className="text-sm border font-light border-white/[0.2] rounded-full px-4 py-2 hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out">
              About Project
            </button>
          </div> */}
        </GlareCard>

      {/* </a> */}
    </div>
  );
};

const initialCommunities = [
  {
    text: "hover",
    title: "ETH KL",
    description: "KL ETH People",
    buttonText: "Fund this project",
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=1250,height=357.14285714285717/calendar-cover-images/4i/efe41956-0d33-485d-975f-7c5c47a5c2d2",
    href: "https://www.2024.ethkl.org/",
  },
  {
    text: "hover",
    title: "ETHIndia",
    description: "India ETH People",
    buttonText: "Fund this project",
    image: "https://pbs.twimg.com/profile_banners/964919649837056000/1677672190/1500x500",
    href: "https://ethglobal.com/events/india2024",
  },
  {
    text: "click",
    title: "ETHDenver",
    description: "Denver ETH People",
    buttonText: "Support this project",
    image: "https://pbs.twimg.com/profile_banners/754438462141378560/1723141015/1080x360",
    href: "https://www.ethdenver.com/",
  },
  {
    text: "click",
    title: "ETHBarcelona",
    description: "Barcelona ETH People",
    buttonText: "Support this project",
    image: "https://pbs.twimg.com/profile_banners/1443208602089631744/1684278570/1080x360",
    href: "https://ethbarcelona.com/",
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
  const [communities, setCommunities] = useState(initialCommunities);

  const [generatedDescription, setGeneratedDescription] = useState("");

  // const generateDescription = async () => {
  //   const prompt = "Write a short description about the Ethereum Kuala Lumpur community."; // Update this prompt as needed
  //   const result = await model.generateContent(prompt);
  //   setGeneratedDescription(result.response.text()); // Set the generated text
  //   console.log(result.response.text());
  // };
  const register = async () => {
    try {
      // Wait for the registerCommunity API call to finish
      await registerCommunity("New ETH Community", "Country Name");
  
      // Add the new community to the state after the API call succeeds
      const newCommunity = {
        text: "hover",
        title: "New ETH Community",
        description: "Description of the new ETH community",
        buttonText: "Fund this project",
        image: "https://pbs.twimg.com/profile_banners/1443208602089631744/1684278570/1080x360",
        href: "https://example.com/new-community",
      };
  
      // Update the state by adding the new community
      setCommunities((prevCommunities) => [...prevCommunities, newCommunity]);
  
      console.log("Community successfully registered!");
    } catch (error) {
      console.error("Error registering community:", error);
    }
  };

  return (
    <div className="my-16 max-w-7xl mx-auto text-center item-center pb-24">
      <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        For Communities <Cover>By Communities</Cover>
      </h1>
      <div className="max-w-6xl mx-auto px-8">
        <HoverEffect items={stats} />
      </div>
      <TypewriterEffect words={words} className="text-sm" />
      <button className="bg-green-800 text-white px-4 py-2 rounded-lg mt-4 ml-8" onClick={()=>register()}>Add New Community</button>
      {/* <div className="mx-auto my-12 grid md:grid-cols-4 grid-cols-1 gap-6">
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
      </div> */}
      <div className="my-12 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-2">
        {communities.map((card, index) => (
          <Modal key={index}  >
            <ModalTrigger className="flex justify-center group/modal-btn" >
                  <CommunityCardv2
                    key={index}
                    text={card.text}
                    title={card.title}
                    description={card.description}
                    buttonText={card.buttonText}
                    image={card.image}
                    href={card.href}
                  />
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <div className="relative isolate flex flex-col justify-end rounded-2xl px-8 pb-12 pt-36 w-full">
                  <img
                    className="absolute z-40 rounded-full top-20 left-8 h-40 w-40 object-cover border-black border-2"
                    src="https://pbs.twimg.com/profile_images/1738526306437148672/Zdqy1l8f_400x400.jpg"
                    alt="Profile"
                  />
                  <img
                    className="absolute rounded-t-lg inset-0 h-full w-full object-cover border-black border-2"
                    src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=1250,height=357.14285714285717/calendar-cover-images/4i/efe41956-0d33-485d-975f-7c5c47a5c2d2"
                    alt="Banner"
                  />
                </div>
                <div className="flex flex-row justify-end gap-4 px-6 py-4">
                  <a
                    href="https://instagram.com/ethkl1"
                    className="bg-white text-gray-800 dark:text-white dark:bg-gray-800 rounded-lg"
                  >
                    <IconBrandInstagram />
                  </a>
                  <a
                    href="https://x.com/ethkl1"
                    className="bg-white text-gray-800 dark:text-white dark:bg-gray-800 rounded-lg"
                  >
                    <IconBrandX />
                  </a>
                  <a
                    href="https://2024.ethkl.org/"
                    className="bg-white text-gray-800 dark:text-white dark:bg-gray-800 rounded-lg"
                  >
                    <IconWorldWww />
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 pb-6">
                  <div className="col-span-3">
                    <div className="text-left bg-white px-8">
                      <div className="grid grid-cols-4 gap-4">
                        <p className="p-2  text-gray-800 font-bold text-md rounded-lg border-2 border-black">
                          3938 <br /> <span className="text-xs font-normal text-gray-800">followers</span>
                        </p>
                        <p className="p-2 text-gray-800 font-bold text-md rounded-lg border-2 border-black"> 
                          280 <br /> <span className="text-xs font-normal text-gray-800">fund supporters</span>
                        </p>
                        <p className="p-2 text-gray-800 font-bold text-md rounded-lg border-2 border-black"> 
                          53.1K <br /> <span className="text-xs font-normal text-gray-800">funds raised</span>
                        </p>
                        <p className="p-2 text-gray-800 font-bold text-md rounded-lg border-2 border-black"> 
                          4.6 <br /> <span className="text-xs font-normal text-gray-800">overall rating</span>
                        </p>
                      </div>
                    </div>
                    <div className="px-8 py-6">
                      <p className="p-2 text-gray-800 font-normal text-sm rounded-lg border-2 border-black">
                      {generatedDescription}
                      </p>
                      <button onClick={async () => {
                        //  const response = await fetch("/api/generate", {
                        //   // route to your backend will depend on implementation
                        //   method: "POST",
                        //   headers: {
                        //     "Content-Type": "application/json",
                        //   },
                        //   body: JSON.stringify({
                        //     desc: "Write a short description about the Ethereum Kuala Lumpur community."}),
                        // });
                        // const accounts = typeof window !== 'undefined' ? window.ethereum.selectedAddress : null;
                        // const from = accounts[0]
    // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
    // This uses a Node.js-style buffer shim in the browser.
    const msg = `0x${Buffer.from(prompt, "utf8").toString("hex")}`
    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [msg, "0x751Fd4490F06770809F67EA112E3fCAa31aA64bE"],
    })
                        setTimeout(() => setGeneratedDescription("Imagine a mystical tree, its roots entwined with the bustling streets of Kuala Lumpur. This is the Ethereum KL community, its branches reaching out to over 3938 curious minds, offering shade and knowledge about the decentralized future. This vibrant tree thrives thanks to the dedication of 280 devoted gardeners, their contributions like magic spells, conjuring over 53.1K in resources! The air hums with innovation, a testament to their 4.6-star efforts (rated by the very stars themselves, some say). This magical tree is more than just a community; it's a beacon, attracting those eager to build, learn, and grow within the Ethereum ecosystem."), 4000)
                        // time.sleep(2)
                        
                      }} className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 my-2 rounded-md border border-black w-28">
                        AI Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </ModalContent>
              <ModalFooter className="gap-4">
                <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                  Cancel
                </button>
                <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28" >
                  Register
                </button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        ))}
      </div>
      {/* <button 
  onClick={() => voteForEvent(1)} 
  style={{ backgroundColor: 'black', color: 'white' }}>
  for testing
</button>
<button 
  onClick={() => calculateAIResult(1, "testing", signer)} 
  style={{ backgroundColor: 'black', color: 'white' }}>
  testing AIGC
</button> */}

    </div>
  );
};

export default CommunityPage;
