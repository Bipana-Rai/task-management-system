import { closeLogout } from "@/features/user/popupSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { easeOut, motion} from "framer-motion"

const PopupLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
    dispatch(closeLogout());
  };

  return (
    <>
   
      <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:0.5 ,ease:easeOut}}
       className="fixed inset-0 z-30 flex   justify-center  items-center h-[100vh] bg-black/30">
        <div className="flex flex-col items-center justify-center gap-6 md:h-[220px] md:w-[350px] h-[200px] w-[335px] bg-gray-700 rounded-xl shadow-lg backdrop-blur-md text-white p-6">
          <p className="md:text-lg font-semibold">
            Are you sure you want to logout?
          </p>
          <div className="flex justify-center gap-6">
            <button
              className="bg-gray-900 hover:bg-gray-800 md:px-9 px-6 py-1  md:py-2 rounded-md transition cursor-pointer"
              onClick={handleLogout}
            >
              Yes
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 md:px-9 py-1 px-6  md:py-2 rounded-md transition cursor-pointer"
              onClick={() => dispatch(closeLogout())}
            >
              No
            </button>
          </div>
        </div>
      </motion.div>
     
    </>
  );
};

export default PopupLogout;
