import MySqlConnection from "../../src/infraestructure/MySqlConnection";
import MySqlObjects from "../../src/infraestructure/MySqlObjects";

const PingUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  query: string
): Promise<any> => {
  const connection = new MySqlConnection(host, port, database, user, password);

  const objects = new MySqlObjects(connection);
  const result = await objects.getColumns("examplito2");

  return result;
};

export default PingUseCase;
