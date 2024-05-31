import { useEffect } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";

const Login = () => {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Error logging in:", error.message);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.100">
      <Box p={6} rounded="md" bg="white" boxShadow="lg">
        <Heading as="h1" size="xl" mb={4} textAlign="center">
          Welcome to Our App
        </Heading>
        <Text mb={6} textAlign="center">
          Please log in to continue
        </Text>
        <Button colorScheme="blue" onClick={handleLogin} width="full">
          Log in with Google
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;