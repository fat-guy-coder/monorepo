const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.js');

// START:create
// Handles single and bulk creation
router.post('/', controller.create);
// END:create
// START:getAll
router.get('/', controller.getAll);
// END:getAll
// START:getOne
router.get('/:id', controller.getOne);
// END:getOne
// START:updateOne
router.put('/:id', controller.updateOne);
// END:updateOne
// START:deleteOne
router.delete('/:id', controller.deleteOne);
// END:deleteOne
module.exports = router;