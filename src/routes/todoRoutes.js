const router = require("express").Router()
const { addTodo, getTodo, updateTodo, deleteTodo } = require("../controller/todoController")
const { privateRoute } = require("../middleware/verifyJwt")


router.get('/',privateRoute,getTodo)
router.post('/',privateRoute,addTodo)

router.put('/:id',privateRoute,updateTodo)
router.delete('/:id',privateRoute,deleteTodo)

module.exports = router