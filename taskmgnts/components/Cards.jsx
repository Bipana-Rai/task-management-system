"use client";
import {  getTeams } from "@/features/user/userSlice";
import { formatDate } from "@/utils/formateDate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const Cards = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getTeams());
  },[]);

  return (
    <>
      <div className="w-[330px] py-2  ">
        <div className={` shadow-[0_3px_10px_rgb(0,0,0,0.5)] py-3 ps-5 `}>
          <p className="text-gray-700 font-semibold text-[15px] ">
            {data.project.toUpperCase()}
          </p>
          <p className="text-gray-600 pt-1">Managed by: {data.manager}</p>
          <p className="text-gray-600 pt-1">
            Created by: {data.createdBy.fullName}
          </p>
          <p className="text-gray-600 pt-1 pb-2">
            Due: {formatDate(data.due_date)}
          </p>
          <div className="flex justify-between pe-5">
          <button
            className={`${
              data.status === "pending"
                ? "bg-red-700 "
                : data.status === "Completed"
                ? "bg-green-700 "
                : "bg-blue-700"
            }  text-gray-200 rounded-xl px-2 py-1 text-[13px] cursor-pointer`}
            onClick={() => router.push(`/${data._id}/detailTask`)}
          >
            View Details..
          </button>
          <div className="flex ">
            {data?.members?.map((m, i) => {
              const matchedMember = teams?.find((tm) => tm.fullName === m);
              return (
                matchedMember && (
                  <div
                    key={i}
                    className=" h-7 w-7 rounded-[50%] relative overflow-hidden bg-gray-300 border-1 border-gray-400"
                    style={{ marginLeft: i === 0 ? "0px" : "-5px" }}
                  >
                    <Image
                      src={matchedMember.profileImage || "/profile.png "}
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
      </div>
      </div>
    </>
  );
};

export default Cards;
