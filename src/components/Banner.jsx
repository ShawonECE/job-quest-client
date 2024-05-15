import axios from 'axios';
import logo from '../assets/logo_transparent.png';
import {
    useQuery
} from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [query, setQuery] = useState('');
    const { isPending, data:jobs } = useQuery({ queryKey: ['jobs'], queryFn: async() => {
        const data = await axios.get('https://job-quest-server-alpha.vercel.app/jobs');
        return data.data;
    } });
    const getFilteredJobs = (query, jobs) => {
        if (query) {
            return jobs.filter(job => job.job_title.toLowerCase().includes(query));
        }
        else {
            return [];
        }
    };
    const filteredJobs = getFilteredJobs(query, jobs);
    return (
        <div className="hero min-h-screen mt-8" style={{ backgroundImage: 'url(https://i.ibb.co/TLvhjb4/banner.jpg)' }}>
            <div className="hero-overlay bg-[#2C3333] bg-opacity-60 rounded-xl dark:rounded-none"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <div className="flex justify-center items-center gap-2">
                        <img className="w-10" src={logo} alt="" />
                        <h1 className="mb-5 text-5xl font-bold">JobQuest</h1>
                    </div>
                    <p className='text-lg font-semibold text-center'>Unlock Your Career Journey with JobQuest: Find Your Dream Job Today!</p>
                    {
                        !isPending &&
                        <div className="mt-5 relative">
                            <input onChange={(e) => setQuery((e.target.value).toLowerCase())} className="input input-bordered w-full max-w-sm text-black" placeholder="Search jobs here" />
                                {
                                    filteredJobs.length !== 0 &&
                                    <ul className="p-2 absolute left-1/2 transform -translate-x-1/2 shadow menu dropdown-content z-[2] bg-base-100 rounded-xl w-full max-w-sm text-left text-black">
                                        {
                                            filteredJobs.map(job => <li key={job._id} className='p-2'><Link to={`/job/${job._id}`}>{job.job_title}</Link></li>)
                                        }
                                    </ul>
                                }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Banner;