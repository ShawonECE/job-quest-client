import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import MyJobsTableRow from "./MyJobsTableRow";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import moment from "moment";

const MyJobs = () => {
    const { user } = useContext(AuthContext);
    const today = moment().format("YYYY-MM-DD");
    const [myJobs, setMyJobs] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [jobToBeUpdated, setJobToBeUpdated] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3000/jobs?email=${user.email}`)
        .then(data => setMyJobs(data.data));
    }, [user]);

    const handleUpdateModal = (id) => {
        const job = myJobs.find(job => job._id === id);
        setJobToBeUpdated(job);
        setModalOpen(true);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        // This will update the form's default values whenever jobToBeUpdated changes
        if (jobToBeUpdated) {
            reset({
                job_title: jobToBeUpdated.job_title,
                job_img: jobToBeUpdated.job_img,
                job_category: jobToBeUpdated.job_category,
                job_description: jobToBeUpdated.job_description,
                number_of_applicants: jobToBeUpdated.number_of_applicants,
                Salary_from: jobToBeUpdated.salary_range?.split(" - ")[0].substring(1),
                Salary_to: jobToBeUpdated.salary_range?.split(" - ")[1].substring(1),
                deadline: jobToBeUpdated.deadline

            });
        }
    }, [jobToBeUpdated, reset]);

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:3000/${id}`)
                .then(data => {
                    if (data.data.deletedCount === 1) {
                        swal("Poof! Data has been deleted!", {
                            icon: "success",
                        });
                        const remaining = myJobs.filter(job => job._id !== id);
                        setMyJobs(remaining);
                    } else {
                        swal("Deletion failed!", {
                            icon: "warning",
                        });
                    }
                });
            }
        });
    };

    const onSubmit = (data) => {
        const newData = {...data};
        newData.salary_range = `$${data.Salary_from} - $${data.Salary_to}`;
        delete newData.Salary_from;
        delete newData.Salary_to;
        
        axios.patch(`http://localhost:3000/${jobToBeUpdated._id}`, newData)
        .then(data => {
            if (data.data.modifiedCount) {
                setModalOpen(false);
                swal("Updated successfully!", {
                    icon: "success",
                });
            } else {
                swal("Update failed!", {
                    icon: "warning",
                });
            }
        });
    };

    return (
        <div className="mt-8">
            <Helmet>
                <title>JobQuest | Your Jobs</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold">You have added {myJobs.length} jobs</h1>
            <div className="overflow-x-auto bg-[#E7F6F2] rounded-xl mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Posting Date</th>
                            <th>Application Deadline</th>
                            <th>No. of Applicants</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myJobs.map(job => <MyJobsTableRow key={job._id} handleUpdateModal={handleUpdateModal} handleDelete={handleDelete} job={job}></MyJobsTableRow>)
                        }
                    </tbody>
                </table>
            </div>

            {/* update modal */}
            <input type="checkbox" checked={modalOpen} id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form method="dialog">
                        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Job Title</span>
                            </label>
                            <input type="text" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("job_title", { required: 'Job title is required' })} />
                            <p className="text-red-500 mt-2">{errors.job_title?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Banner Image URL</span>
                            </label>
                            <input type="url" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("job_img", { required: 'Banner Image URL is required' })}/>
                            <p className="text-red-500 mt-2">{errors.job_img?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Job Category</span>
                            </label>
                            <select className="select bg-gray-100 dark:bg-gray-700 dark:text-white text-lg font-semibold" {...register("job_category", { required: 'Subcategory Name is required' })}>
                                <option>On-Site</option>
                                <option>Remote</option>
                                <option>Hybrid</option>
                                <option>Part-Time</option>
                            </select>
                            <p className="text-red-500 mt-2">{errors.job_category?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Short Description</span>
                            </label>
                            <textarea type="text" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("job_description", { required: 'Short Description is required' })}/>
                            <p className="text-red-500 mt-2">{errors.job_description?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Salary Range</span>
                            </label>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="form-control">
                                    <input type="text" placeholder="From" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("Salary_from", { required: 'Salary is required' })} />
                                    <p className="text-red-500 mt-2">{errors.Salary_from?.message}</p>
                                </div>
                                <div className="form-control">
                                    <input type="text" placeholder="To" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("Salary_to", { required: 'Salary is required' })} />
                                    <p className="text-red-500 mt-2">{errors.Salary_to?.message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">No. of Applicants</span>
                            </label>
                            <input type="text" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("number_of_applicants", { required: 'No. of Applicants is required' })}/>
                            <p className="text-red-500 mt-2">{errors.number_of_applicants?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Application Deadline</span>
                            </label>
                            <input type="date" min={today} {...register("deadline", { required: 'Application Deadline is required' })}  className="input input-bordered dark:bg-gray-700 dark:text-white" />
                            <p className="text-red-500 mt-2">{errors.deadline?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-[#2C3333] text-white">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyJobs;