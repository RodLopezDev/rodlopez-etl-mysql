import BaseConnection from "./BaseConnection";

import IConnection from "../domain/IConnection";
import PgException from "../domain/PgException";
import IQueryResult from "../domain/IQueryResult";

import { ERROR_NOT_CONNECTED } from "../constants/errors";

class PgConnection extends BaseConnection implements IConnection {
  async query(query: string): Promise<IQueryResult> {
    if (!this.connection) {
      throw new PgException(ERROR_NOT_CONNECTED, "", "");
    }

    const [rows, fields] = await this.connection.execute("SHOW TABLES");

    const result = (rows as Array<any>).map((element) => {
      const key = Object.keys(element);
      return element?.[key?.[0]] || "";
    });

    console.log(fields, "fields");
    console.log(result, "result");

    throw new PgException("", "", "");
  }

  async fill(
    schema: string,
    table: string,
    data: Record<string, any>[]
  ): Promise<IQueryResult[]> {
    if (!this.connection) {
      throw new PgException(ERROR_NOT_CONNECTED, "", "");
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

export default PgConnection;
