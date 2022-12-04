const express = require('express')
const router = express.Router()
const ctrls = require("../controllers")

router.get("/", ctrls.images.index)
router.post("/new", ctrls.images.create)
router.put('/:id', ctrls.images.update)
router.delete("/:id", ctrls.images.destroy)

module.exports = router;