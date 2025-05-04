"use client";
import { getTeams, projectDetail } from "@/features/user/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const page = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.user);
  const [successMessage, setSuccessMessage] = useState("");
  const today = new Date().toISOString().split("T")[0];
  console.log(teams)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tasks: [{ name: "" }],
      members: [{ name: "" }],
    },
  });
  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: "tasks",
  });
  const {
    fields: membersFields,
    append: appendMembers,
    remove: removeMembers,
  } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit = (data) => {
    const transformedData = {
      ...data,
      tasks: data.tasks.map((t) => t.name),
      members: data.members.map((m) => m.name),
    };

    setSuccessMessage("Tasks added SuccesFully");
    dispatch(projectDetail(transformedData));
    reset();
    window.scrollTo(0, 0);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  useEffect(() => {
    dispatch(getTeams());
  }, []);

  return (
    <>
      {successMessage && (
        <div className="flex items-center text-center mt-80 md-mt-40  justify-center ">
          <div className="absolute flex flex-col items-center     justify-center gap-2 text-green-600 bg-green-100 border border-green-300 lg:p-20 p-10 rounded-md transition transform scale-100 duration-300 ease-out animate-scale-in  ">
            <FaCheckCircle className="text-5xl text-center" />
            {successMessage}
          </div>
        </div>
      )}
      <form
        className={` lg:px-20 pb-7 pt-20 px-4  ${
          successMessage ? "hidden" : ""
        }  `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={`flex flex-col bg-white  p-3 w-full md:px-5 shadow-[0_3px_10px_rgb(0,0,0,0.5)] ${
            successMessage ? "opacity-0" : ""
          } `}
        >
          <p className="md:text-3xl text-center bg-gray-800 text-white py-2 ">
            Task Management
          </p>
          <label htmlFor="project" className="py-2 text-gray-700 font-bold">
            Project Name
          </label>
          <input
            className={`border-1 rounded-md   ${
              errors.project ? "border-red-500 outline-0" : "border-gray-500"
            }   md:p-3 py-2 px-3  text-gray-700 `}
            type="text"
            placeholder="Project"
            name="project"
            aria-invalid={errors.project ? "true" : "false"}
            {...register("project", { required: true, maxLength: 50 })}
          />{" "}
          {errors.project && errors.project.type === "required" && (
            <span role="alert" className="text-red-500">
              Please enter project name.
            </span>
          )}{" "}
          {errors.project && errors.project.type === "maxLength" && (
            <span role="alert" className="text-red-500">
              Max length exceeded
            </span>
          )}{" "}
          <label htmlFor="tasks" className="py-2 text-gray-700 font-bold">
            Tasks
          </label>
          {taskFields.map((item, index) => (
            <div key={item.id} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Task ${index + 1}`}
                  {...register(`tasks.${index}.name`, { required: true })}
                  className={`w-full  md:p-3 py-2 px-3 rounded-md text-gray-800 border 
              ${
                errors.tasks?.[index]?.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-500"
              }`}
                />

                <FaDeleteLeft
                  htmlFor="members"
                  type="button"
                  className="text-2xl mt-3"
                  onClick={() => removeTask(index)}
                />
              </div>
              {errors.tasks?.[index]?.name && (
                <p className="text-red-500 text-sm mt-1">Task is required</p>
              )}
            </div>
          ))}
          <button
            htmlFor="tasks"
            type="button"
            onClick={() => appendTask({ name: "" })}
            className="bg-gray-800 hover:bg-gray-700 text-white  cursor-pointer md:font-semibold py-2 px-4 rounded-md "
          >
            + Add Task
          </button>
          <div className="flex flex-col lg:items-center lg:flex-row lg:py-5  py-2 lg:gap-3 gap-3">
            <select
              className={`border-1 rounded-md ${
                errors.priority ? "border-red-500" : "border-gray-500 "
              } p-2 text-gray-600`}
              defaultValue=""
              name="priority"
              {...register("priority", { required: true })}
            >
              <option value="" disabled>
                Set-priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            {errors.priority && errors.priority.type === "required" && (
              <span role="alert" className="text-red-500">
                Priority required.
              </span>
            )}{" "}
            {/* <label htmlFor="status" className="ps-5">Set status</label> */}
            <select
              className={`border-1 rounded-md ${
                errors.priority ? "border-red-500" : "border-gray-500 "
              } p-2 text-gray-600`}
              defaultValue=""
              name="status"
              {...register("status", { required: true })}
            >
              <option value="" disabled>
                Set-status
              </option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && errors.status.type === "required" && (
              <span role="alert" className="text-red-500">
                Status required.
              </span>
            )}{" "}
            <label htmlFor="due_date" className="text-gray-700 font-bold ">
              Due date:
            </label>
            <input
              className={`border-1 rounded-md ${
                errors.priority ? "border-red-500" : "border-gray-500 "
              } p-2 text-gray-600`}
              type="date"
              placeholder="Due Date"
              name="due_date"
              min={today}
              aria-invalid={errors.name ? "true" : "false"}
              {...register("due_date", { required: true })}
            />{" "}
            {errors.due_date && errors.due_date.type === "required" && (
              <span role="alert" className="text-red-500">
                please choose date.
              </span>
            )}{" "}
          </div>
          <label htmlFor="manager" className="py-2 text-gray-700 font-bold">
            Project Manager
          </label>
          <input
            className={`border-1 rounded-md   ${
              errors.manager ? "border-red-500 outline-0" : "border-gray-500"
            }   md:p-3 py-2 px-3  text-gray-600 `}
            type="text"
            placeholder="Project manager"
            name="manager"
            aria-invalid={errors.manager ? "true" : "false"}
            {...register("manager", { required: true, maxLength: 30 })}
          />{" "}
          {errors.manager && errors.manager.type === "required" && (
            <span role="alert" className="text-red-500">
              Please enter manager name.
            </span>
          )}{" "}
          {errors.manager && errors.manager.type === "maxLength" && (
            <span role="alert" className="text-red-500">
              Max length exceeded
            </span>
          )}{" "}
          <label
            htmlFor="members"
            className="pb-2 text-gray-700 font-bold pt-2 "
          >
            Members Name
          </label>
          {membersFields.map((item, index) => (
            <div key={item.id} className="mb-4">
              <div className="flex  gap-2">
                <select
                  className={`border-1 w-full rounded-md ${
                    errors.priority ? "border-red-500" : "border-gray-500 "
                  } p-2 text-gray-800`}
                  defaultValue=""
                  name="members"
                  {...register(`members.${index}.name`, { required: true })}
                >
                  <option value="" disabled>
                  members {index+1}
                  </option>
                 
                   {teams?.map((e)=>(
                    <option key={e._id} value={e.fullName}>{e.fullName}</option>
                   ))}
                </select> <br />
               
                <FaDeleteLeft
                  htmlFor="members"
                  type="button"
                  className="text-2xl mt-3"
                  onClick={() => removeMembers(index)}
                />
              </div>
              {errors.status && errors.status.type === "required" && (
                  <span role="alert" className="text-red-500">
                    choose member.
                  </span>
                )}{" "}
            </div>
          ))}
          <button
            htmlFor="members"
            type="button"
            onClick={() => appendMembers({ name: "" })}
            className="bg-gray-800 hover:bg-gray-700  cursor-pointer text-white md:font-semibold py-2 px-4 rounded-md "
          >
            + Add Members
          </button>
          <br />
          <input
            className="border-1 rounded-md border-gray-500 cursor-pointer md:p-3 py-1 bg-gray-800 text-white "
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default page;
