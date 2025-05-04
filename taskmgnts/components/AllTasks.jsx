"use client";
import Cards from "@/components/Cards";

const AllTask = ({ data, title }) => {
  const pending = data.filter((e) => e.status === "pending");
  const inProgress = data.filter((e) => e.status === "in progress");
  const completed = data.filter((e) => e.status === "Completed");

  return (
    <>
    
      <div className=" hide-scrollbar lg:ps-10  pt-30 overflow-x-auto ps-3 ">
        <div className="flex   gap-8 lg:gap-10 pe-4 max-w-[600px] ">
      
          {inProgress?.length > 0 && (
            <div className="">
              <div className="w-[330px] ps-3 ">
                <p className=" text-blue-700 font-bold text-xl py-3">
                  Inprogress Tasks
                </p>
              </div>
              {inProgress.map((e, i) => (
                <Cards key={e._id} data={e} />
              ))}
            </div>
          )}
          {pending?.length > 0 && (
            <div className="">
              <div className="w-[330px] ps-3 ">
                <p className=" text-red-600 font-bold text-xl py-3">
                  Pending Tasks
                </p>
              </div>
              {pending.map((e, i) => (
                <Cards key={e._id} data={e} />
              ))}
            </div>
          )}
          {completed.length > 0 && (
            <div className=" pe-4  ">
              <div className="w-[330px] ps-3 ">
                <p className="ps-4 text-green-700 font-bold text-xl py-3">
                  Completed Tasks
                </p>
              </div>
              {completed.map((e, i) => (
                <Cards key={e._id} data={e} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTask;
