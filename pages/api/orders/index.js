import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  console.log('hello from fist index');
  const { _id } = session;
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: _id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;