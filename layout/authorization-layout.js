import { HStack, Stack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


export const AuthorizationLayout = ({ children, ...props }) => {
  const toast = useToast()
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("access")
    if (!token) {
      toast({ title: 'خطا', description: 'لطفا وارد شوید', variant: 'subtle', status: 'error', duration: 3000, position: 'bottom-left' })
      router.replace(`/user/login?${router.asPath}`)
    }
  }, [router])
  return (
      <HStack h='calc(100vh)' spacing={0}>
        <Stack as='main' w='calc(100%)' h='full' p={0}>
          {children}
        </Stack>
      </HStack>
  )
}