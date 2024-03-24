const express = require("express")
require("dotenv").config()
const cors = require("cors")
const { userRouter } = require("./Route/userRoute")
const { Connection } = require("./Config/db")
const { geoRouter } = require("./Route/geoRoute")
const { adminRouter } = require("./Route/adminRoute")

const app = express()



app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/geo", geoRouter)
app.use("/admin", adminRouter)

app.listen(process.env.PORT, async () => {
    try {
        await Connection
        console.log(`Server is running at PORT ${process.env.PORT}`);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Something Went Wrong.");
        console.log(error.message);
    }
})