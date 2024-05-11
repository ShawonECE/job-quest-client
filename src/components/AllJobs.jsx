import { useLoaderData } from "react-router-dom";
import AllJobsTableRow from "./AllJobsTableRow";
import { Helmet } from "react-helmet-async";

const AllJobs = () => {
    const jobs = useLoaderData().data;
    
    return (
        <div className="mt-8">
            <Helmet>
                <title>JobQuest | All Jobs</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold">All Jobs</h1>
            <div className="flex justify-center">
                <div className="join mt-5">
                    <input className="input input-bordered join-item w-64 md:w-96" placeholder="Search jobs here" />
                    <button className="btn join-item border-0 bg-[#395B64] text-[#E7F6F2]">Search</button>
                </div>
            </div>
            <div className="overflow-x-auto bg-[#E7F6F2] rounded-xl mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Posting Date</th>
                            <th>Application Deadline</th>
                            <th>Salary Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map(job => <AllJobsTableRow key={job._id} job={job}></AllJobsTableRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllJobs;