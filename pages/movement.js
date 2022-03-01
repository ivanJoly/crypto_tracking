import { Box } from "@chakra-ui/react";
import dbConnect from "../lib/dbConnect";
import Coin from '../models/Coin'
import MovementForm from "../components/Movement/MovementForm";

const Movement = ({coins}) => {
  return (
    <Box margin="auto" padding={0} maxWidth={{base: "100%", xl: "6xl"}} width="100%">
      <Box width="100%">
        <MovementForm coins={coins}/>
      </Box>
    </Box>
  )
}

export async function getServerSideProps() {
  await dbConnect()
  const result = await Coin.find({});
  const coins = result.map((doc) => {
    const coin = doc.toObject()
    coin._id = coin._id.toString()
    return coin
  })

  return { props: { coins: coins } }
}

export default Movement;