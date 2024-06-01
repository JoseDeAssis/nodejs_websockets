import 'dotenv/config'
import "./dbConnect.js";
import express from 'express';
import url from "url";
import path from "path";
import http from "http";
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.port || 3000;
const currentPath = url.fileURLToPath(import.meta.url);
const publicDir = path.join(currentPath, "../..", "public");

app.use(express.static(publicDir));

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log("Servidor iniciado!");
})

const io = new Server(httpServer);

export default io;