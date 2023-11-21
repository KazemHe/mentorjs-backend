const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query() {
  try {
    const collection = await dbService.getCollection('codeblock');
    var codeBlocks = await collection.find().toArray();
    return codeBlocks;
  } catch (err) {
    console.log('cannot find codeBlocks', err);
    throw err;
  }
}

async function getById(codeBlockId) {
  try {
    const collection = await dbService.getCollection('codeblock');
    const codeBlock = await collection.findOne({
      _id: new ObjectId(codeBlockId),
    });
    return codeBlock;
  } catch (err) {
    console.log(`while finding codeBlock ${codeBlockId}`, err);
    throw err;
  }
}

async function update(codeBlock) {
  try {
    const collection = await dbService.getCollection('codeblock');
    await collection.updateOne(
      { _id: new ObjectId(codeBlock._id) },
      {
        $set: {
          // title: codeBlock.title,
          starter: codeBlock.starter,
          code :codeBlock.code
        },
      }
    );
    return codeBlock;
  } catch (err) {
    console.log(`while updating codeBlock ${codeBlock._id}`, err);
    throw err;
  }
}

module.exports = {
  query,
  getById,
  update,
};
