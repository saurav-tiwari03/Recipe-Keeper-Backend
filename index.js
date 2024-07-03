const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors())

require('dotenv').config();
const {connect} = require('./config/database')
const router = require('./routes/route')

const PORT = process.env.PORT || 8800
app.listen(PORT,() => {
  console.log(`listening on ${PORT}`);
  connect();
})


app.get('/',(req,res)  => {
  res.status(200).json({
    message:'Welcome to Recipe-Keeper Backend'
  })
})

app.use('/api/v1',router)