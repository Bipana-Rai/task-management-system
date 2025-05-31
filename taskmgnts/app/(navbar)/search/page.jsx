"use client";
import Cards from "@/components/Cards";
import { getProjectDetail } from "@/features/user/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function page() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const router = useRouter();
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProjectDetail());
  }, []);

  const filterData =
    query.trim() !== ""
      ? project.filter((p) =>
          p.project.toLowerCase().includes(query.trimStart().toLowerCase())
        )
      : project;
  return (
    <>
      <div className="pt-20   ">
        <p className="px-4 md:px-15 lg:text-xl text-gray-600 pb-2">
          Search result for <span className="text-red-700">{query}..</span>
        </p>
        {filterData?.length > 0 ? (
          <div className="flex flex-wrap gap-4 lg:px-10 px-4">
            {filterData?.map((e) => (
              <Cards key={e._id} data={e} />
            ))}{" "}
          </div>
        ) : (
          <p className="text-center pt-20">No data found...</p>
        )}
      </div>
    </>
  );
}

export default page;
