import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import { Stack, FormControl, FormLabel, Input, FormHelperText, Button, Select } from "@chakra-ui/react";

const MovementForm = ({coins}) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const postData = async (form) => {
    try {
      const res = await fetch('/api/movements', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      console.log({error});
    }
  }

  function setCoin(event) {
    setValue("coin", event.target.value);
  }

  async function onSubmit(values) {
    values.total = values.amount * values.price;
    await postData(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8}>
          <FormControl id="name">
            <FormLabel>Name Crypto</FormLabel>
            <Select placeholder="Select Option" onChange={setCoin}>
            {coins.map((coin) => (
              <option key={coin._id} value={coin._id}>
                {coin.name}
              </option>
            ))}
            </Select>
            <FormHelperText>Write the name crypto</FormHelperText>
          </FormControl>
          <FormControl id="amount">
            <FormLabel>Amount of Crypto buy</FormLabel>
            <Input type="number" step="0.00000000001" {...register("amount")}/>
            <FormHelperText>Write the amount of crypto</FormHelperText>
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price of Crypto buy</FormLabel>
            <Input type="number" step="0.00000000001" {...register("price")}/>
            <FormHelperText>Write the price of crypto</FormHelperText>
          </FormControl>
          <Button alignSelf="flex-end" type="submit" isLoading={isSubmitting}>Save</Button>
      </Stack>
    </form>
  )
}

export default MovementForm;