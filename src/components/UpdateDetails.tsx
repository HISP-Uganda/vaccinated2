import {
  Box,
  Button, Flex, FormControl,
  FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField,
  NumberInputStepper, SimpleGrid, Spacer, Stack, Text, useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns'
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { updateBirthDay } from '../Queries';

export interface VaccinationDetails {
  identifier: string;
  phone: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  birthYear: Yup.string().required('Required'),
  birthMonth: Yup.string().required('Required'),
  birthDay: Yup.string().required('Required'),
});

const maxDays: any = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
}

const UpdateDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { mutateAsync } = useMutation(updateBirthDay, {
  });

  const handleSubmit = async (values: VaccinationDetails) => {
    try {
      const dob = format(new Date(parseInt(values.birthYear, 10), parseInt(values.birthMonth, 10) - 1, parseInt(values.birthDay, 10)), 'yyyy-MM-dd');
      const { epivac } = await mutateAsync({ dob, identifier: values.identifier });
      if (epivac) {
        const params = new URLSearchParams();
        params.append('identifier', values.identifier);
        params.append('phone', values.phone);
        history.push({ pathname: '/generate', search: params.toString() })
      }
    } catch (error) {
      console.log(error)
    }
  };
  const formik = useFormik({
    initialValues: { identifier: '', birthYear: '1980', birthMonth: '', birthDay: '', phone: '' },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <Flex direction="row">
        <Text></Text>
        <Spacer />
        <Button size="lg" bg="green.700" color="white" textTransform="uppercase" onClick={onOpen}>UPDATING VITAL INFORMATION</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Birth Date Update</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="10">
            <form onSubmit={formik.handleSubmit}>
              <SimpleGrid columns={1} gap="10px">
                <FormControl isInvalid={!!formik.errors.identifier && !!formik.touched.identifier}>
                  <FormLabel fontSize="xl" fontWeight="bold" htmlFor="identifier">Registration ID</FormLabel>
                  <Input
                    size="md"
                    id="identifier"
                    placeholder="Registration Id"
                    value={formik.values.identifier}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.identifier}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!formik.errors.phone && !!formik.touched.phone}>
                  <FormLabel fontSize="xl" fontWeight="bold" htmlFor="phone">Last 6 digits of your registered phone number</FormLabel>
                  <Input
                    size="md"
                    id="phone"
                    placeholder="Phone Number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                </FormControl>
                <Stack>

                  <Text fontSize="xl" fontWeight="bold">Date of Birth</Text>

                  <Stack direction="row">
                    <FormControl isInvalid={!!formik.errors.birthYear && !!formik.touched.birthYear}>
                      <FormLabel fontSize="lg" htmlFor="birthYear">Year</FormLabel>
                      <NumberInput
                        min={1900}
                        max={2018}
                        size="md"
                        id="birthYear"
                        value={formik.values.birthYear}
                        onChange={(valueAsString) => { formik.setFieldValue('birthYear', valueAsString); }}
                        onBlur={formik.handleBlur}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{formik.errors.birthYear}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.birthMonth && !!formik.touched.birthMonth}>
                      <FormLabel fontSize="lg" htmlFor="birthMonth">Month</FormLabel>
                      <NumberInput
                        min={1}
                        max={12}
                        size="md"
                        id="birthMonth"
                        value={formik.values.birthMonth}
                        onChange={(valueAsString) => { formik.setFieldValue('birthMonth', valueAsString); }}
                        onBlur={formik.handleBlur}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{formik.errors.birthMonth}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.birthDay && !!formik.touched.birthDay}>
                      <FormLabel fontSize="lg" htmlFor="birthDay">Day</FormLabel>
                      <NumberInput
                        min={1}
                        max={maxDays[formik.values.birthMonth]}
                        size="md"
                        id="birthMonth"
                        value={formik.values.birthDay}
                        onChange={(valueAsString) => { formik.setFieldValue('birthDay', valueAsString); }}
                        onBlur={formik.handleBlur}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{formik.errors.birthDay}</FormErrorMessage>
                    </FormControl>
                  </Stack>
                </Stack>
                <Box mt={4}>
                  <Button
                    fontSize="xl"
                    size="md"
                    colorScheme="teal"
                    // isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </SimpleGrid>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>

  )
}

export default UpdateDetails
