import PropTypes from 'prop-types';

const AppliedJobsTableRow = ({job}) => {
    const {job_title, job_category, posted_by, salary_range} = job;
    return (
        <tr>
            <td>{job_title}</td>
            <td>{job_category}</td>
            <td>{posted_by.email}</td>
            <td>{salary_range}</td>
        </tr>
    );
};

AppliedJobsTableRow.propTypes = {
    job: PropTypes.object.isRequired,
};

export default AppliedJobsTableRow;