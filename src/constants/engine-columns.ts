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
    id: 252,
    nativeType: "Blob",
    commonType: CommonColumnType.STRING,
  },
  {
    id: 253,
    nativeType: "VarChar",
    commonType: CommonColumnType.STRING,
  },
];

export default SupportedColumns;
