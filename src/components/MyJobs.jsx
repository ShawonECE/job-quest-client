import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import MyJobsTableRow from "./MyJobsTableRow";
import swal from "sweetalert";

const MyJobs = () => {
    const { user } = useContext(AuthContext);
    const [myJobs, setMyJobs] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/jobs?email=${user.email}`)
        .then(data => setMyJobs(data.data));
    }, [user]);
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
                            myJobs.map(job => <MyJobsTableRow key={job._id} handleDelete={handleDelete} job={job}></MyJobsTableRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyJobs;