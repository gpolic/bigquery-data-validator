
function runAssertions() {
    SpreadsheetApp.enableBigQueryExecution();
    
    const resultForUnique = checkUnique();
    Logger.log('Unique Assertions have been executed.')
  
    const resultForNotNull = checkNotNull();
    Logger.log('NotNull Assertions have been executed.')
  
    // Check if either array has results
    if (resultForUnique.length > 0 || resultForNotNull.length > 0) {
  
      Logger.log('Assertions in dataset tables show errors. Sending email notification.');
      sendEmailNotification(resultForUnique, resultForNotNull);
  
    } else {
      
      Logger.log('Assertions in dataset tables do not show any errors. No action required.');
    }
  }




