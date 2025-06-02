"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { BiSolidError } from "react-icons/bi";
const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim()

export default function App() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const value = { ...data };

    try {
      const emailExists = await axios.post(
        `${BASE_URL}/check-email`,
        {
          email: value.email,
        }
      );

      if (emailExists.data.exists) {
        toast.error("Email already exists");
        return; // Stop form submission
      }
      const response = await axios.post(
        `${BASE_URL}/register`,
        value
      );
      toast.success("Register Seccessfully");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong!");
    }
  };

  const motionProps = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9 },
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-800 via-slate-600 to-blue-900 text-white h-screen px-5 py-10 ">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl md:w-[450px] w-[370px] shadow-xl "
      >
        <motion.p
          className="text-2xl text-center pt-5 drop-shadow-[0_0_10px_rgba(255,255,255,0.)]"
          {...motionProps}
        >
          {" "}
          Register an Account
        </motion.p>
        <form
          className=" flex flex-col  px-10 md:px-15 pt-5 gap-2 "
          {...motionProps}
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.div {...motionProps} className=" flex flex-col gap-2 ">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              className="border-1 py-1 px-2 outline-0 w-full rounded-md "
              name="fullName"
              {...register("fullName", { required: true })}
            />{" "}
            {errors.fullName && errors.fullName.type === "required" && (
              <div className="flex gap-2 items-center px-2  text-red-500 txt-sd  ">
                <BiSolidError className="" />
                <p className="text-[14px]"> Please provide a name.</p>
              </div>
            )}
          </motion.div>
          <motion.div {...motionProps} className=" flex flex-col gap-2 ">
            <label htmlFor="" className="">
              Email
            </label>
            <input
              type="email"
              className="border-1 py-1 px-2 w-full  outline-0 rounded-md"
              name="email"
              {...register("email", {
                required: "Email is required",
                validate: async (value) => {
                  // We only validate on submit
                  return true; // Email validation is done in onSubmit now
                },
              })}
            />

            {errors.email && (
              <div className="flex gap-2 items-center px-2 text-red-500 bg-amber-50  ">
                <BiSolidError className="" />
                <p className="text-sm  ">{errors.email.message}</p>
              </div>
            )}
          </motion.div>{" "}
          <motion.label htmlFor="" {...motionProps} className="">
            Password
          </motion.label>
          <motion.div
            {...motionProps}
            className="flex w-full border-1 rounded-md pe-1 gap-1 items-center justify-between"
          >
            <input
              type={`${showPassword ? "text" : "password"}`}
              className=" w-full py-1 px-2 outline-0  "
              name="password"
              {...register("password", { required: "password is required" })}
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
          {errors.password && (
            <div className="flex gap-2 items-center px-2 text-red-500 bg-amber-50   ">
              <BiSolidError className="" />
              <p className="text-sm">{errors.password.message}</p>
            </div>
          )}
          {/* <motion.div {...motionProps} className=" flex flex-col gap-2 ">
            <label htmlFor="" className="">
              Role
            </label>
            <input
              type="role"
              className="border-1 py-1  outline-0 px-2 rounded-md w-full"
              name="role"
              {...register("role", { required: "Please provide a role" })}
            />
            {errors.role && (
              <div className="flex gap-2 items-center px-2 text-red-500 bg-amber-50   ">
                <BiSolidError className="" />
                <p className="text-sm">{errors.role.message}</p>
              </div>
            )}
          </motion.div> */}
          <motion.select
            {...motionProps}
            {...register("role", { required: true })}
            className={`border-1 rounded-md outline-0 ${
              errors.role ? "border-red-500" : " border-white "
            } p-2 text-gray-800`}
            defaultValue=""
            name="role"
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            <option value="Developer">Developer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Designer">Designer</option>
            <option value="QA Engineer">QA Engineer</option>
          </motion.select>
          {errors.role && (
            <div className="flex gap-2 items-center px-2 text-red-500 bg-amber-50">
              <BiSolidError />
              <p className="text-sm">Please select a role.</p>
            </div>
          )}
          <motion.select
            {...motionProps}
            {...register("department", { required: true })}
            className={`border-1 rounded-md outline-0 ${
              errors.department ? "border-red-500" : " border-white "
            } p-2 text-gray-800`}
            defaultValue=""
            name="department"
          >
            <option value="" disabled>
              -- Select Department --
            </option>
            <option value="Engineering">Engineering</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </motion.select>
          {errors.department && (
            <div className="flex gap-2 items-center px-2 text-red-500 bg-amber-50">
              <BiSolidError />
              <p className="text-sm">Please select a role.</p>
            </div>
          )}
          {/* <motion.div {...motionProps} className=" flex flex-col gap-2 ">
            <label htmlFor="" className="">
              Department
            </label>
            <input
              type="department"
              className="border-1 py-1  outline-0 px-2 rounded-md w-full"
              name="department"
              {...register("department", {
                required: "Please provide a department",
              })}
            />
            {errors.department && (
              <div className="flex gap-2 items-center px-2 text-red-500 bg-amber-50   ">
                <BiSolidError className="" />
                <p className="text-sm">{errors.department.message}</p>
              </div>
            )}
          </motion.div> */}
          <div className="flex justify-center py-2">
            <motion.input
              {...motionProps}
              type="submit"
              value="Create  Account"
              className="bg-gray-700 rounded-xl py-2 w-[150px] cursor-pointer"
            />
          </div>
        </form>
        <motion.p className="py-2 text-center" {...motionProps}>
          already has an account ?
          <Link href="/login" className="px-2  underline">
            log in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
