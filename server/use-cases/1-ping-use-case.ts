import MySqlConnection from "../../src/infraestructure/MySqlConnection";

const PingUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string
): Promise<boolean> => {
  const connection = new MySqlConnection(host, port, database, user, password);

  const connected = await connection.connect();
  if (!connected) {
    return connected;
  }

  await connection.disconnect();

  return true;
};

export default PingUseCase;
