import { Box } from "@chakra-ui/react";
import CoinForm from "../components/Coin/CoinForm";

const Coin = () => {
  return (
    <Box margin="auto" padding={0} maxWidth={{base: "100%", xl: "6xl"}} width="100%">
      <Box width="100%">
        <CoinForm />
      </Box>
    </Box>
  )
}

export default Coin;