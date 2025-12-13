const express = require('express');
const router = express.Router();
const controller = require('{{controllerPath}}');

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

// START:updateMany
// Handles bulk updates
router.patch('/', controller.updateMany);
// END:updateMany

// START:deleteMany
// Handles bulk deletes
router.delete('/', controller.deleteMany);
// END:deleteMany

module.exports = router;
