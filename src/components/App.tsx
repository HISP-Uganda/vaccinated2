import { Box, Flex, Image, Stack, Link, Spacer } from "@chakra-ui/react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Link as Linker 
} from "react-router-dom";
import mohImage from '../moh.png';
import Certificates from './Certificates';
import Home from "./Home";
import Validate from "./Validate";
import Contact from './Contact';

const App = () => (
  <Router>
    <Flex w="100vw" h="100vh" direction="column">
      <Link as={Linker} to="/" _hover={{border:"none"}}>
        <Stack px={[1, 1, 20]} direction="row" bg="blue.800" py={1} alignContent="center" alignItems="center" textColor="white" fontSize={['md','md','4xl']} spacing="30px">
          <Image src={mohImage} alt="Ministry of Health" boxSize="65px" />
          <Box fontWeight="bold">Ministry of Health Uganda</Box>
        </Stack>
      </Link>
      <Box px={[1, 1, 20]} flex={1} height="500px" overflow="auto">
        <Switch>
          <Route path="/validate/:tei" exact>
            <Validate />
          </Route>
          <Route path="/generate" exact>
            <Certificates />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Box>
      <Flex h="48px" bg="gray.100" justifyContent="center" alignContent="center" alignItems="center" justifyItems="center" p={5}>
        <Box>© {new Date().getFullYear()} Copyright: Ministry of Health Uganda - COVID-19 Response Team</Box><Spacer/><Box>Designed by <Link color="teal.500" href="https://hispuganda.org/">HISP Uganda </Link></Box>
      </Flex>
    </Flex>
  </Router>
);

export default App;
