"use client"
import Navbar from "@/components/Navbar";
import PopupLogout from "@/components/PopupLogout";
import Sidebar from "@/components/Sidebar";
import { authorizeUserDetail } from "@/features/user/userSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"


const layout = ({ children }) => {
  const{isLogout}=useSelector((state)=>state.popup)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorizeUserDetail());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Sidebar/>
      
      <div className={ "lg:ms-[17%]" }>
        {isLogout &&  <PopupLogout/>}
      
            {children}
          </div>

    </div>
  );
};

export default layout;
