import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AllJobsTableRow = ({job}) => {
    const {job_title, job_posting_date, deadline, salary_range, _id} = job;
    const navigate = useNavigate();
    return (
        <tr>
            <td>{job_title}</td>
            <td>{job_posting_date}</td>
            <td>{deadline}</td>
            <td>{salary_range}</td>
            <td><button onClick={() => navigate(`/job/${_id}`)} className="btn btn-xs bg-[#2C3333] text-[#E7F6F2]">Details</button></td>
        </tr>
    );
};

AllJobsTableRow.propTypes = {
    job: PropTypes.object.isRequired,
};

export default AllJobsTableRow;