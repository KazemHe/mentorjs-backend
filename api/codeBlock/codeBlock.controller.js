const codeBlockService = require('./codeBlock.service.js');

async function getCodeBlocks(req, res) {
  try {
    const codeBlocks = await codeBlockService.query();
    res.json(codeBlocks);
  } catch (err) {
    res.status(500).send({ err: 'Failed to get codeBlocks' });
  }
}

async function getCodeBlockById(req, res) {
  try {
    const codeBlockId = req.params.id;
    const codeBlock = await codeBlockService.getById(codeBlockId);
    res.json(codeBlock);
  } catch (err) {
    res.status(500).send({ err: 'Failed to get codeBlock by id' });
  }
}

async function updateCodeBlock(req, res) {
  try {
    const codeBlock = req.body;
    console.log ('codeBlock',codeBlock)
    const updatedCodeBlock = await codeBlockService.update(codeBlock);
    res.json(updatedCodeBlock);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: 'Failed to update codeBlock' });
  }
}

module.exports = {
  getCodeBlocks,
  getCodeBlockById,
  updateCodeBlock
};
