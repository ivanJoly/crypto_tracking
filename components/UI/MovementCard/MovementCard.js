import { 
  Box, 
  Badge, 
  Image, 
  Heading, 
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
Divider } from "@chakra-ui/react";
import { formatShare, formatCurrency } from "./../../../utils";

const MovementCard = ({movement}) => {
  const actualAmount = (movement.amount * movement.actualValue).toFixed(2);
  const actualPrice = Number(movement.actualValue).toFixed(10);
  const prevAmount = (movement.total).toFixed(2);
  const percentage = (((actualAmount * 100) / prevAmount) - 100).toFixed(2);

  return(
    <>
      <Box borderWidth="1px" borderRadius="lg">
        <Box p={4}>
          <Box display="flex" alignItems="center" justifyContent="space-between"> 
            <Box display="flex" flex={1}>
              <Image alignSelf="center" src={movement.icon_url} mr={4}></Image>
              <Box display="row" alignItems="baseline">
                <Heading as="h4" size="md">
                  {movement.name}
                </Heading>
                <Badge>{movement.symbol}</Badge>  
              </Box>
            </Box>
            <Box ml={4} flex={1}>
                <Box>
                  <Stat textAlign="right">
                    <StatNumber fontSize={{base:"1.1em", sm: "1.4em"}}>{`$${actualPrice}`}</StatNumber>
                    <StatHelpText>
                      <StatArrow type={percentage > 0 ? 'increase' : 'decrease'} />
                      {`${percentage}%`}
                    </StatHelpText>
                  </Stat>
                </Box>
            </Box>
          </Box>
          <Divider my={2}/>
          <Box>
            <Stat>
              <Box display="flex" justifyContent="space-between" p={2}>
                <Box>
                  <StatLabel>Net</StatLabel>
                  <StatNumber>{formatCurrency(prevAmount)}</StatNumber>
                </Box>
                <Box>
                  <StatLabel>Market</StatLabel>
                  <StatNumber>{formatCurrency(actualAmount)}</StatNumber>
                </Box>
                <Box>
                  <StatLabel>Share</StatLabel>
                  <StatNumber>{`${formatShare(movement.amount)}`}</StatNumber>
                </Box>
              </Box>
            </Stat>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default MovementCard;