"use client";
import { authorizeUserDetail } from "@/features/user/userSlice";
import axios from "axios";
import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { FaUpload } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import {  easeInOut, easeOut, motion } from "framer-motion";

const UploadProfile = ({  profileInfo ,setVisible}) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // Save the selected file to state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file)    alert("Please choose a file");
    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("id", profileInfo?._id);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = res.data;
      
      dispatch(authorizeUserDetail());
      setVisible(false)
      
    } catch (error) {}
  };
  
  return (
    
    <motion.div className={`pt-40  ps-40  lg:ps-64 md:ps-56 `}
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5,ease:easeOut}}
    >
      <div className="relative flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.5)]  bg-white rounded-lg text-gray-800  px-4 ">
             <RxCross2 onClick={()=>setVisible(false)} className=" absolute right-2 top-2 cursor-pointer" />
        <form onSubmit={handleSubmit}>
          <label className="flex gap-2 items-center  cursor-pointer pb-2 pt-4 pe-4 ">
          <FaUpload className="text-gray-600" />
           <p className="font-bold">upload Photo</p> 
            <input
              type="file"
              name="profileImage"
              className="hidden"
              onChange={handleChange}
            />
             </label>
           
       
           
         
          <div className="w-full  pt-">
            <button type="submit" className=" px-6 py-1  cursor-pointer "  >
              Upload
            </button>
          </div>
        </form>
      </div>
    </motion.div >
  
  );
};

export default UploadProfile;
