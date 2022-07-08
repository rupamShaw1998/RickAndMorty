import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from "@chakra-ui/react";
  export const AlertComponent = () => {
    return (
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Wait For More Contacts
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Thanks for your patience. 
        </AlertDescription>
      </Alert>
    );
  };