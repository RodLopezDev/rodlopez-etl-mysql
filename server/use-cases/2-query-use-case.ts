import MySqlConnection from "../../src/infraestructure/MySqlConnection";

const QueryUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  query: string
) => {
  const connection = new MySqlConnection(host, port, database, user, password);

  const connencted = await connection.connect();
  if (!connencted) {
    return null;
  }

  const queryResult = await connection.query(query);

  await connection.disconnect();

  return queryResult;
};

export default QueryUseCase;
