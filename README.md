# BigQuery Data Validator

Google Apps Script that runs data quality checks (unique and not-null assertions) on BigQuery tables and sends alerts via Email and Slack.

## Features

- Checks for duplicate values in specified fields
- Checks for null values in specified fields
- Sends HTML email alerts via Gmail
- Sends formatted Slack notifications via webhook

## Prerequisites

- Google Apps Script project linked to a Google Sheet
- BigQuery API enabled in the Apps Script project
- A GCP project with BigQuery access
- Gmail (built-in via Apps Script)
- Slack incoming webhook URL (optional)

## Setup

1. Copy all `.js` files into your Apps Script project.
2. Enable the **BigQuery API** under *Services* in the Apps Script editor.
3. Edit `settings.js` with your values:

```js
const emailAddress = 'your-email@example.com';
const slackWebhookUrl = 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK';
const projectId = 'your-gcp-project-id';
const datasetId = 'your_dataset_id';

const config = [
  { table: 'YourTable', fields: ['Primary Key Field'] },
];
```

4. Run `runAssertions()` manually or set up a time-based trigger.

## File Overview

| File | Description |
|------|-------------|
| `settings.js` | Configuration: credentials, dataset, table/field definitions |
| `run.js` | Entry point — orchestrates checks and triggers notifications |
| `checkUnique.js` | Queries BigQuery for duplicate values |
| `checkNotNull.js` | Queries BigQuery for null values |
| `sendEmail.js` | Sends HTML email via GmailApp |
| `sendSlack.js` | Sends formatted message via Slack webhook |

## License

MIT
