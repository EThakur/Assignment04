// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MongoDB connection
mongoose.connect('mongodb+srv://ektathakur203:sunset07@cluster0.z0z95sb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    purchaseHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    shippingAddress: String
});

const User = mongoose.model('User', userSchema);

// Product Schema
const productSchema = new Schema({
    description: String,
    image: String,
    pricing: Number,
    shippingCost: Number
});

const Product = mongoose.model('Product', productSchema);

//Order Schema
const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' }
});


const Order = mongoose.model('Order', orderSchema);

// Comment Schema
const commentSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    image: String,
    text: String
});

const Comment = mongoose.model('Comment', commentSchema);

// Cart Schema
const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);


// Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// User Routes

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Product Routes
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Routes for creating, retrieving, updating, and deleting orders
app.post('/orders', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Routes for creating, retrieving, updating, and deleting comments
app.post('/comments', async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Routes for creating, retrieving, updating, and deleting carts
// Cart Routes
app.post('/carts', async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/carts/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/carts/:id', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/carts/:id', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access URL: http://localhost:${PORT}`);
});
