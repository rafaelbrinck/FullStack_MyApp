const express = require('express')
const { Client } = require('pg') 

const conexao = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'banco',
  database: 'crud_produtos'
}

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

app.get('/produtos', async (req, res) => {
  const client = new Client(conexao)
  await client.connect()
  
  const result = await client.query('SELECT * FROM PRODUTOS')
  const listaProdutos = result.rows

  await client.end()
  res.json(listaProdutos)
})

app.get('/produtos/:id', async (req, res) => {
  const id = req.params.id 
  const client = new Client(conexao)
  await client.connect()
  const result = await client.query('SELECT * FROM PRODUTOS WHERE id=$1', [id])
  const produto = result.rows[0]
  await client.end()
  if(produto){
    res.status(200).json(produto)
  }else{
    res.status(404).json({erro: "Produto nao encontrado!"})
  }

})

app.post('/produtos', async (req, res) => {
  const produto = req.body
  if(!produto || !produto.nome || !produto.categoria || !produto.preco){
    res.status(400).json({ erro: "Informacoes de produto incompletas!"})
  }else{
    const client = new Client(conexao)
    await client.connect()
    const result = await client.query(
      'INSERT INTO PRODUTOS (nome, categoria, preco) VALUES ($1, $2, $3) RETURNING *', [produto.nome, produto.categoria, produto.preco]
    )
    const produtoInserido = result.rows[0]
    await client.end()

    res.status(201).json(produtoInserido)
  }
})


app.put('/produtos/:id', (req, res) =>{
  const produto = req.body
  const id = req.params.id
  console.log(produto)

  res.status(201).json(produto[id])
});

app.delete('/produtos/:id', async (req, res) =>{
  const id = req.params.id
  // const client = new Client(conexao)
  // await client.connect()
  // const result = await client.query('DELETE FROM produtos WHERE id = $1',[id])
  // await client.end()
  // const produto = result.rows[id]
  res.status(201).json(produtos[id])
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})