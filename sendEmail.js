function sendEmailNotification(resultsUnique, resultsNotNull) {

    let htmlBody = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              color: #3366ff;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <h1>Data Quality Alert</h1>
          <p>We have detected issues in the dataset during our recent data quality checks. Please review the details below:</p>
    `;

    // Add duplicate values section if results exist
    if (resultsUnique.length > 0) {
      htmlBody += `
        <h3>⛔ Duplicate Values Found</h3>
        <table>
          <tr>
            <th>Table Name</th>
            <th>Field Name</th>
            <th>Value</th>
            <th>Duplicate Count</th>
          </tr>
      `;
      resultsUnique.forEach(item => {
        htmlBody += `
          <tr>
            <td>${item.table}</td>
            <td>${item.field}</td>
            <td>${item.value}</td>
            <td>${item.duplicates}</td>
          </tr>
        `;
      });
      htmlBody += `</table>`;
    }

    // Add null values section if results exist
    if (resultsNotNull.length > 0) {
      htmlBody += `
        <h2>⛔ Null Values Found</h2>
        <table>
          <tr>
            <th>Table Name</th>
            <th>Field Name</th>
            <th>Null Count</th>
          </tr>
      `;
      resultsNotNull.forEach(item => {
        htmlBody += `
          <tr>
            <td>${item.table}</td>
            <td>${item.field}</td>
            <td>${item.null_count}</td>
          </tr>
        `;
      });
      htmlBody += `</table>`;
    }

    // Closing message
    htmlBody += `
          <p>Please address these issues promptly to ensure data integrity. If you have any questions or need assistance, feel free to reach out.</p>
          <p>Best regards,<br>Your Name</p>
        </body>
      </html>
    `;

    // Send the email
    try {
      GmailApp.sendEmail(emailAddress, subject, '', { htmlBody: htmlBody });
      Logger.log(`Email sent with ${resultsUnique.length} Unique assertion errors and ${resultsNotNull.length} NotNull assertion errors`);
    } catch(e) {
      Logger.log('Email send failed: ' + e.toString());
    }
  }
