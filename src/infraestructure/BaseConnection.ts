import { createConnection, Connection } from "mysql2/promise";

import PgException from "../domain/PgException";
import IBaseConnection from "../domain/IBaseConnection";

import { ALREADY_CONNECTED, ERROR_NOT_CONNECTED } from "../constants/errors";

class BaseConnection implements IBaseConnection {
  protected connection: Connection | null = null;

  constructor(
    protected readonly host: string,
    protected readonly port: number,
    protected readonly database: string,
    protected readonly user: string,
    protected readonly password: string
  ) {}

  async connect() {
    if (!!this.connection) {
      throw new PgException(ALREADY_CONNECTED, "", "");
    }

    this.connection = await createConnection({
      host: this.host,
      port: this.port,
      database: this.database,
      user: this.user,
      password: this.password,
    });
    return true;
  }

  async ping() {
    if (!this.connection) {
      throw new PgException(ERROR_NOT_CONNECTED, "", "");
    }
    await this.connection.ping();
    return true;
  }

  async disconnect() {
    if (!this.connection) {
      throw new PgException(ERROR_NOT_CONNECTED, "", "");
    }
    this.connection.destroy();
    return true;
  }
}

export default BaseConnection;