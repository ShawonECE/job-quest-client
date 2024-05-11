import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const JobDetail = () => {
    const job = useLoaderData().data;
    const {posted_by, job_title, job_posting_date, deadline, salary_range, number_of_applicants, job_description, job_img, job_category} = job;
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
                    <button className="btn bg-[#2C3333] text-[#E7F6F2]">Apply Now</button>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;