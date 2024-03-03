import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { LayoutTree } from "@moxy/next-layout";
import { Fonts } from "@/public/globals"
import { setupAxios } from "@/layout/api";
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';
import { SWRConfig } from "swr";
import axios from "axios";

export default function App({ Component, pageProps }) {
  setupAxios()
  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <ChakraProvider>
        <SWRConfig
          value={{ fetcher: url => axios.get(url).then(res => res.data) }}>
          <Fonts />
          <LayoutTree Component={Component} pageProps={pageProps} />
        </SWRConfig>
      </ChakraProvider>
    </QueryParamProvider>
  );
}
