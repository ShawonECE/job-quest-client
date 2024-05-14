import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import AppliedJobsTableRow from "./AppliedJobsTableRow";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyPdfDocument from "./MyPdfDocument";
import {
    useQuery
} from '@tanstack/react-query';

const AppliedJobsDoc = () => {
    const { user } = useContext(AuthContext);
    const [filtered, setFiltered] = useState([]);
    const [selectedValue, setSelectedValue] = useState('Filter');

    const { isPending, data:appliedJobs } = useQuery({ queryKey: ['applied-jobs'], queryFn: async() => {
        const data = await axios.get(`http://localhost:3000/applications?email=${user.email}`, { withCredentials: true});
        return data.data;
    } });

    useEffect(() => {
        setFiltered(appliedJobs);
    }, [appliedJobs]);

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

    if (isPending) {
        return (
            <>
                <h1 className="text-center text-3xl font-bold dark:text-[#E7F6F2]">Your Applied Jobs</h1>
                <div className="skeleton h-64"></div>
            </>
        )
    }

    return (
        <>
            <h1 className="text-center text-3xl font-bold dark:text-[#E7F6F2]">You have applied to {appliedJobs?.length} jobs</h1>
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
                <div>
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
                                filtered?.map(job => <AppliedJobsTableRow key={job._id} job={job}></AppliedJobsTableRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center">
                <PDFDownloadLink
                    document={<MyPdfDocument appliedJobs={appliedJobs} />}
                    fileName="applied_jobs.pdf"
                    className="btn bg-[#E7F6F2] dark:text-[#E7F6F2] dark:bg-[#2C3333] mt-5"
                >
                    {({ loading }) =>
                        loading ? 'Loading document...' : 'Download summary!'
                    }
                </PDFDownloadLink>
            </div>
        </>
    );
};

export default AppliedJobsDoc;