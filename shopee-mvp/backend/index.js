const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Hard-coded product data with placeholder image URLs
const products = [
  { _id: '1', name: 'Nike Air Max', price: 120, image: 'https://via.placeholder.com/400x400/ff5722/ffffff?text=Nike+Air+Max' },
  { _id: '2', name: 'Plain T-Shirt', price: 25, image: 'https://via.placeholder.com/400x400/28a745/ffffff?text=Plain+T-Shirt' },
  { _id: '3', name: 'Wireless Mouse', price: 40, image: 'https://via.placeholder.com/400x400/007bff/ffffff?text=Wireless+Mouse' },
];

// GET /products
app.get('/products', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /products/:id
app.get('/products/:id', (req, res) => {
  try {
    const product = products.find(p => p._id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
