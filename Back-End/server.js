import app from "./app.js";
import connectToDB from "./configs/db.js";
import dotenv from "dotenv";

dotenv.config();
connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
