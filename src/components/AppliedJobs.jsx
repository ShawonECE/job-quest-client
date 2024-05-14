import { Helmet } from "react-helmet-async";
import AppliedJobsDoc from "./AppliedJobsDoc";

const AppliedJobs = () => {
    return (
        <div className="mt-8 min-h-screen">
            <Helmet>
                <title>JobQuest | Your Jobs</title>
            </Helmet>
            <AppliedJobsDoc></AppliedJobsDoc>
        </div>
    );
};

export default AppliedJobs;