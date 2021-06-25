import { Box, Button, CircularProgress, Flex, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { PDFViewer } from '@react-pdf/renderer';
import { Field, Form, Formik } from 'formik';
import { FC } from 'react';
import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import * as Yup from 'yup';
import { sendEmail, useTracker } from '../Queries';
import { MyDocument } from './MyDocument';

export interface Contact {
  fullName: string;
  registrationId: string;
  secondDoseDate: string;
  secondDosePlace: string;
  cardNo: string;
  district: string;
  facility: string;
  email: string;
  phone: string;
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
  const initialValues: Contact = { fullName: '', registrationId: '', secondDoseDate: '', secondDosePlace: '', cardNo: '', district: '', facility: '', phone: '', email: '' };
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { error, isError, isLoading, isSuccess, data } = useTracker(params.get('nin'), params.get('phone'))
  const { mutate } = useMutation(sendEmail, {
  })
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
      {isSuccess && !data.eligible && <Flex direction="column">
        <Text fontSize={['xl', 'xl', '4xl']} color="red.400" mb={5}>{data.message}</Text>
        {data.vaccinations === 1 && <SimpleGrid columns={4} fontSize="xl">
          <Text fontWeight="bold">Current Vaccination Information</Text>
          <Flex>
            <Text fontWeight="bold">
              Vaccine:
            </Text>
            <Text pl="5px">
              {data.events[0].bbnyNYD1wgS}
            </Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold">
              Date:
            </Text>
            <Text pl="5px">
              {new Intl.DateTimeFormat('fr').format(Date.parse(data.events[0].eventDate))}
            </Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold">
              Facility:
            </Text>
            <Text pl="5px">
              {data.events[0].orgUnitName}
            </Text>
          </Flex>
        </SimpleGrid>}
        <Text fontSize={['lg', 'lg', '3xl']} fontWeight="bold" mb={5}>Please provide your details for follow up:</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={ContactSchema}
          onSubmit={async (values, actions) => {
            mutate(values);
            history.push('/contact');
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <SimpleGrid columns={1} gap="10px">
                <Field name="fullName">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.fullName && !!touched.fullName}>
                      <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="fullName">Full Name</FormLabel>
                      <Input size="lg" {...field} id="fullName" placeholder="Full Name" />
                      <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="registrationId">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.registrationId && !!touched.registrationId}>
                      <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="registrationId">Registration Id</FormLabel>
                      <Input size="lg" {...field} id="registrationId" placeholder="The ID used during vaccination" />
                      <FormErrorMessage>{errors.registrationId}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="cardNo">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.cardNo && !!touched.cardNo}>
                      <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="cardNo">Vaccination Card No</FormLabel>
                      <Input size="lg" {...field} id="cardNo" placeholder="Vaccination Card No" />
                      <FormErrorMessage>{errors.cardNo}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <SimpleGrid columns={2} gap="30px">
                  <Field name="secondDoseDate">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.secondDoseDate && !!touched.secondDoseDate}>
                        <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="secondDoseDate">Date of 2nd/Last Dose</FormLabel>
                        <Input size="lg" {...field} id="secondDoseDate" placeholder="Date of 2nd/Last Dose" />
                        <FormErrorMessage>{errors.secondDoseDate}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="secondDosePlace">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.secondDosePlace && !!touched.secondDosePlace}>
                        <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="secondDosePlace">Place of 2nd/Last Dose </FormLabel>
                        <Input size="lg" {...field} id="secondDosePlace" placeholder="Place 2nd/Last Dose" />
                        <FormErrorMessage>{errors.secondDosePlace}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>
                <SimpleGrid columns={2} gap="30px">
                  <Field name="district">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.district && !!touched.district}>
                        <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="district">District</FormLabel>
                        <Input size="lg" {...field} id="district" placeholder="District" />
                        <FormErrorMessage>{errors.district}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="facility">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.facility && !!touched.facility}>
                        <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="facility">Facility:</FormLabel>
                        <Input size="lg" {...field} id="facility" placeholder="Facility" />
                        <FormErrorMessage>{errors.facility}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>
                <SimpleGrid columns={2} gap="30px">
                  <Field name="email">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.email && !!touched.email}>
                        <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="email">Email:</FormLabel>
                        <Input size="lg" {...field} id="email" placeholder="Email" />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phone">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.phone && !!touched.phone}>
                        <FormLabel fontSize="2xl" fontWeight="bold" htmlFor="phone">Phone:</FormLabel>
                        <Input size="lg" {...field} id="phone" placeholder="Phone" />
                        <FormErrorMessage>{errors.phone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>
                <Box mt={4}>
                  <Button
                    fontSize="2xl"
                    size="lg"
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
      </Flex>}
      {isError && <Box>{error?.message}</Box>}
    </Flex>
  )
}

export default Certificates


