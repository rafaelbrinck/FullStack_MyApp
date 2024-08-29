const express = require('express')
const app = express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const produtos = [
  {id:1, nome:'Arroz', preço:10, categoria:'Alimento'},
  {id:2, nome:'Feijão', preço:20, categoria:'Alimento'},
  {id:3, nome:'Suco', preço:8, categoria:'Bebidas'}
]

app.get('/', (req, res) => {
  res.json(produtos)
})

app.get('/produtos', (req, res) => {
  res.send(produtos)
})

app.get('/produtos/:id', (req, res) => {
  const id = req.params.id 
  res.status(201).json(produtos[id])
})

app.post('/produtos', (req, res) => {
  const produto = req.body
  console.log(produto)
  res.json(produto)
})


app.put('/produtos/:id', (req, res) =>{
  const produto = req.body
  const id = req.params.id
  console.log(produto)

  res.status(201).json(produto[id])
});

app.delete('/produtos/:id', (req, res) =>{
  const id = req.params.id

  res.status(201).json(produtos[id])
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})