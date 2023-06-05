import MySqlConnection from "../../src/infraestructure/MySqlConnection";

const FillUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  table: string,
  data: any
) => {
  const connection = new MySqlConnection(host, port, database, user, password);

  const connencted = await connection.connect();
  if (!connencted) {
    return null;
  }

  const result = await connection.fill(table, data);

  await connection.disconnect();

  return result;
};

export default FillUseCase;
