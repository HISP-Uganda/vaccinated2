import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { PDFViewer } from '@react-pdf/renderer';
import { Field, Form, Formik } from 'formik';
import { FC } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as Yup from 'yup';
import { useTracker } from '../Queries';
import { MyDocument } from './MyDocument';

interface Contact {
  fullName: string;
  registrationId: string;
  secondDoseDate: string;
  secondDosePlace: string;
}
interface TerminologyProps {
}

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  registrationId: Yup.string().required('Required'),
  secondDoseDate: Yup.string().required('Required'),
  secondDosePlace: Yup.string().required('Required'),
});

const Certificates: FC<TerminologyProps> = () => {
  const history = useHistory();
  const initialValues: Contact = { fullName: '', registrationId: '', secondDoseDate: '', secondDosePlace: '' };

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { error, isError, isLoading, isSuccess, data } = useTracker(params.get('nin'), params.get('phone'))
  return (
    <Flex alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" h="100%">
      {isLoading && <Box fontSize="4xl">Loading</Box>}
      {isSuccess && data.eligible && <Flex direction="column">
        <Button>Back</Button>
        <PDFViewer width="100%" height="100%">
          <MyDocument data={data.qr} trackedEntityInstance={data.trackedEntityInstance} attributeData={data.attributes} eventData={data.events} />
        </PDFViewer>
      </Flex>}
      {isSuccess && !data.eligible && <Box>
        <Text fontSize="2xl">{data.message}</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={ContactSchema}
          onSubmit={async (values, actions) => {
            console.log(values);
            history.push('/contact');
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <SimpleGrid columns={1} gap="10px">
                <Field name="fullName">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.fullName && !!touched.fullName}>
                      <FormLabel htmlFor="fullName">Full Name</FormLabel>
                      <Input {...field} id="fullName" placeholder="Full Name" />
                      <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="registrationId">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.registrationId && !!touched.registrationId}>
                      <FormLabel htmlFor="registrationId">Registration Id</FormLabel>
                      <Input {...field} id="registrationId" placeholder="Registration Id" />
                      <FormErrorMessage>{errors.registrationId}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="secondDoseDate">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.secondDoseDate && !!touched.secondDoseDate}>
                      <FormLabel htmlFor="secondDoseDate">Second Dose Place</FormLabel>
                      <Input {...field} id="secondDoseDate" placeholder="Second Dose Date" />
                      <FormErrorMessage>{errors.secondDoseDate}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="secondDosePlace">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.secondDosePlace && !!touched.secondDosePlace}>
                      <FormLabel htmlFor="secondDosePlace">Second Dose Place</FormLabel>
                      <Input {...field} id="secondDosePlace" placeholder="Second Dose Place" />
                      <FormErrorMessage>{errors.secondDosePlace}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Box mt={4}>
                  <Button
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </SimpleGrid>
            </Form>
          )}
        </Formik>
        {/* <Stack spacing="20px">
          <Heading color="blackAlpha.500">Contact Us</Heading>
          <Stack direction="column">
            <Box fontSize="xl" fontWeight="black">Full Name:</Box>
            <Input border="2px" borderColor="blue.100" placeholder="Enter Your Full Name" onChange={onChange} value={nin} size="lg" />
          </Stack>
          <Stack direction="column">
            <Box fontSize="xl" fontWeight="black">Registered ID:</Box>
            <Input border="2px" borderColor="blue.100" placeholder="Enter Registration ID" onChange={onChange} value={nin} size="lg" />
          </Stack>
          <Stack>
            <Box fontSize="xl" fontWeight="black">Date of Second Dose</Box>
            <Input border="2px" borderColor="blue.100" placeholder="Date of Second Dose" onChange={onChange1} value={phoneNumber} size="lg" />
          </Stack>
          <Stack>
            <Box fontSize="xl" fontWeight="black">Place of Second Dose</Box>
            <Input border="2px" borderColor="blue.100" placeholder="Place of Second Dose" onChange={onChange1} value={phoneNumber} size="lg" />
          </Stack>
          <Box><Button size="lg" bg="blue.600" color="white" textTransform="uppercase" onClick={submit}>Submit</Button></Box>
        </Stack> */}
      </Box>}
      {isError && <Box>{error?.message}</Box>}
    </Flex>
  )
}

export default Certificates


