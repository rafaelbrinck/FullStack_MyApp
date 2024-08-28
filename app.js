const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/produtos', (req, res) => {
  res.send('Listar Produtos')
})

app.get('/produtos/1', (req, res) => {
  res.send('Listando Produtos por ID')
})

app.post('/produtos', (req, res) =>{

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})