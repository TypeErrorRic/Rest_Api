const express = require('express');
const morgan = require('morgan')

const port = 3000;
const Hostname = '127.0.0.1'

app = express();

let products = [
    {
        name: "computador",
        price: 100,
        id: 1
    }
]

app.use(express.json());
app.use(morgan('dev'))

app.get('/', function (req, res) {
    res.sendFile('./index.html', {
        root: __dirname
    })
})

app.get('/products', (req,res) => {
    res.json(products);
})

app.post('/products', (req,res) => {
    const Product_exist = products.find((p) => p.name === req.body.name)
    if(!Product_exist){
        products.push({...req.body, id: products.length + 1});
        console.log(req.body.name);
        return res.json({ 
            Message: "Creando Producto.",
        });
    }
    else return res.json({
        Message: "Producto ya existente",
    })
})

app.put('/products', (req, res) => {
    res.send("Actualizado el producto.");
})

app.delete('/products/:id', (req, res) => {
    const Product_validation = products.find((products) => products.id === parseInt(req.params.id))
    if(!Product_validation) return res.status(404).json({
        Message: "No encontro el producto",
    })
    products = products.filter((p) => p.id !== parseInt(req.params.id));
    res.sendStatus(404);
})

app.get('/products/:id', (req, res) => {
    const Product_validation = products.find(function (products) {
        return products.id === parseInt(req.params.id); 
    })
    if(!Product_validation) return res.status(404).json({
        Message: "Producto no encontrado",
    })
    else{
        console.log(Product_validation);
        return res.json(Product_validation);
    }
})

app.listen(port, Hostname)
{
    console.log(`El servido corre en la dirreción http//:${Hostname}:${port}/`);
}
