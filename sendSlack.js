function sendSlackNotification(uniqueResults, notNullResults) {
    const totalIssues = uniqueResults.length + notNullResults.length;
    
    if (totalIssues === 0) {
      return;
    }
  
    const message = formatDataQualitySlackMessage(uniqueResults, notNullResults);
    sendSlackMessage(message);
  }
  
  function formatDataQualitySlackMessage(uniqueResults, notNullResults) {
    const totalIssues = uniqueResults.length + notNullResults.length;
    
    let message = '\n:warning: *Data Quality Alert* :warning:\n\n';
    message += ':exclamation: Issues detected in the dataset during quality checks\n\n';
    
    // Add summary section
    message += `> :chart_with_downwards_trend: *Summary:* ${totalIssues} issue${totalIssues > 1 ? 's' : ''} found\n`;
    if (uniqueResults.length > 0) {
      message += `> :repeat: ${uniqueResults.length} duplicate value${uniqueResults.length > 1 ? 's' : ''}\n`;
    }
    if (notNullResults.length > 0) {
      message += `> :x: ${notNullResults.length} null value issue${notNullResults.length > 1 ? 's' : ''}\n`;
    }
    message += '\n';
  
    // Handle duplicate values section
    if (uniqueResults.length > 0) {
      message += ':repeat: *Duplicate Values Found*\n\n';
      
      uniqueResults.forEach((item, index) => {
        if (index > 0) {
          message += '\n• • • • • • • • • • • • • • • • • • • • • • • • • • • • • •\n\n';
        }
        
        message += `:heavy_multiplication_x: *Duplicate #${index + 1}*\n`;
        message += '```\n';
        message += `Table:       ${item.table}\n`;
        message += `Field:       ${item.field}\n`;
        message += `Value:       ${item.value}\n`;
        message += `Count:       ${item.duplicates}\n`;
        message += '```\n';
      });
      
      if (notNullResults.length > 0) {
        message += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      }
    }
  
    // Handle null values section
    if (notNullResults.length > 0) {
      message += ':x: *Null Values Found*\n\n';
      
      notNullResults.forEach((item, index) => {
        if (index > 0) {
          message += '\n• • • • • • • • • • • • • • • • • • • • • • • • • • • • • •\n\n';
        }
        
        message += `:no_entry_sign: *Null Issue #${index + 1}*\n`;
        message += '```\n';
        message += `Table:       ${item.table}\n`;
        message += `Field:       ${item.field}\n`;
        message += `Null Count:  ${item.null_count}\n`;
        message += '```\n';
      });
    }
  
    // Add priority and action section
    message += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    
    // Set priority based on severity
    let priorityEmoji = ':yellow_circle:';
    let priorityText = 'Medium';
    
    if (totalIssues >= 10 || uniqueResults.length >= 5) {
      priorityEmoji = ':red_circle:';
      priorityText = 'High';
    } else if (totalIssues <= 2) {
      priorityEmoji = ':green_circle:';
      priorityText = 'Low';
    }
    
    message += `${priorityEmoji} *Priority:* ${priorityText}\n\n`;
    
    message += ':point_right: *Immediate Actions Required:*\n';
    
    if (uniqueResults.length > 0) {
      message += ':one: Review and resolve duplicate entries\n';
    }
    if (notNullResults.length > 0) {
      message += ':two: Fill in missing required values\n';
    }
    message += ':three: Validate data source integrity\n';
    
    return message;
  }
  
  
  function sendSlackMessage(messageText) {
    const payload = JSON.stringify({
      text: messageText
    });
  
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: payload
    };
  
    try {
      UrlFetchApp.fetch(slackWebhookUrl, options);
      Logger.log('Data quality Slack notification sent successfully');
    } catch (e) {
      Logger.log('Failed to send data quality Slack notification: ' + e.toString());
    }
  }
  
  