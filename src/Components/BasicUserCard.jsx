import { Box } from "@chakra-ui/react";
import { Avatar, WrapItem, Text, Center, Circle } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spacer,
    Flex,
  } from "@chakra-ui/react";

export const BasicUserCard = (props) => {
  const { id, image, name, status, species } = props.user;
  const [user, setUser] = useState({});
  const [location, setLocation] = useState("");
  const [origin, setOrigin] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clickHandler = (id) => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(({data}) => {
      setUser(data);
      setLocation(data.location.name);
      setOrigin(data.origin.name);
    });
  }
  // console.log(user.location.name)

  return (
    <>
      <Box
        boxShadow="xs"
        p="6"
        rounded="md"
        bg="white"
        style={{ marginBottom: "10px" }}
        onClick={() => {
          onOpen();
          clickHandler(id);
        }}
      >
        <WrapItem>
          <Center>
            <Avatar name="Dan Abrahmov" src={image} mr={5} />
            <div style={{ width: "150px", textAlign: "left" }}>{name}</div>
            <Center>
              <div
                style={{
                  marginLeft: "40px",
                  width: "250px",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Circle
                  size="10px"
                  bg={status === "Alive" ? "green" : "grey"}
                  color="white"
                ></Circle>
                <div style={{ marginLeft: "40px", width: "100%" }}>
                  {status + "-" + species}
                </div>
              </div>
            </Center>
          </Center>
        </WrapItem>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={6}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "80%",
                  margin: "auto",
                }}
              >
                <WrapItem>
                  <Avatar size="xl" name="Christian Nwamba" src={user.image} />{" "}
                </WrapItem>
                <div
                  style={{
                    padding: "10px",
                    width: "60%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Text fontSize="2xl" style={{ fontWeight: "bold" }}>
                      {user.name}
                    </Text>

                    <div
                      style={{
                        padding: "10px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Circle
                        size="10px"
                        bg={user.status === "Alive" ? "green" : "grey"}
                        color="white"
                      ></Circle>
                      <Text ml="10px">
                        {user.status + " - " + user.species}
                      </Text>
                    </div>
                  </div>
                </div>
              </Box>
              <br />
              <hr />
              <br />

              <Box w="70%" mx="auto">
                <Flex>
                  <Box w="40%">
                    <Text>Gender</Text>
                    <Text fontSize="1xl" style={{ fontWeight: "bold" }}>
                      {user.gender}
                    </Text>
                  </Box>
                  <Spacer />
                  <Box w="50%">
                    <Text>Location</Text>
                    <Text fontSize='1xl' style={{fontWeight:'bold'}}>{location}</Text>
                  </Box>
                </Flex>
                <br />
                <Flex>
                  <Box w="50%">
                    <Text>Species</Text>
                    <Text fontSize="1xl" style={{ fontWeight: "bold" }}>
                      {user.species}
                    </Text>
                  </Box>
                  <Spacer />
                  <Box w="50%">
                    <Text>Origin</Text>
                    <Text fontSize='1xl' style={{fontWeight:'bold'}}>{origin}</Text>
                  </Box>
                </Flex>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
