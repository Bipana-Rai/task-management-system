"use client";
export const dynamic = "force-dynamic";

import AllTask from "@/components/AllTasks";
import Taskbar from "@/components/Taskbar";

import {
  authorizeUserDetail,
  getProjectDetail,
} from "@/features/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function page() {
  const dispatch = useDispatch();
  const { profileInfo, project } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getProjectDetail());
    dispatch(authorizeUserDetail());
  }, []);
  const filterData = project?.filter((task) =>
    task?.members?.some((member) =>
      member?.toLowerCase().includes(profileInfo?.fullName?.toLowerCase())
    )
  );

  return (
    <>
     
     <div>
      <Taskbar />
      {filterData.length > 0 ? (
        <AllTask data={filterData} />
      ) : (
        <div className="h-[100vh] w-full flex  items-center justify-center">
          <p className=" text-xl text-gray-800">No task has been assigned....</p>
        </div>
      )}
    </div>
    </>
  );
}

export default page;
