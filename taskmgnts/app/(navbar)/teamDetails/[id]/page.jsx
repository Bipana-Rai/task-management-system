"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ImCamera } from "react-icons/im";
import { AnimatePresence } from "framer-motion";
import { getProjectDetail, getTeams } from "@/features/user/userSlice";
import { useParams } from "next/navigation";
import UploadProfile from "@/components/UploadProfile";

const page = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { project, teams } = useSelector((state) => state.user);

  const filterTeams = teams.find((e) => e._id === id);
  const filterProject = project?.filter((proj) =>
    proj.members.some(
      (mem) => mem.toLowerCase() === filterTeams?.fullName?.toLowerCase()
    )
  );
 
  const pending = filterProject.filter((e) => e.status === "pending");
  const inProgress = filterProject.filter((e) => e.status === "in progress");
  const completed = filterProject.filter((e) => e.status === "Completed");

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getProjectDetail());
  }, [dispatch]);

  return (
    <>
      <div className=" relative mt-20">
        <div className="  md:grid md:grid-cols-4 lg:ps-15 ">
          <div className="  px-4 col-span-2  lg:pb-8  ">
            <div className="  ">
              <div className="flex flex-col md:justify-center md:items-center py-4 px-2">
                <div className="flex relative">
                  <div className=" relative h-[200px] w-[200px] rounded-full overflow-hidden  bg-gray-300">
                    <Image
                      src={filterTeams?.profileImage || "/profile.webp"}
                      alt="profile"
                      className="object-cover border-2"
                      fill
                      priority
                    />
                  </div>
                  
                </div>

                <div className=" leading-0.5 py-4 lg:flex flex-col items-center justify-center  ">
                  <p className="text-2xl py-3 ">{filterTeams?.fullName}</p>
                  <p className="md:px-10">{filterTeams?.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl   ">
              <div className=" flex lg:gap-20 gap-8   ">
                <div className="text-gray-500">
                  <p className="px-2 py-2">Name</p>
                  <p className="px-2 py-2">Email</p>
                  <p className="px-2 py-2">Role</p>
                  <p className="px-2 py-2">Department</p>
                </div>
                <div className="pe-7">
                  <p className="px-2 py-2 text-gray-900">
                    {filterTeams?.fullName}
                  </p>
                  <p className="px-2 py-2 text-gray-900">
                    {filterTeams?.email}
                  </p>
                  <p className="px-2 py-2 text-gray-900">{filterTeams?.role}</p>
                  <p className="px-2 py-2 text-gray-900">
                    {filterTeams?.department}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2  md:pe-15 pe-4 pb-4 ps-5 pt-6 md:pt-0 ">
            <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] ps-5 bg-white text-center lg:px-7 md:px-1 px-10 ">
              <p className="text-xl  p-4 ">Overview</p>
              <div className="flex gap-4 items-center justify-around text-center">
                <div className="py-3">
                  <p className="text-2xl ">{completed.length}</p>
                  <p className="text-gray-500">completed</p>
                </div>
                <div>
                  <p className="text-2xl ">{inProgress.length}</p>
                  <p className="text-gray-500">In progress</p>
                </div>
                <div>
                  <p className="text-2xl ">{pending.length}</p>
                  <p className="text-gray-500">Pending</p>
                </div>
              </div>
            </div>
            <div className="bg-white mt-8 p-5  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="text-2xl px-2 ">Activity</div>
              <ul className="list-disc list-inside">
                {filterProject?.map((proj) =>
                  proj.tasks?.map((task, i) => (
                    <li key={i} className="px-2 py-2 text-gray-900">
                      {task}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          <div className="absolute top-0 ">
            <AnimatePresence mode="wait">
              {visible && (
                <UploadProfile
                  profileInfo={profileInfo}
                  setVisible={setVisible}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
