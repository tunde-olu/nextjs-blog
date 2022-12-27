import {MongoClient} from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {email, name, message} = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({message: 'Invalid input.'});
      return;
    }

    // Store it in a database
    const newMessage = {email, name, message};
    let client;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.lqwb6md.mongodb.net/?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({message: 'Could not connect to database.'});
      return;
    }

    console.log('Connected successfully to server');
    const db = client.db(process.env.mongodb_database);

    try {
      const collection = db.collection('messages');
      const result = await collection.insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({message: 'Storing message failed!'});
      return;
    }
    client.close();

    res
      .status(201)
      .json({result: 'Successfully stored message!', message: newMessage});
  }
};
export default handler;
