import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "./AuthProvider";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import addImg from '../assets/add.png';

const AddJob = () => {
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm({
        defaultValues: {
            job_category: "",
            number_of_applicants: 0,
            subcategory_name: "",
        }
    });
    const onSubmit = (data) => {
        const newData = {...data, userEmail: user.email};
        fetch(``, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                reset();
                swal("Added successfully!", {
                    icon: "success",
                });
            } else {
                swal("Failed to update!", {
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
                            <input type="text" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("number_of_applicants", { required: 'No. of Applicants is required' })}/>
                            <p className="text-red-500 mt-2">{errors.number_of_applicants?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Processing Time</span>
                            </label>
                            <input type="text" className="input input-bordered dark:bg-gray-700 dark:text-white" {...register("processing_time", { required: 'Image URL is required' })}/>
                            <p className="text-red-500 mt-2">{errors.processing_time?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Customizable</span>
                            </label>
                            <select className="select bg-gray-100 dark:bg-gray-700 dark:text-white text-lg font-semibold" {...register("customization", { required: 'Customizable is required' })}>
                                <option>yes</option>
                                <option>no</option>
                            </select>
                            <p className="text-red-500 mt-2">{errors.customization?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Stock Status</span>
                            </label>
                            <select className="select bg-gray-100 dark:bg-gray-700 dark:text-white text-lg font-semibold" {...register("stock_status", { required: 'Stock Status is required' })}>
                                <option>In stock</option>
                                <option>Made to Order</option>
                            </select>
                            <p className="text-red-500 mt-2">{errors.stock_status?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-slate-800 text-white" disabled={!isDirty}>Add</button>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddJob;