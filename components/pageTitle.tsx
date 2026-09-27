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
      imgSrc: "/images/aboutPage_HeroSection.png",
      imgAlt: "About Page Hero Image",
    },
    "/events": {
      title: "Events",
      imgSrc: "/images/eventsPage_HeroSection.png",
      imgAlt: "Events Page Hero Image",
    },
    "/donate": {
      title: "Fuel the Future of STEM",
      imgSrc: "/images/alliancePic.png",
      imgAlt: "Donate Page Hero Image",
    },
    "/account": {
      title: "My Account",
      imgSrc: "/images/controllers.png",
      imgAlt: "Account Page Hero Image",
    },
  };

  const info =
    titleInfo[pathname] ??
    (pathname.startsWith("/signup/")
      ? {
          title: "Sign Up",
          imgSrc: "/images/controllers.png",
          imgAlt: "Signup Page Hero Image",
        }
      : undefined) ??
    ({
      title: "Page Not Found",
      subtitle:
        "Check the URL for typos or contact us at stemlabsf@gmail.com.",
      imgSrc: "/images/theThinker.png",
      imgAlt: "No Page Found Image",
    } as HeaderProps);

  return (
    <div className="relative w-full h-[45vh] sm:h-[45vh] lg:h-[75vh] mt-20 overflow-hidden rounded-b-2xl shadow-md">
      {/* background image */}
      <img
        src={info.imgSrc}
        alt={info.imgAlt}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* text container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-white font-extrabold text-3xl md:text-5xl drop-shadow-lg mb-2">
          {info.title}
        </h1>
      </div>
    </div>
  );
};

export default PageTitle;
