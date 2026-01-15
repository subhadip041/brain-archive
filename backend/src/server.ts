import express from "express"
import { dbConnection } from "./config/db.js"
import v1Router from "./routes/v1/index.js"

const app = express()
dbConnection()

app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).json({
        msg: "server is running"
    })
})

app.use('/api/v1',v1Router)


app.listen(4200)