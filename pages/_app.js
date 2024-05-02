import "@/styles/globals.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { LayoutTree } from "@moxy/next-layout";
import { Fonts } from "@/public/globals"
import { setupAxios } from "@/config/api";
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';
import { SWRConfig } from "swr";
import axios from "axios";
import { SidebarProvider } from "@/context/SidebarContext";
import { theme } from "@/components/theme";
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function App({ Component, pageProps }) {
  setupAxios()
  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <ChakraProvider theme={theme}>
        <SWRConfig
          value={{ fetcher: url => axios.get(url).then(res => res.data) }}>
          <SidebarProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Fonts />
            <LayoutTree Component={Component} pageProps={pageProps} />
            <ProgressBar
              height="2.5px"
              color="#5941A9"
              options={{ showSpinner: false }}
              shallowRouting
            />
          </SidebarProvider>
        </SWRConfig>
      </ChakraProvider>
    </QueryParamProvider>
  );
}
