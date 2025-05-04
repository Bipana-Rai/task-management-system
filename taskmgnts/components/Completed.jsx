import { formatDate } from "@/utils/formateDate";
import { useRouter } from "next/navigation";
import React from "react";

const Completed = ({ project, selectedDate }) => {
const router=useRouter()
  const todayTask = project.filter(
    (e) => formatDate(e.due_date) === selectedDate.format("MMM DD YYYY")
  );

 
  return (
    <div className="ps-15 ">
      <p className=" font-bold text-2xl py-5">
        Task Due On{" "}
        <span className="text-gray-700">
          {selectedDate.format("MMM DD YYYY")}
        </span>
      </p>
      {todayTask.length>0?
      (<div className="pe-4 flex flex-col gap-5 ">
        {todayTask.map((e) => (
          <div
            key={e._id}
            className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.4)] px-5 py-2 cursor-pointer"
            onClick={()=>router.push(`/${e._id}/detailTask`)}

          >
            <p className="text-l text-gray-700 font-bold py-2 ">{e.project.charAt(0).toUpperCase() + e.project.slice(1)}</p>
            <p className="text-gray-600 pt-1">
              Assigned By: <span className="text-gray-900 px-3 ">{e.createdBy.fullName}</span>
            </p>
            <p className="text-gray-600 pt-1">
              Priority: <span  className="text-gray-900 px-3 ">{e.priority}</span>
            </p>
            <p className="text-gray-600 pt-1">
              Due date: <span  className="text-gray-900 px-3 ">{e.due_date}</span>
            </p>
          </div>
        ))}
      </div>):
      <div className="px-5 pt-3 ">
        <p className="text-red-600 text-xl">No task due on <span className=" font-semibold">{selectedDate.format("MMM DD YYYY")}</span></p>
        </div>}
    </div>
  );
};

export default Completed;
