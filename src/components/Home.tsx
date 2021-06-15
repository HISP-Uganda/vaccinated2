import { Box, Button, Flex, Heading, Input, Stack, VStack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const [nin, setNin] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNin(e.target.value);
  }

  const onChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  }

  const search = () => {
    if (!!nin && !!phoneNumber) {
      const params = new URLSearchParams();
      params.append('nin', nin);
      params.append('phone', phoneNumber);
      history.push({ pathname: '/generate', search: params.toString() })
    }
  }
  return (
    <Flex h="100%">
      <Box width="70%" textAlign="justify">
        <Heading as="h1" my={6}>Welcome to National COVID-19 Vaccination Certification Portal </Heading>
        <Box my={4} fontSize="2xl">This Portal is Uganda's Official online public COVID-19 Vaccination Certificate Generation and Verification Platform</Box>
        <Box my={4} fontSize="2xl">
          The COVID-19 Vaccination Certificate shall only be generated after the second dose of the vaccine (if you are vaccinated by a two-dose vaccine).
          You will be considered fully vaccinated after the second dose of the vaccine and may be able to generate your COVID-19 Vaccination certificate.
        </Box>
        <Box my={4} fontSize="2xl">
          Please note that a person is considered vaccinated 14 days after the 2nd dose of the vaccine as the body needs some time to complete the immune response. However, you will receive the certificate from the date of the second dose.
        </Box>

        <Box my={8} fontSize="2xl">
          To generate your COVID-19 Vaccination Certificate, submit your National ID Number (NIN).
          A one-time authentication code will be sent to your registered phone number as SMS Text message. Submit the code to generate your certificate. Once generated, you can save the certificate as PDF file or send to your specified email address..
        </Box>
      </Box>
      <Stack flex={1} pl="20" spacing="20px" justifyContent="center">
        <Heading color="red.600" fontSize="4xl">Completed your doses?</Heading>
        <Heading color="blackAlpha.500">Get Your Certificate Now</Heading>
        <Stack direction="column">
          <Box fontSize="xl" fontWeight="black">Registered ID</Box>
          <Input border="4px" borderColor="blue.100" placeholder="Enter Registration ID" onChange={onChange} value={nin} size="lg" />
        </Stack>
        <Stack>
          <Box fontSize="xl" fontWeight="black">Last 6 digits of your registered phone number</Box>
          <Input border="4px" borderColor="blue.100" placeholder="Last Six(6) digits of your phone" onChange={onChange1} value={phoneNumber} size="lg" />
        </Stack>
        <VStack><Button size="lg" bg="blue.600" color="white" textTransform="uppercase" onClick={search}>Generate Certificate</Button></VStack>
      </Stack>
    </Flex>
  )
}

export default Home
