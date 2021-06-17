import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, Text, CircularProgress } from '@chakra-ui/react';
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
      {isLoading && <Box fontSize="4xl">
        <CircularProgress isIndeterminate color="blue.700" />
      </Box>}
      {isSuccess && data.eligible && <Flex direction="column" width="100%" height="100%">
        <Button onClick={() => history.push("/")}>Back</Button>
        <PDFViewer width="100%" height="100%">
          <MyDocument data={data.qr} trackedEntityInstance={data.trackedEntityInstance} attributeData={data.attributes} eventData={data.events} certificate={data.certificate} />
        </PDFViewer>
      </Flex>}
      {isSuccess && !data.eligible && <Box>
        <Text fontSize="3xl" mb={5}>{data.message}</Text>
        <Text fontSize="4xl" mb={5}>Contact Us</Text>
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
                      <FormLabel htmlFor="secondDoseDate">Second Dose Date</FormLabel>
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
      </Box>}
      {isError && <Box>{error?.message}</Box>}
    </Flex>
  )
}

export default Certificates


