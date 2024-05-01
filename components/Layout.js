// pages/_app.js or a specific page like pages/index.js
import { HStack } from "@chakra-ui/react";
import HeaderMenuComponent from "./MenuComponent";

export default function Layout({ children }) {
  return (
    <>
      <HeaderMenuComponent />
      <HStack>{children}</HStack>
    </>
  );
}
