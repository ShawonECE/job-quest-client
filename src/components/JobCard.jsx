import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const JobCard = ({job}) => {
    const {_id, posted_by, job_title, job_posting_date, deadline, salary_range, number_of_applicants, job_img, job_category} = job;
    const navigate = useNavigate();
    return (
        <div className="card card-compact bg-[#E7F6F2] shadow-xl">
            <figure><img src={job_img} alt="job" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {job_title}
                    <div className="badge bg-[#395B64] text-white text-sm">{job_category}</div>
                </h2>
                <p className='font-bold mb-5'>Salary range: {salary_range}</p>
                <div className='flex items-center gap-10'>
                    <p>Posted by: <span className='font-semibold'>{posted_by?.name}</span></p>
                    <p>Posted at <span className='font-semibold'>{job_posting_date}</span></p>
                </div>
                <p>Application deadline: <span className='font-semibold'>{deadline}</span></p>
                <p>No. of Applicants <span className='font-semibold'>{number_of_applicants}</span></p>
                <div className="card-actions justify-end">
                    <button onClick={() => navigate(`/job/${_id}`)} className="btn bg-[#2C3333] text-[#E7F6F2]">View Details</button>
                </div>
            </div>
        </div>
    );
};

JobCard.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobCard;