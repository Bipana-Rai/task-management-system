"use client";
import { profile } from "@/data/account";
import { action } from "@/data/actions";
import { navLink } from "@/data/mainnavlink";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";
import { closePopup, openLogout } from "@/features/user/popupSlice";


const Sidebar = () => {
  const sidebarRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isPopupOpen, isLogout } = useSelector((state) => state.popup);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        dispatch(closePopup());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  useEffect(() => {
    const matchRouteToIndex = () => {
      const navMatch = navLink.findIndex((item) => item.path === pathname);
      if (navMatch >=0)
        return setActiveIndex({ section: "nav", index: navMatch });

      const actionMatch = action.findIndex((item) => item.path === pathname);
      if (actionMatch >=0)
        return setActiveIndex({ section: "action", index: actionMatch });

      const profileMatch = profile.findIndex((item) => item.path === pathname);
      if (profileMatch >=0)
        return setActiveIndex({ section: "account", index: profileMatch });
    };

    matchRouteToIndex();
  }, [pathname]);

  //
  const handleItemClick = (section, index) => {
    dispatch(closePopup());
    setActiveIndex({ section, index });
  };

  const handleLogout = () => {
    // const confirm = window.confirm("you want to lohout");
    // if (confirm) {
    //   localStorage.clear();
    //   router.push("/login");
    // } else {
    //   return;
    // }
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={` fixed h-[100vh] top-0 left-0 bottom-0 bg-gray-800 z-30   shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:translate-x-0  transform -translate-x-full transition-transform duration-500 ${
          isPopupOpen && " translate-x-0"
        }`}
      >
        <div className="flex items-center gap-4 lg:w-60 sm:w-55 w-50 lg:text-2xl text-xl font-bold text-gray-100 bg-gray-900 ps-5   py-3   ">
          <GiHamburgerMenu
            className="lg:hidden "
            onClick={() => dispatch(closePopup())}
          />
          <p>TaskMaze</p>
        </div>
        <div className="ps-7  ">
          <div className="flex flex-col  mt-10">
            <p className="text-gray-300">Menu</p>
            {navLink.map((e, i) => (
              <Link href={e.path} key={i}>
                <div
                  className={`flex items-center gap-2  font-bold cursor-pointer text-gray-200  py-3 ${
                    activeIndex?.section === "nav" && activeIndex?.index === i
                      ? "bg-[#3f4a5ada] me-4 ps-4 ms-[-20px] rounded-2xl"
                      : " "
                  } `}
                >
                  {e.icons}
                  <p
                    className="lg:text-[16px] text-[14px] "
                    onClick={() => handleItemClick("nav", i)}
                  >
                    {e.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-5 lg:pe-8 pe-3">
            <p className="text-gray-300 ">Action</p>
            {action.map((e, i) => (
              <Link href={e.path} key={i}>
                <div
                  className={` flex items-center  lg:justify-center gap-2  font-bold cursor-pointer  py-2 px-4 lg:rounded-3xl rounded-2xl lg:text-[16px] text-[13px]  ${
                    activeIndex?.section === "action" &&
                    activeIndex?.index === i
                      ? "bg-[#4446639f] text-white "
                      : "bg-white "
                  } `}
                  onClick={() => handleItemClick("action", i)}
                >
                  {e.icons}
                  <p>{e.label}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col mt-10">
            <p className="text-gray-300">Account & settings</p>
            {profile.map((e, i) => (
              <div
                key={i}
                onClick={() => {
                  if (e.label !== "LogOut") {
                    handleItemClick("account", i);

                    router.push(e.path);
                  } else {
                    handleLogout();
                    dispatch(openLogout());
                  }
                }}
              >
                <div
                  className={`flex items-center gap-2  font-bold cursor-pointer text-gray-200  py-3 ${
                    activeIndex?.section === "account" &&
                    activeIndex?.index === i
                      ? "bg-[#3f4a5ada] me-4 ps-4 ms-[-20px] rounded-2xl"
                      : " "
                  } `}
                  key={i}
                >
                  {e.icons}
                  <p>{e.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
