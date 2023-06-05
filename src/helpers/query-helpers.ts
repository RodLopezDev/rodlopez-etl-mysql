import { FieldPacket } from "mysql2";

import IColumn from "../domain/IColumn";
import MySqlException from "../domain/MySqlException";

import SupportedColumns from "../constants/engine-columns";
import { NOT_SUPPORTED_COLUMN } from "../constants/errors";
import { QueryType } from "../constants/query-type";

export const GetColumns = (fields: FieldPacket[]): IColumn[] => {
  const Columns = fields.map((field): IColumn => {
    const { name, type } = field;
    const colType = SupportedColumns.find((e) => e.id === type);
    if (!colType) {
      throw new MySqlException(
        NOT_SUPPORTED_COLUMN,
        `column ${field.name} with type ${type} not supported`,
        ""
      );
    }

    const { commonType, nativeType } = colType;
    return { name, commonType, nativeType };
  });
  return Columns;
};

export const QueryResultType = (query: string): QueryType => {
  const _query = query.toLowerCase();
  if (_query.toLowerCase().indexOf("insert") === 0) {
    return QueryType.INSERT;
  }
  if (_query.toLowerCase().indexOf("update") === 0) {
    return QueryType.UPDATE;
  }
  if (_query.toLowerCase().indexOf("delete") === 0) {
    return QueryType.DELETE;
  }
  if (_query.toLowerCase().indexOf("create table") === 0) {
    return QueryType.CREATE;
  }
  if (_query.toLowerCase().indexOf("drop table") === 0) {
    return QueryType.CREATE;
  }
  return QueryType.UNKNOWN;
};
