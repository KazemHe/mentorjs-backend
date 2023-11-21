const express = require('express');
const {
  getCodeBlockById,
  getCodeBlocks,
  updateCodeBlock,
} = require('./codeBlock.controller.js');
const router = express.Router();

router.get('/', getCodeBlocks);
router.get('/:id', getCodeBlockById);
router.put('/:id', updateCodeBlock);

module.exports = router;
