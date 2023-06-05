import MySqlConnection from "../../src/infraestructure/MySqlConnection";

const PingUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  query: string
): Promise<any> => {
  const connection = new MySqlConnection(host, port, database, user, password);

  const connected = await connection.connect();
  if (!connected) {
    return connected;
  }

  const result = await connection.query(query);

  await connection.disconnect();

  return result;
};

export default PingUseCase;
