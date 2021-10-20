import { Box, Button, CircularProgress, Flex, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { PDFViewer } from '@react-pdf/renderer';
import { Field, Form, Formik } from 'formik';
import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
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
  const [fileName, setFileName] = useState<string>('');
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const initialValues: Contact = { fullName: '', registrationId: '', secondDoseDate: '', secondDosePlace: '', cardNo: '', district: '', facility: '', phone: '', email: '' };
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { error, isError, isLoading, isSuccess, data } = useTracker(params.get('identifier'), params.get('phone'));

  const onDrop = useCallback((acceptedFiles: any[]) => {
    if (acceptedFiles.length > 0) {
      const names = acceptedFiles.map((f: any) => f.name);
      setFileName(names.join('\n'))
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 3, accept: ".png, .svg, .jpg, .jpeg, .pdf" });
  const { mutate } = useMutation(sendEmail, {
  })
  return (
    <Flex alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" h="100%">
      {isLoading && <Box fontSize="4xl">
        <CircularProgress isIndeterminate color="blue.700" />
      </Box>}
      {isSuccess && data.eligible && <Flex direction="column" width="100%" height="100%">
        <Button onClick={() => history.push("/armed-forces")}>Back</Button>
        <PDFViewer width="100%" height="100%">
          <MyDocument data={data} certificate={data.certificate} />
        </PDFViewer>
      </Flex>}
      {isSuccess && !data.eligible && <Flex direction="column">
        <Text fontSize={['xl', 'xl', '2xl']} color="red.400" mb={5}>{data.message}</Text>
        {!!data.DOSE1 && <SimpleGrid columns={4} fontSize="xl">
          <Text fontWeight="bold">Current Vaccination Information</Text>
          <Flex>
            <Text fontWeight="bold">
              Vaccine:
            </Text>
            <Text pl="5px">
              {data.DOSE1.bbnyNYD1wgS}
            </Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold">
              Date:
            </Text>
            <Text pl="5px">
              {new Intl.DateTimeFormat('fr').format(Date.parse(data.DOSE1.eventDate))}
            </Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold">
              Facility:
            </Text>
            <Text pl="5px">
              {data.DOSE1.orgUnitName}
            </Text>
          </Flex>
        </SimpleGrid>}
        <Button size="lg" cursor="pointer" color="teal" fontSize={['lg', 'lg', '2xl']} fontWeight="bold" mb={5} onClick={() => setDisplayForm(!displayForm)}>Please click here to provide your details for follow up</Button>
        {displayForm && <Formik
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
                      <FormLabel fontSize="xl" fontWeight="bold" htmlFor="fullName">Full Name</FormLabel>
                      <Input size="md" {...field} id="fullName" placeholder="Full Name" />
                      <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="registrationId">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.registrationId && !!touched.registrationId}>
                      <FormLabel fontSize="xl" fontWeight="bold" htmlFor="registrationId">Registration Id</FormLabel>
                      <Input size="md" {...field} id="registrationId" placeholder="The ID used during vaccination" />
                      <FormErrorMessage>{errors.registrationId}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="cardNo">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.cardNo && !!touched.cardNo}>
                      <FormLabel fontSize="xl" fontWeight="bold" htmlFor="cardNo">Vaccination Card No</FormLabel>
                      <Input size="md" {...field} id="cardNo" placeholder="Vaccination Card No" />
                      <FormErrorMessage>{errors.cardNo}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <SimpleGrid columns={2} gap="30px">
                  <Field name="secondDoseDate">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.secondDoseDate && !!touched.secondDoseDate}>
                        <FormLabel fontSize="xl" fontWeight="bold" htmlFor="secondDoseDate">Date of 2nd/Last Dose</FormLabel>
                        <Input size="md" {...field} id="secondDoseDate" placeholder="Date of 2nd/Last Dose" />
                        <FormErrorMessage>{errors.secondDoseDate}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="secondDosePlace">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.secondDosePlace && !!touched.secondDosePlace}>
                        <FormLabel fontSize="xl" fontWeight="bold" htmlFor="secondDosePlace">Place of 2nd/Last Dose </FormLabel>
                        <Input size="md" {...field} id="secondDosePlace" placeholder="Place 2nd/Last Dose" />
                        <FormErrorMessage>{errors.secondDosePlace}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>
                <SimpleGrid columns={2} gap="30px">
                  <Field name="district">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.district && !!touched.district}>
                        <FormLabel fontSize="xl" fontWeight="bold" htmlFor="district">District</FormLabel>
                        <Input size="md" {...field} id="district" placeholder="District" />
                        <FormErrorMessage>{errors.district}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="facility">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.facility && !!touched.facility}>
                        <FormLabel fontSize="xl" fontWeight="bold" htmlFor="facility">Facility:</FormLabel>
                        <Input size="md" {...field} id="facility" placeholder="Facility" />
                        <FormErrorMessage>{errors.facility}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>
                <SimpleGrid columns={2} gap="30px">
                  <Field name="email">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.email && !!touched.email}>
                        <FormLabel fontSize="xl" fontWeight="bold" htmlFor="email">Email:</FormLabel>
                        <Input size="md" {...field} id="email" placeholder="Email" />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phone">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.phone && !!touched.phone}>
                        <FormLabel fontSize="xl" fontWeight="bold" htmlFor="phone">Phone:</FormLabel>
                        <Input size="md" {...field} id="phone" placeholder="Phone" />
                        <FormErrorMessage>{errors.phone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>
                <Stack spacing="5">
                  <Box>{fileName}</Box>
                  <Box {...getRootProps()} h="100px">
                    <input {...getInputProps()} />
                    {
                      isDragActive ? <p>Drop images of vaccination card/identifications document files here ...</p> : <p>Drag 'n' drop images of vaccination card/identification documents files here, or click to select files</p>
                    }
                  </Box>
                </Stack>
                <Box mt={4}>
                  <Button
                    fontSize="xl"
                    size="md"
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
        </Formik>}
      </Flex>}
      {isError && <Box>{error?.message}</Box>}
    </Flex>
  )
}

export default Certificates


