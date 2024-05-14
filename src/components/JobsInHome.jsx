import axios from "axios";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from "./JobCard";
import {
    useQuery
  } from '@tanstack/react-query';

const JobsInHome = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const { isPending, data:jobs } = useQuery({ queryKey: ['jobs'], queryFn: async() => {
        const data = await axios.get('http://localhost:3000/jobs');
        return data.data;
    } })
    
    const partTimeJobs = jobs?.filter(job => job.job_category === 'Part-Time');
    const onSiteJobs = jobs?.filter(job => job.job_category === 'On-Site');
    const remoteJobs = jobs?.filter(job => job.job_category === 'Remote');
    const hybridJobs = jobs?.filter(job => job.job_category === 'Hybrid');

    if (isPending) {
        return (
            <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 dark:text-[#E7F6F2]">Find suitable jobs by categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                    <div className="skeleton h-48"></div>
                    <div className="skeleton h-48"></div>
                    <div className="skeleton h-48"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 dark:text-[#E7F6F2]">Find suitable jobs by categories</h1>

            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab><span className={tabIndex !== 0 ? "dark:text-[#E7F6F2]" : ""}>All Jobs</span></Tab>
                    <Tab><span className={tabIndex !== 1 ? "dark:text-[#E7F6F2]" : ""}>On-Site</span></Tab>
                    <Tab><span className={tabIndex !== 2 ? "dark:text-[#E7F6F2]" : ""}>Remote</span></Tab>
                    <Tab><span className={tabIndex !== 3 ? "dark:text-[#E7F6F2]" : ""}>Hybrid</span></Tab>
                    <Tab><span className={tabIndex !== 4 ? "dark:text-[#E7F6F2]" : ""}>Part-Time</span></Tab>
                </TabList>

                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        {
                            jobs.map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        {
                            onSiteJobs.map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        {
                            remoteJobs.map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        {
                            hybridJobs.map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        {
                            partTimeJobs.map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default JobsInHome;