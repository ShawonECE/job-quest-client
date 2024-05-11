import axios from "axios";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from "./JobCard";

const JobsInHome = () => {
    const [jobs, setJobs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3000/jobs')
        .then(data => {
            setJobs(data.data);
            setLoaded(true);
        })
    }, []);

    const partTimeJobs = jobs.filter(job => job.job_category === 'Part-Time');
    const onSiteJobs = jobs.filter(job => job.job_category === 'On-Site');
    const remoteJobs = jobs.filter(job => job.job_category === 'Remote');
    const hybridJobs = jobs.filter(job => job.job_category === 'Hybrid');

    return (
        <div className="mt-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-5">Find suitable jobs by categories</h1>

            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>All Jobs</Tab>
                    <Tab>On-Site</Tab>
                    <Tab>Remote</Tab>
                    <Tab>Hybrid</Tab>
                    <Tab>Part-Time</Tab>
                </TabList>

                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        {
                            !loaded &&
                            <>
                                <div className="skeleton h-48"></div>
                                <div className="skeleton h-48"></div>
                                <div className="skeleton h-48"></div>
                            </>
                        }
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