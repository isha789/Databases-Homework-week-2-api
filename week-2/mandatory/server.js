const express = require("express");
const { Pool, Client } = require("pg");
const PORT = 3000;
const app = express();


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'isha',
    port: 5432
});

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});
app.listen(PORT, function () {
    console.log(`Your app is listening on port ${PORT}`);
});

// app.get("/products", function(req, res) {
//     pool.query('SELECT products.product_name, suppliers.supplier_name FROM products JOIN suppliers ON products.supplier_id = suppliers.id ', (error, result) => {
//         res.json(result.rows);
//     });
// });
app.get("/products", async (req, res) => {
    try {
        const getProducts = await pool.query("SELECT products.product_name, suppliers.supplier_name FROM products JOIN suppliers ON products.supplier_id = suppliers.id");
        res.json(getProducts.rows);
    } catch (err) {
        console.error(err.message);
    }
})