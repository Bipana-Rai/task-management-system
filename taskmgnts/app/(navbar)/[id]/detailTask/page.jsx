"use client";
import ArrayCard from "@/components/ArrayCard";
import DeletePopup from "@/components/DeletePopup";
import {
  authorizeUserDetail,
  getProjectDetail,
} from "@/features/user/userSlice";
import { formatDate } from "@/utils/formateDate";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

const page = () => {
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state) => state.user);
  const router = useRouter();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const allProject = useSelector((state) => state.user.project);
  const newData = allProject?.find((e) => e._id === id);
  useEffect(() => {
    dispatch(getProjectDetail());
    dispatch(authorizeUserDetail());
  }, [id]);
  if (!newData) {
    return <p>Loading project details...</p>;
  }
  const {
    project,
    members,
    due_date,
    status,
    priority,
    manager,
    tasks,
    createdBy,
    createdAt,
    updatedAt,
  } = newData;

  const handleEdit = () => {
    if (profileInfo._id !== newData.createdBy._id) {
      return alert("you are not allowed to edit it");
    }
    router.push(`/edit/${id}/updateTask`);
  };
  const handleDelete = () => {
    if (profileInfo._id !== newData.createdBy._id) {
      return alert("you are not allowed to delete it");
    }

    setVisible(true);
  };
  return (
    <>
      <div className={`mt-20 lg:px-10 md:px-5 pb-5 `}>
        <div className="px-3">
          <div className="  pt-4 pb-7 lg:ps-7 ps-4 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <p className="md:text-2xl text-xl text-gray-800 font-bold">
              {project.toUpperCase()}
            </p>
            <div className="md:flex  gap-10 lg:gap-15  mt-5 ">
              <div className="flex md:flex-col gap-10 md:gap-0  ">
                <p className="text-gray-600 text-[15px]">Assigned By</p>
                <p className="text-gray-700 font-bold ">{createdBy.fullName}</p>
              </div>
              <div className="flex md:flex-col gap-10 md:gap-0  ">
                <p className="text-gray-600 text-[15px]">Managed By</p>
                <p className="text-gray-700 font-bold ">{manager}</p>
              </div>
              <div className="flex md:flex-col gap-10 md:gap-0">
                <p className="text-gray-600 text-[15px]">Priority</p>
                <p className="text-gray-700 font-bold ps-10 md:ps-0 ">
                  {priority}
                </p>
              </div>

              <div className="flex md:flex-col gap-11 md:gap-0">
                <p className="text-gray-600 text-[15px]">Status</p>
                <p className="text-gray-700 font-bold ps-10 md:ps-0">
                  {status}
                </p>
              </div>
              <div className="flex md:flex-col gap-11 md:gap-0">
                <p className="text-gray-600 text-[15px]">Due Date</p>
                <p className="text-gray-700 font-bold ps-5 md:ps-0">
                  {formatDate(due_date)}
                </p>
              </div>
             
              </div>
              <div className="flex items-center  lg:gap-5 gap-15  lg:justify-end lg:pe-8 lg:mt-[-60px] md:pt-3 ">
                <button
                  className="bg-gray-700 text-white px-5 lg:py-2 py-1 rounded-lg cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-700 text-white px-5 lg:py-2 py-1 rounded-lg cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </button>
            </div>
          </div>
        </div>
        <div className="md:grid md:grid-cols-4 gap-3 px-4">
          <div className="md:col-span-2 ">
            <p className="pt-4  text-gray-700 ps-3">Details</p>
            <div className="flex flex-col gap-4 ">
              <div className="flex bg-white rounded-xs px-4 pb-4  pt-4 gap-8 shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
                <div className=" text-gray-700 text-[15px] ">
                  <p className=" py-1">Jobs</p>
                  <p className=" py-1">Total Members</p>
                  <p className="text-gray-700 text-[15px] py-1"> Total Tasks</p>
                </div>
                <div>
                  <p className="py-1">: {project}</p>
                  <p className="py-1">: {members.length}</p>
                  <p className="py-1">: {tasks.length}</p>
                </div>
              </div>
              <ArrayCard data={tasks} title="Tasks" />
              <ArrayCard data={members} title={"Members"} />
            </div>
          </div>
          <div className="md:col-span-2 md:pt-10 pt-3 px-2  ">
            <div className="bg-white py-3 rounded-l shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
              <div className="border-b-1 border-gray-300 ps-4 py-1 text-gray-700 font-bold">
                <p>Additional Deatials</p>
              </div>
              <div className="flex gap-10">
                <div className="text-gray-700 text-[15px] ps-4 py-2">
                  <p className="pt-1">Created At</p>
                  <p className="pt-2">Updated At</p>
                  <p className="pt-2">Created by</p>
                </div>
                <div className=" pt-2">
                  <p className="pt-1">: {formatDate(createdAt)}</p>
                  <p className="pt-1">: {formatDate(updatedAt)}</p>
                  <p className="pt-1">: {createdBy.fullName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {visible && <DeletePopup setVisible={setVisible} id={id} />}
      </div>
    </>
  );
};

export default page;
