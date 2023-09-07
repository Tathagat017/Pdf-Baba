import React, { useState, useEffect } from "react";
import axios from "axios";
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
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  let url = "http://127.0.0.1:8000/user/register/";
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    console.log(credentials);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let user = {
      username: credentials.username,
      password: credentials.password,
    };
    try {
      const res = await axios.post(url, user);
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("#cff1f7e1", "orange.200")}
      style={{
        background: "#1c1d1ef6",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 4px )",
        "-webkitBackdropFilter": "blur( 4px )",
        borderRadius: "10px",
        border: " 1px solid rgba( 255, 255, 255, 0.18 )",
        backgroundImage: "url(./KTe6.gif)",
        backgroundRepeat: "no-repeat", // Prevent image from repeating
        backgroundSize: "200% 100%", // Cover the entire container
        backgroundPosition: "center",
      }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} color={"aliceblue"}>
            Register New Account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("#7ab8ffaf", "gray.700")}
          boxShadow={"lg"}
          p={8}
          style={{
            background: "#92c4fe",
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
              <Button variant={"link"} color={"blackAlpha.500"}>
                <Link to="/login">Already Registered? login here </Link>
              </Button>
              <Button
                bg={"aliceblue"}
                color={"blackAlpha.800"}
                variant={"ghost"}
                _hover={{
                  bg: "whatsapp.300",
                  variant: "solid",
                  borderRadius: 35,
                  w: "30%",
                }}
                onClick={(e) => handleRegister(e)}
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

export default Register;
