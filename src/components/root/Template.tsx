import { Box } from "@chakra-ui/react";
import { ReactChild } from "react";

function Template(props: { children: ReactChild }) {
  return (
    <Box minHeight="100vh" backgroundColor="#eee">
      <Box maxW={1400} padding={25} margin="0 auto">
        {props.children}
      </Box>
    </Box>
  );
}

export default Template;
