import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext, useState } from "react";
import moment from "moment";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
    useQuery
  } from '@tanstack/react-query';

const JobDetail = () => {
    const {user} = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    // const job = useLoaderData().data;
    const { isPending, data:job } = useQuery({ queryKey: [`job_${id}`], queryFn: async() => {
        const data = await axios.get(`https://job-quest-server-alpha.vercel.app/jobs/${id}`);
        return data.data;
    } })
    // const {posted_by, job_title, deadline, salary_range, number_of_applicants, job_description, job_img, job_category, _id} = job;
    const applicationDeadline = moment(job?.deadline);
    const now = moment();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const handleApplyModal = () => {
        if (now.isAfter(applicationDeadline)) {
            swal("Deadline is over!", {
                icon: "warning",
            });
        } else {
            setModalOpen(true);
        }
    };

    const onSubmit = (data) => {
        const {job_title, posted_by, salary_range, job_category, job_id: _id} = job;
        const newData = {...data, job_title, name: user.displayName, email: user.email, posted_by, salary_range, job_category, job_id: _id};
        axios.post('https://job-quest-server-alpha.vercel.app/application', newData)
        .then(data => {
            if (data.data.insertedId) {
                setModalOpen(false);
                reset();
                swal("Applied successfully!", {
                    icon: "success",
                });
            } else {
                swal("Application failed!", {
                    icon: "warning",
                });
            }
        });
    };

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
            </div>
        )
    }
    
    return (
        <div className="hero min-h-screen bg-[#E7F6F2] dark:text-[#E7F6F2] dark:bg-[#2C3333] rounded-xl mt-8">
            <Helmet>
                <title>Job Details</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <img src={job.job_img} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{job.job_title} Wanted!</h1>
                    <p className="py-6">{job.job_description}</p>
                    <p>Job position: <span className="font-semibold">{job.job_title}</span></p>
                    <p>Salary range: <span className="font-semibold">{job.salary_range}</span></p>
                    <p>Job category: <span className="font-semibold">{job.job_category}</span></p>
                    <p>Application deadline: <span className="font-semibold">{job.deadline}</span></p>
                    <p>Number of applicants: <span className="font-semibold">{job.number_of_applicants}</span></p>
                    <p>Employer email: <span className="font-semibold">{job?.posted_by.email}</span></p>
                    <button onClick={handleApplyModal} className="btn bg-[#2C3333] text-[#E7F6F2] mt-5" disabled={user.email === job.posted_by.email}>Apply Now</button>
                </div>
            </div>

            {/* apply modal */}
            <input type="checkbox" checked={modalOpen} id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box dark:bg-[#222831]">
                    <form method="dialog">
                        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-[#E7F6F2]">Name</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={user.displayName} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-[#E7F6F2]">Email</span>
                            </label>
                            <input type="email" className="input input-bordered" defaultValue={user.email} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-[#E7F6F2]">Resume Link</span>
                            </label>
                            <input type="url" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("resume_link", { required: 'Banner Image URL is required' })}/>
                            <p className="text-red-500 mt-2">{errors.resume_link?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-[#2C3333] text-white">Apply</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;