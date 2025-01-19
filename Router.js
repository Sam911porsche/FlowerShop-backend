// const express = require("express")
// const router = express.Router()
// const { flowerShop, getData, getSingleData ,delData,updateFlowerShop} = require("./controller.js")
// router.post("/signup", flowerShop)
// router.get("/getData", getData);
// router.get("/single/:id", getSingleData);
// router.delete("/delete/:id", delData);
// router.put("/update/:id", updateFlowerShop);
// router.patch("/update/:id", updateFlowerShop)
// module.exports = router;


const express = require("express")
const router = express.Router()
const { createBlogs, getBlog, getSingleBlog ,deleteBlog,updateBlog} = require("./blogController.js")
router.post("/signup", createBlogs)
router.get("/getData", getBlog);
router.get("/single/:id", getSingleBlog);
router.delete("/delete/:id", deleteBlog);
router.put("/update/:id", updateBlog);
module.exports = router;