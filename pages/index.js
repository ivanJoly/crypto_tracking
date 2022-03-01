import { Grid, Box } from "@chakra-ui/react";
import dbConnect from '../lib/dbConnect'
import Movement from '../models/Movement'
import MovementCard from '../components/UI/MovementCard/MovementCard'

const Index = ({ movements }) => (
  <>
    <Box margin="auto" padding={{base: "4" , sm: "8"}} maxWidth={{base: "100%", xl: "6xl"}} width="100%">
      <Grid templateColumns={{base:"repeat(1, 1fr)", md:"repeat(2, 1fr)", xl:"repeat(3, 1fr)"}} gap={6}>
        {movements.map((movement) => (
          <MovementCard key={movement._id} movement={movement} />
        ))}
      </Grid>
    </Box>
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  const result = await Movement.aggregate([
    {
      $group:{ 
        _id: '$coin',
        amount:{$sum: "$amount"}, 
        total: {$sum: "$total"},
      }
    },
    {
        $lookup:{
          from: "coins",
          localField: "_id",
          foreignField: "_id",
          as: "coin"
        }
    },
    {
      $unwind: '$coin'
    },
    {
      $project: {
        amount: "$amount",
        total: "$total",
        name: "$coin.name",
        symbol: "$coin.symbol",
        address: "$coin.address",
        icon_url: "$coin.icon_url",
      }
    }
  ]);

  const movements = await Promise.all(
    result.map(async(doc) => {
      let movement = doc;
      
      const psResponse = await fetch(`https://api.pancakeswap.info/api/v2/tokens/${movement.address}`)
        .then(res => res.text())
        .then(data => {
          return JSON.parse(data).data;
        });

      movement._id = movement._id.toString()
      movement.actualValue = psResponse.price;
      return movement;
    })
  )

  return { props: { movements: movements }, }
}

export default Index
