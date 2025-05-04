"use client";
import Link from "next/link";
import { MdAssignment } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { FaBorderAll } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function Taskbar() {
  const tabs = [
    { tab: "All Task", path: "/tasks", icon: <FaBorderAll /> },
    { tab: "Assigned", path: "/assigned", icon: <MdAssignment /> },
    { tab: "Created", path: "/created", icon: <IoCreate /> },
  ];
  const [index, setIndex] = useState(null);
  const path = usePathname();
  useEffect(() => {
    const match = tabs.find((tab) => tab.path === path);
    if (match) {
      return setIndex(match);
    }
  }, [path]);

  return (
    <div className="fixed z-20 top-13 bg-gray-50">
      <div className="flex justify-between  text-lg  md:px-10 px-5 lg:w-[85vw] w-[100vw] lg:text-xl lg:px-20 pt-5  pb-3">
        {tabs.map((e, i) => (
          <Link key={e.tab} href={e.path}>
            <motion.div
              onClick={() => setIndex(e)}
              className={`relative cursor-pointer lg:px-5 px-1 flex text-[16px] justify-center  items-center gap-2 pb-1  `}
            >
              {index?.tab === e.tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 w-29  lg:w-32 h-[2px] bg-black"
                  transition={{ duration: 0.4, ease: "easeIn" }}
                />
              )}
              <div className="text-lg text-gray-600">{e.icon}</div>

              <p>{e.tab}</p>
            </motion.div>
            {/* <div>{e?.data?.length}</div> */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Taskbar;
