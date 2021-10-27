import {
  Box,
  Button,
  Flex,
  Heading,
  Input, Link, ListItem, Stack, Text, UnorderedList, VStack
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UpdateDetails from './UpdateDetails';

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
      params.append('identifier', nin);
      params.append('phone', phoneNumber);
      history.push({ pathname: '/generate', search: params.toString() })
    }
  }
  return (
    <Flex h="100%" direction={["column", "column", "row"]} p={["5", "5", "none"]}>
      <Box width={["100%", "100%", "70%"]} fontSize={["lg", "lg", "xl"]}>
        <Heading as="h4" size="lg" my={6}>Welcome to Uganda National COVID-19 Vaccination Certification Portal</Heading>
        <Box my={4} textAlign="justify">This Portal is Uganda's Official online public COVID-19 Vaccination Certificate and Verification Platform.</Box>
        <Box my={4} textAlign="justify">
          Once you complete your COVID-19 vaccine doses, the Uganda government will issue a Vaccination Certificate that will confirm that you have been inoculated. This is issued 14 days after the person receives his/her last dose. The certificate carries all the basic details of the beneficiary like name, age, gender, and also all the details of both vaccination doses i.e. date, batch number, vaccine, manufacturer, dose, vaccination site.
        </Box>
        <Box my={4} textAlign="justify">
          The COVID-19 Vaccination Certificate shall only be generated 14 days after the last dose of a vaccine i.e. second dose of the vaccine (if you are vaccinated by a two-dose vaccine) or first dose for a single dose vaccine. The 14 days requirement allows your body to complete the immune response.
        </Box>
        <Heading as="h4" size="lg" my={4}>How to generate your Certificate</Heading>

        <Box textAlign="justify">To generate your COVID-19 Vaccination Certificate, </Box>
        <UnorderedList spacing={3} pl={[2, 2, 7]}>
          <ListItem>
            <Text>Enter the Identification ID No you used during vaccination ( e.g. NIN or any other registered alternative ID you registered during COVID-19 vaccination e.g Passport Number, Employee ID, Driving Permit, Local Council ID, etc. as written on the Vaccination Card) and the last 6 digits of your registered phone number during vaccination.</Text>
          </ListItem>
          <ListItem>
            <Text>Once your vaccination record is verified meeting all the certification requirements, your certificate will be generated and downloadable as a PDF file that you can directly print or save as an electronic copy</Text>
          </ListItem>
          <ListItem>
            <Text>If your certificate is not generated, please note the messaging provided and complete the inquiry details, then epivac dedicated support team will get back to you within 24 hours. </Text>
          </ListItem>
        </UnorderedList>
        <Heading as="h5" size="lg" my={4}>Support</Heading>
        <Flex justifyContent={[null, null, "space-between"]} direction={["column", "column", "row"]}>
          <Flex direction="column"><Text>Contact the COVID-19 Vaccination Support team</Text> <Link color="teal.500" href="mailto: unepi@health.go.ug">unepi@health.go.ug</Link></Flex>
          <Flex direction="column"><Text>Call Center Toll Free Numbers:</Text> <Text color="teal.500">0800-230-033/0800-100-066/0800-303-033</Text></Flex>
        </Flex>
      </Box>
      <Stack flex={1} pl={["none", "none", "20"]} spacing="20px">
        <Heading color="red.600" fontSize="4xl" mt="20">Completed your doses?</Heading>
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

        <Stack h="400px" alignItems="center" alignContent="center" textAlign="center" justifyItems="center" justifyContent="center">
          <Box fontSize="xl" fontWeight="black">
            <Heading as="h1" color="red.600">UPDATING VITAL INFORMATION</Heading>
            <p>
              Incase any of your vital information (Date of Birth) is incorrect please Click here to request for update
            </p>
          </Box>
          <VStack><UpdateDetails /></VStack>
        </Stack>
      </Stack>


    </Flex>
  )
}

export default Home
