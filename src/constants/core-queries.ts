export const getTablesQuery = (dbName: string) => `
    SELECT 
        table_name as name 
    FROM INFORMATION_SCHEMA.TABLES
    WHERE table_schema = '${dbName}'
    ORDER BY table_name
`;

export const getColumnsQuery = (database: string, table: string) => `
    SELECT
        column_name as name,
        data_type as type
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE table_schema = '${database}'
        AND table_name  = '${table}'
    ORDER BY column_name
`;
