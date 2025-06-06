"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim()
export default function App() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const value = { ...data };
    try {
      const response = await axios.post(`https://taskmngmtbackend.onrender.com/login`, value);
      toast.success("log in Seccessfully");
      localStorage.setItem("token", response?.data?.token);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const motionProps = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9 },
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-800 via-slate-600 to-blue-900 text-white h-[100vh] lg:px-5">
      <motion.div
        {...motionProps}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl md:w-[450px] w-[370px] shadow-xl "
      >
        <motion.p
          className="text-2xl text-center pt-5  drop-shadow-[0_0_10px_rgba(255,255,255,0.)]"
          {...motionProps}
        >
          {" "}
          Log in
        </motion.p>

        <form
          className=" flex flex-col  px-10 md:px-15 pt-5 gap-2"
          {...motionProps}
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.div {...motionProps} className="flex flex-col gap-2">
            <label htmlFor="" className="" {...motionProps}>
              Email
            </label>
            <input
              type="email"
              className="border-1 py-1 px-2 outline-0 rounded-md "
              name="email"
              {...register("email", {
                required: "Enter your email address",
              })}
            />{" "}
            <label htmlFor="" {...motionProps} className="pt-3">
              Password
            </label>
          </motion.div>

          <motion.div
            {...motionProps}
            className="flex w-full border-1 rounded-md pe-1 gap-1 items-center justify-between"
          >
            <input
              type={`${showPassword ? "text" : "password"}`}
              className=" w-full py-1 px-2 outline-0  "
              name="password"
              {...register("password", { required: true })}
            />{" "}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEye className="text-xl text-gray-200 cursor-pointer " />
              ) : (
                <FaEyeSlash className="text-xl text-gray-200 cursor-pointer " />
              )}
            </button>
          </motion.div>
          <motion.div {...motionProps} className="flex justify-center py-2">
            <input
              type="submit"
              value="Log in"
              className="bg-gray-700 rounded-xl px-2 py-2 w-[150px] cursor-pointer"
            />
          </motion.div>
        </form>
        <motion.p className="py-2 text-center" {...motionProps}>
          doesn't have account ?
          <Link href="/signup" className="px-2 underline ">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
