const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/socialMediaApp';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

// Post model
const PostSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
});
const Post = mongoose.model('Post', PostSchema);

// Contact Form model
const ContactFormSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const ContactForm = mongoose.model('ContactForm', ContactFormSchema);

// Middleware for token verification
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('A token is required for authentication');
    try {
        req.user = jwt.verify(token.split(' ')[1], 'YOUR_SECRET_KEY');
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
}

// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const user = new User({ username: req.body.username, password: hashedPassword });
        await user.save();
        res.status(201).send('User Registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// User login endpoint
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY');
            res.json({ token });
        } else {
            res.status(401).send('Invalid Credentials');
        }
    } catch (error) {
        res.status(500).send('Error during Login');
    }
});

// Create post endpoint
app.post('/posts', verifyToken, async (req, res) => {
    try {
        const post = new Post({ userId: req.user.userId, title: req.body.title, content: req.body.content });
        await post.save();
        res.status(201).send('Post created Successfully');
    } catch (error) {
        res.status(500).send('Error creating post');
    }
});

// Get all posts endpoint
app.get('/posts', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).send('Error fetching posts');
    }
});

// Fetch a single post endpoint
app.get('/posts/:postId', verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).send('Post not Found');
        }
        res.json(post);
    } catch (error) {
        res.status(500).send('Error fetching post');
    }
});

// Update post endpoint
app.put('/posts/:postId', verifyToken, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId, userId: req.user.userId });
        if (!post) return res.status(404).send('Post not found or unauthorized');
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.status(200).send('Post updated successfully');
    } catch (error) {
        res.status(500).send('Error updating post');
    }
});

// Delete post endpoint
app.delete('/posts/:postId', verifyToken, async (req, res) => {
    try {
        const result = await Post.findOneAndDelete({ _id: req.params.postId, userId: req.user.userId });
        if (!result) {
            return res.status(404).send('Post not found or unauthorized');
        }
        res.status(200).send('Post deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting post');
    }
});

// Contact form submission endpoint
app.post('/contacts', async (req, res) => {
    try {
        // const { name, email, message } = req.body;
        const newContactForm = new ContactForm({ name : req.body.name, email : req.body.email, message : req.body.message });
        await newContactForm.save();
        res.status(201).send('Contact form submitted successfully');
    } catch (error) {
        res.status(500).send('Error submitting contact form');
    }
});

// Server setup
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
