"use client";
import { formatDate } from "@/utils/formateDate";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegCircle } from "react-icons/fa";

const Summary = ({ project }) => {
  const date = new Date();
  const router = useRouter();
  const today = dayjs().startOf("day");

  const todayTask = project.filter((e) => {
    const dueDate = dayjs(e.due_date);
    return dueDate.isSame(today, "day") && e.status !== "Completed";
  });

  const upcomingTask = project.filter((e) => {
    const dueDate = dayjs(e.due_date);
    return e.status !== "Completed" && dueDate.isAfter(today);
  });

  return (
    <>
      
        <div className="flex flex-col justify-between gap-2 max-h-[250px] overflow-y-auto  py-4 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
          <p className=" ps-3 py-3 font-bold text-xl text-gray-800 ">
            Urgent task
          </p>
          {todayTask.length > 0 ? (
            todayTask?.map((e, i) => (
              <div
                key={e._id}
                className="bg-white flex py-3 justify-between ps-5 pe-10 cursor-pointer border-b-1 border-gray-200  "
                onClick={() => router.push(`/${e._id}/detailTask`)}
              >
                <div className="text-gray-700 flex gap-3 items-center ">
                  {" "}
                  <FaRegCircle className="text-xl" />
                  {e.project}
                </div>
                <div className="text-red-600 flex items-center">
                  <p>* Today</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex md:mx-10  mx-4  ">
              <p className="text-gray-600 ">
                No tasks scheduled for today...{" "}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-2  max-h-[400px] overflow-y-auto bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.4)] py-4  mt-5">
          <p className=" ps-3 py-3 font-bold text-xl text-gray-800">
            Upcoming task
          </p>
          {upcomingTask.length > 0 ? (
            upcomingTask?.map((e, i) => (
              <div
                key={e._id}
                className="bg-white flex py-3 justify-between ps-5 pe-10 cursor-pointer border-b-1 border-gray-200  "
                onClick={() => router.push(`/${e._id}/detailTask`)}
              >
                <div className="text-gray-700 flex gap-3 items-center ">
                  {" "}
                  <FaRegCircle className="text-xl" />
                  {e.project}
                </div>
                <div className="text-red-600 flex items-center">
                  <p> {formatDate(e.due_date)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex md:mx-10  mx-4  ">
              <p className="text-gray-600 ">
                No upcoming task.{" "}
              </p>
            </div>
          )}
        </div>
        {/* <p className="text-xl text-gray-800 font-bold ps-3 py-4">
          Upcoming Task
        </p>
        <div className="flex flex-col gap-2 rounded-xl bg-gray-200 py-3 px-3 ">
          {upcomingTask.map((e, i) => (
            <div
              key={e._id}
              className="bg-white flex py-3 justify-between items-center md:px-10 px-2  shadow-[0_3px_10px_rgb(0,0,0,0.4)] cursor-pointer  "
              onClick={() => router.push(`/${e._id}/detailTask`)}
            >
              <div className="text-gray-800 font-bold">
                {e.project}
              </div>
              <div
                className={`w-30 h-7 flex items-center justify-center rounded-2xl text-gray-200 text-center ${
                  e.status === "pending" ? "bg-red-600" : "bg-gray-700"
                }`}
              >
                {e.status}
              </div>
            </div>
          ))}
        </div> */}
      
    </>
  );
};

export default Summary;
{
  /* <div className="lg:pe-0 pt-5 py-3">
        <div className=" hide-scrollbar overflow-x-auto bg-white  text-gray-600 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-2xl ">
          <div className="  pt-3 flex items-center  justify-between ">
            <div className=" ps-2 py-2 lg:text-2xl font-bold text-center text-xl md:text-left  ">
              Project Summary
            </div>
            <div className=" flex gap-10  px-5   justify-between ">
              <div className="bg-gray-700 text-gray-200 cursor-pointer lg:px-9 px-6 py-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:rounded-2xl rounded-xl">
                Status
              </div>
              <div className="bg-gray-700 text-gray-200 cursor-pointer lg:px-9 px-6 py-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:rounded-2xl rounded-xl ">
                Priority
              </div>
            </div>
          </div>

          <table className="  w-full min-w-[900px] table-auto pb-5    border-spacing-y-4 md:border-spacing-y-4 border-spacing-x-2 border-separate text-left  ">
            <thead>
              <tr>
                <th className=" pb-2 text-indigo-900  ps-2 text-left ">
                  Project
                </th>
                <th className="  pb-2 text-indigo-900 text-left  ">
                  Project Manager
                </th>
                <th className=" pb-2 text-indigo-900  px-7  "> Priority</th>
                <th className=" pb-2 text-indigo-900  px-4 ">Status</th>
                <th className=" pb-2 text-indigo-900  ps-3  ">Due Date</th>
              </tr>
            </thead>
            <tbody className="">
              {project.map((e, i) => (
                <tr key={i}>
                  <td className="  ps-2 text-gray-700 font-bold  ">
                    {e.project}
                  </td>
                  <td className=" ">
                    {e.manager}
                  </td>

                  <td
                    className={`   text-white  lg:rounded-3xl rounded-2xl  text-center   ${
                      e.priority === "high"
                        ? "bg-red-500"
                        : e.priority === "medium"
                        ? "bg-yellow-400"
                        : "bg-slate-400"
                    } `}
                  >
                    {e.priority}
                  </td>
                  <td
                    className={` text-center text-white lg:rounded-3xl rounded-2xl px-2 py-1   overflow-hidden 
                      ${
                        e.status === "pending"
                          ? "bg-slate-400 "
                          : e.status === "in progress"
                          ? "bg-blue-600 "
                          : e.status === "Completed"
                          ? "bg-emerald-600 "
                          : "bg-gray-400"
                      }
                      `}
                  >
                    {e.status}
                  </td>
                  <td className=" ps-3 ">
                    {formatDate(e.due_date)}
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */
}
