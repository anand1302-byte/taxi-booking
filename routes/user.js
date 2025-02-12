import express from "express";
import multer from "multer";
import userschema from "../models/user.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const user = express.Router();

user.get('/', async(req, res) => {
    const user = await userschema.find();
    res.render('index', { user });
})

user.get('/api/user', async(req, res) => {
    try {
    const users = await userschema.find();
    res.json(users);
    } catch(error) {
        res.status(500).json({ message:"Error Fetching users"})
    }
})

user.post('/add', upload.single("image"), async(req, res) => {

    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const add = new userschema({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: { data: req.file.buffer, contentType: req.file.mimetype }
    })
    await add.save();
    res.redirect("/");
})



user.post('/delete/:id', async(req, res) => {
    await userschema.findByIdAndDelete(req.params.id);
    res.redirect("/");
})

user.post("/edit/:id", upload.single("image"), async (req, res) => {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    };
    if (req.file) {
      updateData.image = { data: req.file.buffer, contentType: req.file.mimetype };
    }
    await userschema.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/");
});

export default user;