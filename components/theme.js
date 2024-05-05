import { extendTheme } from "@chakra-ui/react";
import { } from '@chakra-ui/react'
const input = {}

export const theme = extendTheme({
  direction: "rtl",
  colors: {
    white: 'RGBA(0, 0, 0, 0.03)',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true, // set to true to use the system color mode
  },
})

