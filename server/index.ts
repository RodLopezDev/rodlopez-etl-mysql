import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, () => {
  console.log(`PORT: ${port}`);
});
