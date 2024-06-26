import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Flex, HStack, Icon, IconButton, Stack, Switch, Text } from '@chakra-ui/react';
import { RxCross1, RxGear, RxHamburgerMenu } from "react-icons/rx";
import { ResizableBox } from 'react-resizable';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ImExit } from 'react-icons/im';
import { LiaSmsSolid } from "react-icons/lia";
import { useSidebar } from '@/context/SidebarContext';
import { Progress } from '@chakra-ui/react'
import { jwtDecode } from 'jwt-decode';
import { FiPieChart } from "react-icons/fi";
import { useColorMode } from '@chakra-ui/color-mode'
import settings from '@/utils/settings';
import { FaRegMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

const navItems = [
  { id: 1, label: "محصولات", icon: RxDashboard, href: "/products", permissionLevel: 'regular' },
  { id: 2, label: "آمار و نمودار", icon: FiPieChart, href: "/statistics", permissionLevel: 'regular' },
  { id: 3, label: "تنظیمات", icon: RxGear, href: "/settings", permissionLevel: 'regular' },
];

const Layout = ({ children }) => {
  const router = useRouter()
  const panelName = settings.panelName

  const [user, setUser] = useState("")
  const [progress, setProgress] = useState(0);

  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { colorMode, toggleColorMode } = useColorMode()


  // useEffect(() => {
  //   router.events.on("routeChangeStart", () => {
  //     setProgress(40);
  //   });
  //   router.events.on("routeChangeComplete", () => {
  //     setProgress(100);
  //     setTimeout(() => setProgress(0), 400)
  //   });
  // }, []);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setUser({ "username": jwtDecode(localStorage.getItem("access_token")).sub, "role": jwtDecode(localStorage.getItem("access_token")).role })
    }
  }, [])

  const renderNavItems = () => {
    return navItems.map((item) => (
      user?.role != "admin" && item.permissionLevel == "admin" ?
        <Box
          key={item.id}
          position="relative"
          cursor="no-drop"
        >
          <Flex align="center" p={4}>
            <Icon zIndex={2} as={item.icon} w={6} h={6} />
            {sidebarOpen && <Text minW={'120px'} zIndex={2} ps={5}>{item.label}</Text>}
          </Flex>
        </Box>
        :
        <Link href={item.href} >
          <Box
            key={item.id}
            position="relative"
            cursor="pointer"
            sx={{
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'green.100',
                left: '100%',
                top: 0,
                transition: 'left 0.2s ease-out',
              },
              '&:hover::before': {
                left: 0,
              },
            }}
          >
            <Flex align="center" p={4}>
              <Icon zIndex={2} as={item.icon} w={6} h={6} />
              {sidebarOpen && <Text minW={'120px'} zIndex={2} ps={5}>{item.label}</Text>}
            </Flex>
          </Box>
        </Link>
    ));
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const exitHandler = () => {
    localStorage.removeItem("access_token");
    router.replace("/user/login");
  };
  const isDark = colorMode === 'dark';

  return (
    <Box height={'100vh'} dir='rtl'>
      <Flex as="header" height={'60px'} borderBottom={'1px'} borderColor={'gray.300'}  p="2" justifyContent="space-between" alignItems="center">
        <HStack>
          <IconButton
            fontWeight={'800'}
            fontSize={'x-large'}
            variant={"ghost"}
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            icon={sidebarOpen ? <RxCross1 /> : <RxHamburgerMenu />}
          />
          <Link href={'/'}> <Text fontWeight={'600'} fontSize={'x-large'} >{panelName}</Text></Link>
        </HStack>
        <HStack>
          <Text>{user?.username}</Text>
          <IconButton
            aria-label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
            icon={colorMode === 'dark' ? <FaSun /> : <FaRegMoon />}
            onClick={toggleColorMode}
            isRound={true}
            size="md"
            fontSize="md"
            transition="all 0.2s"
            _hover={{
              transform: 'rotate(20deg)',
              transition: 'all 0.2s',
            }}
          />
          <IconButton variant={"ghost"} fontSize={"30px"} icon={<ImExit />} onClick={exitHandler} />
        </HStack>
      </Flex>
      {/* <Flex overflowY={'auto'} sx={{ '::-webkit-scrollbar': { display: 'none' }, 'scrollbar-width': 'none', '-ms-overflow-style': 'none' }} height={"calc(100vh - 60px)"} >
        <ResizableBox style={{ transition: 'width 0.2s ease' }} width={sidebarOpen ? 200 : 60} minConstraints={[50, 300]} maxConstraints={[300, 300]}>
          <Stack position={'fixed'} gap={0} minH={'100%'} borderLeft={'1px'} borderColor={'gray.300'}>
            {renderNavItems()}
          </Stack>
        </ResizableBox>
        <Container pb={10} maxW={'8xl'} >
          {children}
        </Container>
      </Flex> */}
      <HStack align='start'>
        <Stack width={sidebarOpen ? '200px' : '60px'} gap={0} borderLeft={'1px'} height={"calc(100vh - 60px)"} borderColor={'gray.200'} style={{ transition: '0.3s ease' }} pos='fixed'>
          {renderNavItems()}
        </Stack>
        <Stack pb={10} w={"full"} style={{ marginRight: sidebarOpen ? 200 : 60, transition: 'margin-right 0.3s ease' }} overflowY={'scroll'} sx={{ '::-webkit-scrollbar': { display: 'none' }, 'scrollbar-width': 'none', '-ms-overflow-style': 'none' }} height={"calc(100vh - 60px)"}>
          <Stack mx='auto' maxW={{ base: '2xl', md: '4xl', xl: '6xl', '2xl': '8xl' }} w='full'>
            {children}
          </Stack>
        </Stack>
      </HStack>
    </Box>
  );
};
export default Layout;