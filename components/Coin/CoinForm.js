import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import { Stack, FormControl, FormLabel, Input, FormHelperText, Button } from "@chakra-ui/react";

const CoinForm = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const postData = async (form) => {
    try {
      const res = await fetch('/api/coins', {
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

  async function onSubmit(values) {
    await postData(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8}>
          <FormControl id="name">
            <FormLabel>Name Crypto</FormLabel>
            <Input type="text" {...register("name")} />
            <FormHelperText>Write the name crypto</FormHelperText>
          </FormControl>
          <FormControl id="symbol">
            <FormLabel>Symbol Crypto</FormLabel>
            <Input type="text" {...register("symbol")}/>
            <FormHelperText>Write the symbol crypto</FormHelperText>
          </FormControl>
          <FormControl id="address">
            <FormLabel>Address Crypto</FormLabel>
            <Input type="text" {...register("address")}/>
            <FormHelperText>Write the address crypto</FormHelperText>
          </FormControl>
          <FormControl id="icon_url">
            <FormLabel>Icon Crypto</FormLabel>
            <Input type="text" {...register("icon_url")}/>
            <FormHelperText>Write the Icon crypto</FormHelperText>
          </FormControl>
          <Button alignSelf="flex-end" type="submit" isLoading={isSubmitting}>Save</Button>
      </Stack>
    </form>
  )
}

export default CoinForm;