import React from "react";

function TeamSkeleton() {
  return (
    <>
    
        {[...Array(6)].map((_, index) => (
          <div key={index} className="md:h-60 md:w-60 h-50 w-40 flex flex-col pt-4 items-center rounded-md bg-gray-400  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="md:h-30 h-20 w-20   md:w-30 rounded-full bg-gray-500 animate-pulse "></div>
            <div className=" w-30 mt-5 animate-pulse  bg-gray-500 py-2  px-1"></div>
            <div className=" w-30 mt-5 animate-pulse  bg-gray-500 py-2  px-1"></div>
          </div>
        ))}
      
    </>
  );
}

export default TeamSkeleton;
