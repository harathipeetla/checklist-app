const express = require('express')
const axios = require('axios')
const path = require('path')
const cors = require('cors')


const app = express();
const PORT = 3001

const API_URL = 'http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639';

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/application', async (req, res) =>{
    try{
        const response = await axios.get(API_URL)
        res.json(response.data)

    }catch(error){
        console.error("Error fetching data: ", error.message)
        res.status(500).json({error:'Failed to fetch application data'})

    }
})


app.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`)
})