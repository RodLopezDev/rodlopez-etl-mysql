import { ResultSetHeader } from "mysql2";

import BaseConnection from "./BaseConnection";

import IConnection from "../domain/IConnection";
import IQueryResult from "../domain/IQueryResult";
import MySqlException from "../domain/MySqlException";

import { ERROR_NOT_CONNECTED } from "../constants/errors";
import { QueryType, QueryTypeLabel } from "../constants/query-type";
import { GetColumns, QueryResultType } from "../helpers/query-helpers";

class MySqlConnection extends BaseConnection implements IConnection {
  get dbName() {
    return this.database;
  }

  async query(query: string): Promise<IQueryResult> {
    if (!this.connection) {
      throw new MySqlException(ERROR_NOT_CONNECTED, "", "");
    }

    const [rowsDriver, fields] = await this.connection.execute(query);

    if (!!fields) {
      const columns = GetColumns(fields);
      const rows = rowsDriver as Record<string, any>[];
      return {
        rows,
        columns,
        isSelect: true,
        type: QueryTypeLabel[QueryType.SELECT],
      };
    }

    const queryType = QueryResultType(query);
    if (queryType === QueryType.UNKNOWN) {
      throw new MySqlException("", "", "");
    }

    if (
      [QueryType.INSERT, QueryType.UPDATE, QueryType.DELETE].includes(queryType)
    ) {
      const result = rowsDriver as ResultSetHeader;

      return {
        isSelect: false,
        affectedRows: result.affectedRows || 0,
        completed: result.affectedRows > 0,
        type: QueryTypeLabel[queryType],
      };
    }

    return {
      isSelect: false,
      affectedRows: 0,
      completed: true,
      type: QueryTypeLabel[queryType],
    };
  }

  async fill(
    schema: string,
    table: string,
    data: Record<string, any>[]
  ): Promise<IQueryResult[]> {
    if (!this.connection) {
      throw new MySqlException(ERROR_NOT_CONNECTED, "", "");
    }

    return Promise.resolve([
      {
        type: "INSERT",
        completed: true,
        affectedRows: 0,
        isSelect: false,
      },
    ]);
  }
}

export default MySqlConnection;
