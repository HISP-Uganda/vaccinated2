import { Flex, Text, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
const Contact = () => {
  const history = useHistory();
  return (
    <Flex alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" h="100%" direction="column">
      <Text fontSize="3xl">Thank you for submitting request</Text>
      <Button size="lg" onClick={() => history.push("/")}>Home</Button>
    </Flex>
  )
}

export default Contact
