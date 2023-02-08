require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRouter = require("./Routes/user.routes")
const dataRouter = require('./Routes/data.routes')
const cartRouter = require('./Routes/cart.routes')
const cRouter = require('./Routes/contact.routes')
const connect = require("./Config/db")
const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));

// ------------------------------------
app.use("/", userRouter);
app.use("/data", dataRouter)
app.use("/saved", cartRouter)
app.use("/contact", cRouter)
app.listen(PORT, async () => {
    await connect();
    console.log(`listning to http://localhost:${PORT}`)
})