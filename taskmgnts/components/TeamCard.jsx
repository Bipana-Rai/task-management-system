import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function TeamCard({ data }) {
  const router=useRouter()
  return (
    <div className="md:h-60 md:w-60 h-50 w-40 flex flex-col pt-4 items-center rounded-md cursor-pointer  bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
    onClick={()=>router.push(`/teamDetails/${data._id}`)}>
      <div className="md:h-30 h-20 w-20  relative md:w-30 rounded-full bg-gray-300 overflow-hidden">
        <Image
          src={data?.profileImage || "/profile.png"}
          className=" absolute object-cover"
          alt="profile"
          fill
        />
      </div>
      <div className=" w-full overflow-x-hidden  text-center pt-2  px-1">
        <p className="text-gray-800 font-semibold">{data.fullName}</p>
        <p className="text-gray-600">{data.role}</p>
        <p className=" text-gray-600 md:text-[16px] text-[13px]">{data.email}</p>
      </div>
    </div>
  );
}

export default TeamCard;
