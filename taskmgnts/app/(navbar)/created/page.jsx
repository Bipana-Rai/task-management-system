"use client";
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
  const { project, profileInfo } = useSelector((state) => state.user);
  const filterData = project.filter((e) => e.createdBy._id === profileInfo._id);
  useEffect(() => {
    dispatch(authorizeUserDetail());
    dispatch(getProjectDetail());
  }, []);
  return (
    <div>
      <Taskbar />
      {filterData.length > 0 ? (
        <AllTask data={filterData} />
      ) : (
        <div className="h-[100vh] w-full flex  items-center justify-center">
          <p className=" text-xl text-gray-800">No task has been created....</p>
        </div>
      )}
    </div>
  );
}

export default page;
