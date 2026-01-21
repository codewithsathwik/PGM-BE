import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/db-connection.js";

dotenv.config({
    path: "./.env"
});

let port = process.env.PORT;


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`The server is running on port http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection error : ", err);
    });