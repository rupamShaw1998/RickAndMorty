import { Input, Stack, InputGroup, Box } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { BasicUserCard } from "./BasicUserCard";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { AlertComponent } from "./Alert";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export const Search = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceOnChange = React.useCallback(debounce(onChange, 400), []);

  const getData = (name) => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`
      )
      .then(({ data }) => {
        // console.log(data.results);
        setUser([...user, ...data.results]);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err.message);
        setError(err.message);
      });
  };
  function onChange(name) {
    // console.log("name", name);
    setError("");
    setPage(1);
    setUserName(name);
    if (name === "") {
      setUser([]);
    } else {
      getData(name);
    }
  }
  const onScrollEnd = () => {
    //console.log("page", page);
    setLoading(true);
    setTimeout(() => {
      setPage(page + 1);
      getData(userName);
    }, 1500);
  };
  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      onScrollEnd();
    }
  };

  return (
    <>
      <Box
        boxShadow="xs"
        rounded="md"
        bg="white"
        w="40%"
        mx="auto"
        position="relative"
        top={10}
      >
        <Stack spacing={4}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Search for Contact"
              onChange={(e) => debounceOnChange(e.target.value)}
            />
          </InputGroup>
          {error ? (
            <Box p={2}>
              <Alert status="info">
                <AlertIcon />
                There was an error processing your request.... Please type valid
                contact...Data gets Over For this contact
              </Alert>
            </Box>
          ) : user?.length === 0 ? (
            <Box p={2}>
              <Alert status="info">
                <AlertIcon />
                Type Something
              </Alert>
            </Box>
          ) : (
            <Box>
              {user.map((userone) => {
                return <BasicUserCard user={userone}></BasicUserCard>;
              })}
              {loading && <AlertComponent />}
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
};
