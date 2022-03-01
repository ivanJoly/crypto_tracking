import dbConnect from "../../../lib/dbConnect";
import Coin from "../../../models/Coin";

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const coins = await Coin.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: coins })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const coin = await Coin.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: coin })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
