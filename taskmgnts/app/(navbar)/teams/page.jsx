"use client";
import TeamCard from "@/components/TeamCard";
import TeamSkeleton from "@/components/TeamSkeleton";
import { getTeams } from "@/features/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function page() {
  const { teams } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeams());
  }, []);
  console.log(teams);
  return (
    <>
      <div className="pt-15 lg:px-7  pb-5 ">
       
      <p className="text-2xl  text-center text-gray-600 font-semibold">Our Teams</p> 
      <div className="flex flex-wrap gap-7 px-2 justify-center pt-3  ">
        {teams.length > 0 ?(teams.map((e) => (
          <TeamCard data={e} key={e._id} />
        ))):( <TeamSkeleton/>)}
        
        </div>

      </div>

    </>
  );
}

export default page;
