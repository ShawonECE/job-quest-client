import PropTypes from 'prop-types';
import { MdDeleteForever } from "react-icons/md";

const MyJobsTableRow = ({job, handleDelete, handleUpdateModal}) => {
    const {job_title, job_posting_date, deadline, number_of_applicants, _id} = job;
    return (
        <tr>
            <td>{job_title}</td>
            <td>{job_posting_date}</td>
            <td>{deadline}</td>
            <td>{number_of_applicants}</td>
            <td><button onClick={() => handleUpdateModal(_id)} className="btn btn-xs bg-[#2C3333] text-[#E7F6F2]">Update</button></td>
            <td><MdDeleteForever onClick={() => handleDelete(_id)} className='text-red-600 text-2xl cursor-pointer' /></td>
        </tr>
    );
};

MyJobsTableRow.propTypes = {
    job: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleUpdateModal: PropTypes.func.isRequired
};

export default MyJobsTableRow;