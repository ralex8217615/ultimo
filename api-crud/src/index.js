import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import plantasRoutes from "./routes/plantasRoutes.js";

dotenv.config();

const app = express();

app.use(cors()); 

app.use(express.json());

app.use("/api/plantas", plantasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});