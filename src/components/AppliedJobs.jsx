import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import AppliedJobsTableRow from "./AppliedJobsTableRow";

const AppliedJobs = () => {
    const { user } = useContext(AuthContext);
    const [appliedJobs, setAppliedJobs] = useState([]); 
    const [filtered, setFiltered] = useState([]);
    const [selectedValue, setSelectedValue] = useState('Filter');

    useEffect(() => {
        axios.get(`http://localhost:3000/applications?email=${user.email}`, { withCredentials: true})
        .then(data => {
            setAppliedJobs(data.data);
            setFiltered(data.data);
        });
    }, [user]);

    const handleFilter = (e) => {
        const value = e.target.value;
        setSelectedValue(value);

        if (value === "No filter") {
            setFiltered(appliedJobs);
        } else if (value === "On-Site") {
            const current = appliedJobs.filter(job => job.job_category === "On-Site");
            setFiltered(current);
        } else if (value === "Remote") {
            const current = appliedJobs.filter(job => job.job_category === "Remote");
            setFiltered(current);
        } else if (value === "Hybrid") {
            const current = appliedJobs.filter(job => job.job_category === "Hybrid");
            setFiltered(current);
        } else {
            const current = appliedJobs.filter(job => job.job_category === "Part-Time");
            setFiltered(current);
        }
    };

    return (
        <div className="mt-8 min-h-screen">
            <Helmet>
                <title>JobQuest | Your Jobs</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold dark:text-[#E7F6F2]">You have added {appliedJobs.length} jobs</h1> 
            <div className="flex justify-center mt-5 mb-5">
                <select value={selectedValue} onChange={handleFilter} className="select max-w-xs bg-gray-100 dark:bg-gray-200 text-lg font-semibold">
                    <option disabled>Filter</option>
                    <option>No filter</option>
                    <option>On-Site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Part-Time</option>
                </select>
            </div>
            <div className="overflow-x-auto bg-[#E7F6F2] dark:bg-[#31363F] rounded-xl mt-4">
                <table className="table dark:text-[#E7F6F2]">
                    <thead className="dark:text-[#E7F6F2]">
                        <tr>
                            <th>Job Title</th>
                            <th>Category</th>
                            <th>Employer Email</th>
                            <th>Salary Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map(job => <AppliedJobsTableRow key={job._id} job={job}></AppliedJobsTableRow>)
                        }
                    </tbody>
                </table>
            </div>        
        </div>
    );
};

export default AppliedJobs;