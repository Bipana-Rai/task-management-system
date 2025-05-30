"use client";

import {
  authorizeUserDetail,
  getProjectDetail,
  getTeams,
} from "@/features/user/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Summary from "@/components/Summary";
import { CiShare2 } from "react-icons/ci";
import Image from "next/image";
import dynamic from "next/dynamic"; // Import dynamic from Next.js

// Dynamically import Calender with SSR disabled
const Calender = dynamic(() => import("@/components/Calender"), {
  ssr: false,
});

import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const page = () => {
  const { project, isLoading, teams, profileInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const router = useRouter();

  useEffect(() => {
    dispatch(getProjectDetail());
    dispatch(authorizeUserDetail());
    dispatch(getTeams());
  }, []);

  return (
    <>
      <div className=" mt-18 lg:ps-8 ps-3 ">
        <div className="grid grid-cols-4  ">
          <div className="lg:col-span-2 col-span-4 px-2 lg:px-14 ">
            <div className=" h-[400px] ">
              <div className="flex flex-col ">
                <p className="text-3xl text-gray-900 font-extrabold">
                  Welcome, {profileInfo?.fullName?.split(" ")[0]}!
                </p>
                <p className="pt-1 py-10">Here is your agenda for today</p>
              </div>
              <div
                className="w-full flex 
             items-start "
              >
                <Calender
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            </div>

            <div className=" pb-2 mb-2 mt-9 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-md md:px-10 px-5 lg:px-5  ">
              <div className=" w-full bg-white py-3 ">
                <p className="text-xl text-gray-900 font-semibold">
                  Project directory
                </p>
              </div>
              <div className="hide-scrollbar   h-[200px] bg-white overflow-y-auto  ">
                {project.map((e) => (
                  <div
                    key={e._id}
                    onClick={() => router.push(`/${e._id}/detailTask`)}
                    className="flex cursor-pointer justify-between gap-3 py-2  lg:pe-2"
                  >
                    <div className="flex items-center gap-3">
                      <CiShare2 />
                      <p>{e.project}</p>
                    </div>
                    <div className="flex ">
                      {e?.members?.map((m, i) => {
                        const matchedMember = teams?.find(
                          (tm) => tm.fullName === m
                        );
                        return (
                          matchedMember && (
                            <div
                              key={i}
                              className=" h-7 w-7 rounded-[50%] relative overflow-hidden bg-gray-300 border-1 border-gray-400"
                              style={{ marginLeft: i === 0 ? "0px" : "-5px" }}
                            >
                              <Image
                                src={
                                  matchedMember.profileImage || "/profile.png "
                                }
                                alt={matchedMember.fullName}
                                className="absolute object-cover"
                                fill
                              />
                            </div>
                          )
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="border-1 border-black px-3 py-2 rounded-2xl mt-3 text-[13px] cursor-pointer"
                onClick={() => router.push("/createtask")}
              >
                +Add more
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-4 pb-10 px-2 pt-3 ">
            <div className="">
              <Summary project={project} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className=" mt-20 lg:ps-8 ps-3">
        <p className="text-2xl font-bold text-gray-700">Overview</p>
        <div className=" lg:grid grid-cols-5">
          <div className="lg:col-span-3 ">
            <div className="hide-scrollbar flex overflow-x-auto   px-2  ">
              <div className="flex gap-3 flex-nowrap  min-w-[600px] lg:gap-10 py-3">
                {taskdetail.map((e, i) => (
                  <div
                    key={i}
                    className={`flex flex-col justify-center text-center  lg:py-2 w-[170px] bg-white  shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-xl `}
                    style={{ background: e.bg }}
                  >
                    <div
                      className={`flex justify-center ${e.color} text-2xl py-3 `}
                    >
                      {e.icon}
                    </div>
                    <p className="text-gray-600">{e.label}</p>
                    <p>{e.length}</p>
                  </div>
                ))}
              </div>
            </div>
            <Summary project={project} />
          </div>
          <div className="lg:col-span-2 lg:block ps-2  hidden ">
            <Calender
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <Completed project={project} selectedDate={selectedDate} />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default page;
