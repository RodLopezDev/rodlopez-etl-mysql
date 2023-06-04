import CommonColumnType from "./common-columns";

interface ColType {
  id: number;
  nativeType: string;
  commonType: string;
}

const SupportedColumns: ColType[] = [
  {
    id: 3,
    nativeType: "int",
    commonType: CommonColumnType.INT,
  },
  {
    id: 253,
    nativeType: "varchar",
    commonType: CommonColumnType.STRING,
  },
];

export default SupportedColumns;
