const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8800
app.listen(PORT,() => {
  console.log(`listening on ${PORT}`);
})
app.get('/',(req,res)  => {
  return res.send(`
  <h1>Hello world!</h1>`
)
})