import BaseConnection from "./BaseConnection";

import IColumn from "../domain/IColumn";
import IConnection from "../domain/IConnection";
import IQueryResult from "../domain/IQueryResult";
import MySqlException from "../domain/MySqlException";

import { ERROR_NOT_CONNECTED } from "../constants/errors";
import { GetColumns } from "../helpers/query-helpers";

class MySqlConnection extends BaseConnection implements IConnection {
  async query(query: string): Promise<IQueryResult> {
    if (!this.connection) {
      throw new MySqlException(ERROR_NOT_CONNECTED, "", "");
    }

    const [rowsDriver, fields] = await this.connection.execute(query);

    if (!!fields) {
      const columns = GetColumns(fields);
      const rows = rowsDriver as Record<string, any>[];
      return { isSelect: true, columns, rows, type: "SELECT" };
    }

    throw new MySqlException("", "", "");
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
