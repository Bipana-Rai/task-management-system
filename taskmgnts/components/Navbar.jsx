"use client";
import { openPopup } from "@/features/user/popupSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { authorizeUserDetail } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { profileInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(authorizeUserDetail());
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(value)}`);
    } else {
      router.push("/");
    }
  };


  return (
    <>
      <div className="fixed top-0 bg-gray-700  z-10  lg:me-3 lg:px-2 pe-3   w-full ">
        <div className=" flex items-center justify-between  py-2 text-gray-800 px-2 h-13   ">
          <div
            className=" flex items-center gap-2 my-1 px-4 lg:ps-13 lg:ms-[17%] lg:text-2xl text-white h-full   "
            onClick={() => dispatch(openPopup())}
          >
            <GiHamburgerMenu className="lg:hidden cursor-pointer" />
          </div>
          <form action="" >
            <div className="flex items-center  rounded-xl  text-gray-700 gap-2 border-1 border-gray-300 bg-white lg:ps-2 ps-1  pe-2 ">
              <input
                key="search-input"
                className="  py-1  lg:w-70  w-full px-2 outline-0 "
                type="text"
                onChange={handleChange}
                placeholder="search for tasks..."
              />
              <button type="submit" className="cursor-pointer ">
                <ImSearch />
              </button>
            </div>
          </form>
          <div className="flex items-center md:gap-3 ps-2 gap-1 md:pe-7 cursor-pointer  "onClick={()=> router.push("/profile")}>
            <div className=" h-10 w-10  bg-gray-200 relative rounded-full overflow-hidden">
              <Image
                src={profileInfo?.profileImage || "/profile.png"}
                className="object-cover"
                alt="pp"
                fill
              />
            </div>
            <div className="text-gray-100 hidden md:block leading-4">
              <p className="">
                {profileInfo?.fullName}
              </p>
              <p className="text-[12px] text-gray-300">{profileInfo.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
