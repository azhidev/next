import { Stack, Text, Button, FormControl, Input, FormLabel, FormErrorMessage, useToast, HStack, VStack, Icon, Image } from "@chakra-ui/react"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from "next/router"
import axios from "axios"
import useMutation from 'swr/mutation'
import { FiCheckCircle } from "react-icons/fi"
import { SiBeats } from "react-icons/si"

const loginSchema = yup.object({
  username: yup.string().required("لطفا نام کاربری را وارد نمایید"),
  password: yup.string().required("لطفا رمز عبور را وارد نمایید")
})

const loginFetcher = (url, { arg }) => axios.post(url, arg)
function Login() {

  const toast = useToast({ status: 'success', duration: 3000, icon: <FiCheckCircle />, position: 'bottom-left' })
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, }, setError, clearErrors } = useForm({ resolver: yupResolver(loginSchema) })
  const { trigger: login, isLoading } = useMutation(`/users/login`, loginFetcher, {
    onSuccess: (data) => {
      localStorage.setItem("access_token_sim", data?.data?.access_token)
      toast({ description: 'ورود' })
      router.replace(`/`)
    },
    onError: () => {
      toast({ description: 'اطلاعات وارد شده اشتباه است', status: 'error' })
    }
  })
  const onSubmit = (data) => {
    login(data)
  }
  return (
    <HStack dir={'rtl'} as='main' h='calc(100vh)' spacing={0}>
      <VStack flexGrow={1} h='full' bg='white' p={0} justify='center' >
        <Stack w='sm' spacing={12} mt={-20}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6} p={4}>
              <Stack>
                <Text fontWeight='bold' fontSize='2xl'>ورود به سامانه</Text>
                <Text textColor='gray.500' fontSize='sm'>خوش آمدید، لطفا اطلاعات خود را وارد نمایید</Text>
              </Stack>
              <FormControl isInvalid={errors?.username}>
                <FormLabel>نام کاربری</FormLabel>
                <Input dir='ltr' size='lg' {...register("username")} type='text' />
                {errors?.username?.message && <FormErrorMessage mt={0}>{errors?.username?.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={errors?.password}>
                <FormLabel>رمز عبور</FormLabel>
                <Input dir='ltr' size='lg'{...register("password")} type='password' />
                {errors?.password?.message && <FormErrorMessage mt={0}>{errors?.password?.message}</FormErrorMessage>}
              </FormControl>
              <Button width={"30%"} type="submit" size='md' isLoading={isLoading}>ورود</Button>
            </Stack>
          </form>
          
          <HStack>
            <Icon textColor='blue.600' fontSize='5xl' as={SiBeats} />
            <Stack spacing={0}>
              <Text fontSize='lg' fontWeight='bold'>سامانه</Text>
              <Text fontSize='sm' textColor='gray.500'></Text>
            </Stack>
          </HStack>

        </Stack>
      </VStack>
      <VStack display={{ sm: 'none', lg: 'flex' }} w='60%' h='full' justify='center' align='center' p={12} bgGradient='linear(to-br, blue.500, blue.700)'>
        <Image w='3xl' src='/login-bg.svg' />
      </VStack>
    </HStack>

  )
}

export default Login