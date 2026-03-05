const emailAddress = 'your-email@example.com';
const slackWebhookUrl = 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK';
const subject = "Data Quality Alert: Issues Detected in Dataset";

const projectId = 'your-gcp-project-id';
const datasetId = 'your_dataset_id';

const config = [
  { table: 'TableOne', fields: ['ID'] },
  { table: 'TableTwo', fields: ['Record ID'] },
  { table: 'TableThree', fields: ['Entry ID', 'Reference ID'] },
  // Add more tables and their unique/not-null fields here
];




function executeBigQueryQuery(query) {
  const request = {
    query: query,
    useLegacySql: false
  };

  let queryResults = BigQuery.Jobs.query(request, projectId);
  const jobId = queryResults.jobReference.jobId;

  // Poll until job completes
  while (!queryResults.jobComplete) {
    Utilities.sleep(1000);
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  return queryResults;
}
