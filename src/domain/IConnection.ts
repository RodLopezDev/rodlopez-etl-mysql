import IQueryResult from "./IQueryResult";

interface IConnection {
  query(query: string): Promise<IQueryResult>;
  fill(table: string, data: Record<string, any>[]): Promise<IQueryResult[]>;
}

export default IConnection;
