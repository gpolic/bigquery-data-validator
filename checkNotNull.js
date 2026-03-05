function checkNotNull() {
    const allResults = [];
  
    config.forEach(({ table, fields }) => {
      fields.forEach(field => {
        const query = `
          SELECT
            COUNT(*) AS null_count
          FROM \`${datasetId}.${table}\`
          WHERE \`${field}\` IS NULL
        `;
  
        try {
          const queryResults = executeBigQueryQuery(query);
          if (queryResults.rows && queryResults.rows.length > 0) {
            const nullCount = queryResults.rows[0].f[0].v; // Get null_count from first row
            
            if (nullCount > 0) {
              allResults.push({
                table: table,
                field: field,
                null_count: nullCount
              });
            }
          }
        } catch (e) {
          Logger.log(`Assertion checks for NOT NULL. Error checking ${field} in ${table}: ${e}`);
        }
      });
    });
  
    return allResults;
  }

  