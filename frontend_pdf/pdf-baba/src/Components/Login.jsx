import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    console.log(credentials);
  };

  const handleLogin = (e) => {};

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("#cff1f7e1", "orange.200")}
      style={{
        background: "#94e9f4f6",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 4px )",
        "-webkitBackdropFilter": "blur( 4px )",
        borderRadius: "10px",
        border: " 1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("#cbfcff69", "gray.700")}
          boxShadow={"lg"}
          p={8}
          style={{
            background: "#c6f4e0",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 4px )",
            "-webkitBackdropFilter": "blur( 4px )",
            borderRadius: "10px",
            border: " 1px solid rgba( 255, 255, 255, 0.18 )",
          }}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blackAlpha.700"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"aliceblue"}
                color={"blackAlpha.800"}
                variant={"ghost"}
                _hover={{
                  bg: "pink.300",
                  variant: "solid",
                  borderRadius: 35,
                  w: "30%",
                }}
                onClick={(e) => handleLogin(e)}
                w={"40%"}
                m="auto"
                cursor-colorScheme="blue"
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
