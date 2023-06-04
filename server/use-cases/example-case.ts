import MySqlConnection from "../../src/infraestructure/MySqlConnection";

const PingUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string
): Promise<any> => {
  const connection = new MySqlConnection(host, port, database, user, password);

  const connected = await connection.connect();
  if (!connected) {
    return connected;
  }

  const result = await connection.query("select * from examplito2");
  /*const result = await connection.query(
    `INSERT INTO examplito2 
    (valuecillo, valuecillo2, rodri)
    values(1, 1, 'EXAMPLE')`
  );*/
  console.log(result, "result");

  await connection.disconnect();

  return result;
};

export default PingUseCase;
