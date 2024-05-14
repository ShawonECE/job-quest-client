import PropTypes from 'prop-types';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
  },
});

const MyPdfDocument = ({ appliedJobs }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Your Applied Jobs</Text>
        {appliedJobs.map((job) => (
          <Text key={job._id}>
            {job.job_title} ---- ({job.job_category}) ---- ({job.salary_range})
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);


MyPdfDocument.propTypes = {
    appliedJobs: PropTypes.array
};

export default MyPdfDocument;