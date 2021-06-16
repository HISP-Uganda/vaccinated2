import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import mohImage from '../moh.png';
import Certificates from './Certificates';
import Home from "./Home";
import Validate from "./Validate";

const App = () => (
  <Router>
    <Flex w="100vw" h="100vh" direction="column">
      <Stack px={[1, 1, 20]} direction="row" bg="blue.800" py={1} alignContent="center" alignItems="center" textColor="white" fontSize="4xl" spacing="30px">
        <Image src={mohImage} alt="Ministry of Health" boxSize="65px" />
        <Box>Ministry of Health</Box>
      </Stack>
      <Box px={[1, 1, 20]} flex={1}>
        <Switch>
          <Route path="/validate/:tei" exact>
            <Validate />
          </Route>
          <Route path="/generate" exact>
            <Certificates />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Box>
      <Flex h="48px" bg="gray.100" justifyContent="center" alignContent="center" alignItems="center" justifyItems="center">
        © {new Date().getFullYear()} Copyright: Ministry of Health Uganda - COVID-19 Response Team
      </Flex>
    </Flex>
  </Router>
);

export default App;
