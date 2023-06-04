import PgConnection from "./MySqlConnection";

import IObjects from "../domain/IObjects";
import MySqlException from "../domain/MySqlException";

import { getColumnsQuery, getTablesQuery } from "../constants/core-queries";
import {
  BAD_FORMAT_QUERY,
  ERROR_NOT_CONNECTED,
  OBJECT_NOT_FOUND,
} from "../constants/errors";

class MySqlObjects implements IObjects {
  constructor(private readonly pgConnection: PgConnection) {}

  async getTables() {
    const connected = await this.pgConnection.connect();
    if (!connected) {
      throw new MySqlException(ERROR_NOT_CONNECTED, "", "");
    }

    const result = await this.pgConnection.query(getTablesQuery());
    if (!result.isSelect) {
      throw new MySqlException(BAD_FORMAT_QUERY, "", "");
    }
    if (!result.rows.length) {
      throw new MySqlException(OBJECT_NOT_FOUND, "", "");
    }

    await this.pgConnection.disconnect();

    return result;
  }

  async getColumns(table: string) {
    const connected = await this.pgConnection.connect();
    if (!connected) {
      throw new MySqlException(ERROR_NOT_CONNECTED, "", "");
    }

    const result = await this.pgConnection.query(getColumnsQuery(table));
    if (!result.isSelect) {
      throw new MySqlException(BAD_FORMAT_QUERY, "", "");
    }
    if (!result.rows.length) {
      throw new MySqlException(OBJECT_NOT_FOUND, "", "");
    }

    await this.pgConnection.disconnect();

    return result;
  }
}

export default MySqlObjects;
