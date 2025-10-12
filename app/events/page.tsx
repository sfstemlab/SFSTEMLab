"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TimeslotCard } from "@/components/timeslotCard";
import { TimeslotModal } from "@/components/timeslotModal";
import { Card } from "@/components/card";
import { EventProps } from "@/types/types";
import { Loader2 } from "lucide-react";

interface TimeslotModalProps {
  title: string;
  desc: string;
  teamNum?: number;
  date: Date;
  startTime: number;
  endTime: number;
}

const Events = () => {
  const [loading, setLoading] = useState(true);
  const [timeslots, setTimeslots] = useState<TimeslotModalProps[]>([]);

  // Fetch timeslots from API
  useEffect(() => {
    const fetchTimeslots = async () => {
      try {
        const res = await fetch("/api/getTimeslots", { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch timeslots");
        const data = await res.json();
        setTimeslots(data.timeslots);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeslots();
  }, []);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const monthMap: Record<string, number> = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const events: EventProps[] = [
    /*
        Sunday 11/23/25, 2-4pm
        Sunday 12/21/25, 2-4pm
        Sunday 1/5/26, 2-4pm
        Saturday 2/21/26, 2-4pm
        Competition Tours! 3/14-3/15
    */
    {
      title: "STEM Workshop #2",
      day: 16,
      month: "September",
      desc: "Learn about the wonders of CAD & CNC machining in this hands-on workshop.",
      tags: ["CNC", "CAD", "CAM"],
      difficulty: 3,
      startTime: 12,
      duration: 3,
      endTime: 3,
      materials: ["Water Bottle"],
      ageGroup: "10-12",
      expandedContent: () => (
        <p className="text-white leading-relaxed text-base">
          Join us for an exciting, hands-on workshop that introduces middle school students
          to the world of STEM through CAD and CNC machining. Create your own design from
          start to finish — no prior experience required!
        </p>
      ),
    },
  ].filter((event) => {
    const eventMonthNum = monthMap[event.month];
    if (eventMonthNum > currentMonth) return true;
    if (eventMonthNum === currentMonth && event.day >= currentDay) return true;
    return false;
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="w-full h-1/2 bg-darkBlue px-6 md:px-20 py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <div className="text-center sm:text-left mb-6 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-white">Upcoming Events</h1>
          <p className="text-white/70 text-sm mt-2">
            Explore our latest STEM workshops and timeslot opportunities.
          </p>
        </div>
        <TimeslotModal />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-[200px]">
          <Loader2 className="text-brand animate-spin mr-3" size={24} />
          <span className="text-white/70">Loading events and timeslots...</span>
        </div>
      )}

      {/* Events & Timeslots Grid */}
      {!loading && (events.length > 0 || timeslots.length > 0) ? (
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event, i) => (
            <motion.div key={i} variants={fadeIn} custom={i}>
              <Card event={event} />
            </motion.div>
          ))}
          {timeslots.map((slot, i) => (
            <motion.div key={i} variants={fadeIn} custom={i + events.length}>
              <TimeslotCard
                slot={{
                  title: slot.title,
                  date: slot.date,
                  desc: slot.desc,
                  startTime: slot.startTime,
                  endTime: slot.endTime,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/70 mt-20"
          >
            <h2 className="text-xl font-semibold mb-2">
              More events coming soon...
            </h2>
            <p className="text-sm">
              Check back later or follow us for updates on future STEM experiences!
            </p>
          </motion.div>
        )
      )}
    </div>
  );
};

export default Events;
