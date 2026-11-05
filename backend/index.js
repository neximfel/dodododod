require('dotenv').config()
const express = require("express")
const cors = require("cors")
const {Pool} = require("pg")
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

const PORT = 3000

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})

app.get("/api/main", async(req,res) => {
    try{
        const result = await pool.query('SELECT * FROM item')
        res.json(result.rows)
    } catch(error){
        res.status(500).json({error:`Server error: ${error.message}`})
    }
})

app.post('/api/form', async(req,res) => {
    try{
        const {title, tag, date_text, sort_order, category} = req.body
        const result = await pool.query(
            'INSERT INTO query (title, tag, date_text, sort_order, category) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [title, tag, date_text, sort_order, category]
        )
        res.json(result.rows[0])
    } catch(error){
        res.status(500).json({error:error.message})
    }
})