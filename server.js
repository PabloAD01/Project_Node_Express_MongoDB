import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary';


//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use(express.static(path.resolve(__dirname, './client/dist'))); 

/*
Se utiliza para servir archivos estáticos, como archivos CSS, imágenes, 
scripts del lado del cliente, etc., desde un directorio específico en el servidor. 

Se especifica un directorio en el servidor que contiene los archivos estáticos que deseas servir. 
Estos archivos se vuelven accesibles a través de las rutas especificadas en el cliente. 
*/


app.use(cookieParser());
/*
Express puede interpretar las cookies enviadas 
por el cliente en las solicitudes HTTP entrantes y 
hacer que la información contenida en esas cookies 
sea fácilmente accesible en el objeto req.cookies.
*/



app.use(express.json());
/*
Se utiliza para analizar el cuerpo de las solicitudes HTTP 
entrantes que tienen un formato JSON.
Toma los datos JSON enviados por el cliente en el cuerpo de la solicitud 
y los convierte en un objeto JavaScript para que puedan ser utilizados en el servidor.
*/

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "Test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/*", (req, res) => {
  res.status(404).json({ msg: "API endpoint not found" });
});

app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
})

app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
