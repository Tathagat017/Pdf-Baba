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

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { login } from "../Redux/authReducer/actions";

const Login = () => {
  const { isAuth } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    console.log(credentials);
  };

  const handleLogin = (e) => {
    console.log(credentials.username, credentials.password);
    dispatch(login(credentials.username, credentials.password));
    console.log("afet", isAuth);
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("#212323e0", "orange.200")}
      style={{
        background: "#94e9f4f6",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 4px )",
        "-webkitBackdropFilter": "blur( 4px )",
        borderRadius: "10px",
        border: " 1px solid rgba( 255, 255, 255, 0.18 )",
        backgroundImage: "url(./KTe5.gif)",
        backgroundRepeat: "no-repeat", // Prevent image from repeating
        backgroundSize: "100% 100%", // Cover the entire container
        backgroundPosition: "center",
      }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("#cbfcff69", "gray.700")}
          boxShadow={"lg"}
          p={8}
          style={{
            background: "#8bc2f5",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 4px )",
            "-webkitBackdropFilter": "blur( 4px )",
            borderRadius: "10px",
            border: " 1px solid rgba( 255, 255, 255, 0.18 )",
            color: "black",
          }}
        >
          <Stack spacing={4} color={"black"}>
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
              <Button variant={"link"} color={"blackAlpha.500"}>
                <Link to="/register">Not Registered? Sign up here </Link>
              </Button>
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
