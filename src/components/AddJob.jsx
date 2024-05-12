import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "./AuthProvider";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import addImg from '../assets/add.png';
import moment from 'moment';
import axios from "axios";

const AddJob = () => {
    const { user } = useContext(AuthContext);
    const today = moment().format("YYYY-MM-DD");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            job_category: "",
            number_of_applicants: 0,
        }
    });
    const onSubmit = (data) => {
        const newData = {...data, job_posting_date: today, posted_by: {name: user.displayName, email: user.email}};
        newData.salary_range = `$${data.Salary_from} - $${data.Salary_to}`;
        delete newData.Salary_from;
        delete newData.Salary_to;
        newData.number_of_applicants = parseInt(newData.number_of_applicants);
        axios.post('http://localhost:3000', newData)
        .then(data => {
            if (data.data.insertedId) {
                reset();
                swal("Added successfully!", {
                    icon: "success",
                });
            } else {
                swal("Failed to add!", {
                    icon: "warning",
                });
            }
        });
    };
    return (
        <div className="hero min-h-screen bg-[#E7F6F2] rounded-2xl">
            <Helmet>
                <title>Add a job</title>
            </Helmet>
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <img src={addImg} alt="" className="w-full"/>
                </div>
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 dark:bg-gray-800">
                    <h2 className="text-center text-3xl font-bold mt-5">Post a job</h2>
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
                                <span className="label-text">Employer Name</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={user.displayName} disabled/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Employer Email</span>
                            </label>
                            <input type="email" className="input input-bordered" defaultValue={user.email} disabled/>
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
                            <input type="number" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("number_of_applicants", { required: 'No. of Applicants is required' })}/>
                            <p className="text-red-500 mt-2">{errors.number_of_applicants?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Posting Date</span>
                            </label>
                            <input type="date" value={today} className="input input-bordered dark:bg-gray-700 dark:text-white" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Application Deadline</span>
                            </label>
                            <input type="date" min={today} className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("deadline", { required: 'Application Deadline is required' })}/>
                            <p className="text-red-500 mt-2">{errors.deadline?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-[#2C3333] text-white">Add</button>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddJob;