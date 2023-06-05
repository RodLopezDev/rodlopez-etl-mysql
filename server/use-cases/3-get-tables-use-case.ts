import MySqlConnection from "../../src/infraestructure/MySqlConnection";
import MySqlObjects from "../../src/infraestructure/MySqlObjects";

const GetTablesUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string
) => {
  const connection = new MySqlConnection(host, port, database, user, password);
  const pgObjects = new MySqlObjects(connection);

  return await pgObjects.getTables();
};

export default GetTablesUseCase;
