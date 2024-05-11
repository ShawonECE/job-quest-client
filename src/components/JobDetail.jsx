import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const JobDetail = () => {
    const job = useLoaderData().data;
    const {user} = useContext(AuthContext);
    const {posted_by, job_title, deadline, salary_range, number_of_applicants, job_description, job_img, job_category} = job;
    return (
        <div className="hero min-h-screen bg-[#E7F6F2] rounded-xl mt-8">
            <Helmet>
                <title>Job Details</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <img src={job_img} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{job_title} Wanted!</h1>
                    <p className="py-6">{job_description}</p>
                    <p>Job position: <span className="font-semibold">{job_title}</span></p>
                    <p>Salary range: <span className="font-semibold">{salary_range}</span></p>
                    <p>Job category: <span className="font-semibold">{job_category}</span></p>
                    <p>Application deadline: <span className="font-semibold">{deadline}</span></p>
                    <p>Number of applicants: <span className="font-semibold">{number_of_applicants}</span></p>
                    <p>Employer email: <span className="font-semibold">{posted_by.email}</span></p>
                    <button className="btn bg-[#2C3333] text-[#E7F6F2] mt-5" disabled={user.email === posted_by.email}>Apply Now</button>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;