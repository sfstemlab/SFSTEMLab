"use client";
import { usePathname } from "next/navigation";
import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  imgSrc: string;
  imgAlt: string;
}

const PageTitle = () => {
  const pathname = usePathname();

  // page data
  const titleInfo: Record<string, HeaderProps> = {
    "/": {
      title: "Welcome to the SF STEM Lab!",
      subtitle: "",
      imgSrc: "/images/HomePage_HeroSection.png",
      imgAlt: "Home Page Hero Image",
    },
    "/about": {
      title: "About Us",
      subtitle: "Who is the SF STEM Lab?",
      imgSrc: "/images/aboutPage_HeroSection.png",
      imgAlt: "About Page Hero Image",
    },
    "/events": {
      title: "Events",
      subtitle: "Find all of our upcoming events here",
      imgSrc: "/images/eventsPage_HeroSection.png",
      imgAlt: "Events Page Hero Image",
    },
    "/signup/STEM%20Workshop%20": {
      title: "Thank you for signing up!",
      subtitle: "Just a few quick questions, then you’re all set!",
      imgSrc: "/images/controllers.png",
      imgAlt: "Signup Page Hero Image",
    },
    "/donate": {
      title: "Fuel the Future of STEM",
      subtitle: "We thank you for any and all donations!",
      imgSrc: "/images/alliancePic.png",
      imgAlt: "Donate Page Hero Image",
    },
  };

  const info =
    titleInfo[pathname] ??
    ({
      title: "Page Not Found",
      subtitle:
        "Check the URL for typos or contact us at stemlabsf@gmail.com.",
      imgSrc: "/images/theThinker.png",
      imgAlt: "No Page Found Image",
    } as HeaderProps);

  return (
    <div className="relative w-full h-[45vh] sm:h-[45vh] lg:h-[75vh] mt-12 overflow-hidden rounded-b-2xl shadow-md">
      {/* background image */}
      <img
        src={info.imgSrc}
        alt={info.imgAlt}
        className="absolute inset-0 w-full h-full object-cover object-center"   
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* text container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-white font-extrabold text-3xl md:text-5xl drop-shadow-lg mb-2">
          {info.title}
        </h1>
        {info.subtitle && (
          <p className="text-white/80 text-sm md:text-base italic tracking-wide max-w-[600px]">
            {info.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
