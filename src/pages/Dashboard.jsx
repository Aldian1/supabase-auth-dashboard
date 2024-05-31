import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setName(user?.user_metadata?.full_name || "");
    };

    fetchUser();
  }, []);

  const handleUpdateName = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    });
    if (error) console.error("Error updating name:", error.message);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.100">
      <Box p={6} rounded="md" bg="white" boxShadow="lg" width="400px">
        <Heading as="h1" size="xl" mb={4} textAlign="center">
          Dashboard
        </Heading>
        {user ? (
          <>
            <Text mb={4} textAlign="center">
              Welcome, {user.email}
            </Text>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb={4}
            />
            <Button colorScheme="blue" onClick={handleUpdateName} width="full">
              Update Name
            </Button>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </Flex>
  );
};

export default Dashboard;