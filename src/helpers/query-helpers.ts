import { FieldPacket } from "mysql2";

import IColumn from "../domain/IColumn";
import MySqlException from "../domain/MySqlException";

import SupportedColumns from "../constants/engine-columns";
import { NOT_SUPPORTED_COLUMN } from "../constants/errors";

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
