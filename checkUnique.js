function checkUnique() {

    const allResults = [];
  
    config.forEach(({table, fields}) => {
        fields.forEach(field => {
            const query = `
              SELECT 
                \`${field}\` as duplicate_field,
                COUNT(*) as duplicate_count
              FROM \`${datasetId}.${table}\`
              GROUP BY \`${field}\`
              HAVING duplicate_count > 1
            `;
  
            try {
              const queryResults = executeBigQueryQuery(query);
              if (queryResults.rows && queryResults.rows.length > 0) {
                allResults.push(...queryResults.rows.map(row => ({
                  table: `${table}`,
                  field: field,
                  value: row.f[0].v, // First field value
                  duplicates: row.f[1].v // Duplicate count
                })));
              }
            } catch (e) {
              Logger.log(`Assertion checks for Unique. Error checking ${field} in ${table}: ${e}`);
            }
        });
    });
  
    return allResults;
  }
  

  
  