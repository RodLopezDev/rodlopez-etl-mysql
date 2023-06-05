import MySqlConnection from "../../src/infraestructure/MySqlConnection";
import MySqlObjects from "../../src/infraestructure/MySqlObjects";

const GetColumnsUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  table: string
) => {
  const connection = new MySqlConnection(host, port, database, user, password);
  const pgObjects = new MySqlObjects(connection);

  return await pgObjects.getColumns(table);
};

export default GetColumnsUseCase;
