import AllJobsTableRow from "./AllJobsTableRow";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searched, setSearched] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:3000/jobs')
        .then(data => {
            setFiltered(data.data);
            setJobs(data.data);
        });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchWord = form.search.value;
        const result = jobs.filter(job => job.job_title.toLowerCase().includes(searchWord.toLowerCase()));
        setFiltered(result);
        setSearched(true);
        form.reset();
    };

    const handleClearSearch = () => {
        setFiltered(jobs);
        setSearched(false);
    };
    
    return (
        <div className="mt-8">
            <Helmet>
                <title>JobQuest | All Jobs</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold dark:text-[#E7F6F2]">All Jobs</h1>
            <div className="flex justify-center">
                <div className="join mt-5">
                    <form onSubmit={handleSearch}>
                        <input className="input input-bordered join-item w-64 md:w-96" placeholder="Search jobs here" name="search"/>
                        <button type="submit" className="btn join-item border-0 bg-[#395B64] text-[#E7F6F2]">Search</button>
                    </form>
                </div>
            </div>
            {
                searched &&
                <div className="flex justify-center mt-4">
                    <button className="btn" onClick={handleClearSearch}><MdOutlineCancel className="text-lg" /> Clear Search</button>
                </div>
            }
            <div className="overflow-x-auto bg-[#E7F6F2] dark:bg-[#31363F] rounded-xl mt-4">
                <table className="table dark:text-[#E7F6F2]">
                    <thead className="dark:text-[#E7F6F2]">
                        <tr>
                            <th>Job Title</th>
                            <th>Posting Date</th>
                            <th>Application Deadline</th>
                            <th>Salary Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map(job => <AllJobsTableRow key={job._id} job={job}></AllJobsTableRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllJobs;