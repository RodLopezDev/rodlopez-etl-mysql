import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { getNumber, getString } from "./utils";

import { MySqlException } from "../src/";
import PingUseCase from "./use-cases/example-case";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.post("/query", async (req: Request, res: Response) => {
  try {
    const DB_HOST = getString(req.body, "host");
    const DB_PORT = getNumber(req.body, "port" || 0);
    const DB_NAME = getString(req.body, "database");
    const DB_USER = getString(req.body, "user");
    const DB_PASSWORD = getString(req.body, "password");
    const DB_QUERY = getString(req.body, "query");

    const result = await PingUseCase(
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USER,
      DB_PASSWORD,
      DB_QUERY
    );
    return res.json(result);
  } catch (e: any) {
    if (e instanceof MySqlException) {
      return res.json({ error: e?.message, detail: e?.detail });
    }
    return res.json({ error: e?.message });
  }
});

app.listen(port, () => {
  console.log(`PORT: ${port}`);
});
