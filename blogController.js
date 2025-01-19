const Blog = require("./module")
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./uploadsflower"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const createBlogs = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Error uploading image." });
    }
    
    const { name,PKR } = req.body;
    const image = req.file ? req.file.filename : null;
    const currentDate = new Date();

    try {
      const blog = new Blog({
        name,PKR,
        image,
        createdAt: currentDate,
      });

      await blog.save();

      res.status(201).json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(400).json({ error: error.message });
    }
  });
};
  
const getBlog = async (req,res)=>{
    try{
        const blogData = await Blog.find();
        res.status(200).json(blogData) 
    }
    catch{
        res.status(400).json({ error: error.message });
    }
}


// get single record
const getSingleBlog = async (req, res) => {
    const { id } = req.params;
    const course = await Blog.findById({ _id: id });
    if (!course) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json( course );
};

// delete single record

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    const course = await Blog.findByIdAndDelete({ _id: id });
    if (!course) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ course });
};


// update reg course
const updateStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploadsflower"));
  },
  filename: function (req, file, cd) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    cd(null, filename);
  },
});

const updateUpload = multer({ storage: updateStorage });

const updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    updateUpload.single("image")(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Error uploading image." });
      }

      const { name,PKR } = req.body;
      const updateObject = {};
      if (name) {
        updateObject.name = name;
      }
    
      if (PKR) {
        updateObject.PKR = PKR;
      }
      if (req.file) {
        updateObject.image = req.file.filename;
      }

      const updatedBlog = await Blog.findByIdAndUpdate(id, updateObject, {
        new: true,
        runValidators: true,
      });

      if (!updatedBlog) {
        return res.status(400).json({ error: "No record found!!!" });
      }

      res.status(200).json(updatedBlog);
    });
  } catch (error) {
    console.error("Error updating demo:", error);
    res.status(400).json({ error: error.message });
  }
};
  
module.exports = { 
    createBlogs,
    getBlog,
    getSingleBlog,
    deleteBlog,
    updateBlog,
}