"use client";
import AllTask from "@/components/AllTasks";
import Taskbar from "@/components/Taskbar";
import { getProjectDetail } from "@/features/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProjectDetail());
  }, [dispatch]);

  return (
    <>
      <div>
        <Taskbar />
        {project?.length > 0 ? (
          <AllTask data={project} />
        ) : (
          <div className="h-[100vh] w-full flex  items-center justify-center">
            <p className=" text-xl text-gray-800">No task ....</p>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
