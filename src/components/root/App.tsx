import React from "react";
import { Grid, GridItem, Link } from "@chakra-ui/react";
import { Link as RRLink } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Grid templateColumns="repeat(3, 1fr)" minH="100vh">
        <GridItem
          bg="#417D7A"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link as={RRLink} color="white" to="/barcode">
            <Heading>Barcode Detection</Heading>
          </Link>
        </GridItem>
        <GridItem
          bg="#1D5C63"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link as={RRLink} color="white" to="/battery">
            <Heading>Battery</Heading>
          </Link>
        </GridItem>
        <GridItem
          bg="#1A3C40"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link as={RRLink} color="white" to="/background">
            <Heading>Background Tasks</Heading>
          </Link>
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
