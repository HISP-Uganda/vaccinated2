import { Box, Flex, Text } from "@chakra-ui/layout";
import { useParams } from "react-router-dom";
import { useInstance, VACCINATION_CARD_NO, NAME_ATTRIBUTE, OTHER_ID, NIN_ATTRIBUTE } from '../Queries';
import { SimpleGrid } from '@chakra-ui/react';

type ParamProps = {
  tei: string
}
const Validate = () => {
  const { tei } = useParams<ParamProps>();
  const { isError, isSuccess, isLoading, data } = useInstance(tei, 'XXXX')
  return (
    <Flex alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" h="100%" fontSize="4xl">
      {isLoading && <Box>Validating...</Box>}
      {isSuccess && !!data && <Flex direction="column">
        <Flex direction="column">
          <Text bg="yellow.300">Personal Details</Text>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Full Name:</Text>
            <Text pl="10px">{data[NAME_ATTRIBUTE]}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Vaccination Card No:</Text>
            <Text pl="10px">{data[VACCINATION_CARD_NO]}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Registration ID:</Text>
            <Text pl="10px">{data[NIN_ATTRIBUTE] || data[OTHER_ID]}</Text>
          </Flex>
          {/* <Flex justifyContent="space-between">
            <Text>Certificate No:</Text>
            <Text pl="10px">CHarles Olupot</Text>
          </Flex> */}
        </Flex>
        <Flex direction="column" mt="10">
          <Text bg="yellow.300" mb="10px">Vaccination Details</Text>
          <SimpleGrid columns={2} spacing="10">
            <Flex direction="column" border="1px solid gray" p="5px">
              <Text bg="gray.200">Dose1</Text>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Date:</Text>
                <Text pl="10px">{new Intl.DateTimeFormat('fr').format(Date.parse(data["0"].eventDate))}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Batch No:</Text>
                <Text pl="10px">{data["0"].Yp1F4txx8tm}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Vaccine:</Text>
                <Text pl="10px">{data["0"].bbnyNYD1wgS}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">MFG:</Text>
                <Text pl="10px">{data["0"].rpkH9ZPGJcX}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Facility:</Text>
                <Text pl="10px">{data["0"].orgUnitName}</Text>
              </Flex>
            </Flex>
            <Flex direction="column" border="1px solid gray" p="5px">
              <Text bg="gray.200">Dose2</Text>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Date:</Text>
                <Text pl="10px">{new Intl.DateTimeFormat('fr').format(Date.parse(data["1"].eventDate))}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Batch No:</Text>
                <Text pl="10px">{data["1"].Yp1F4txx8tm}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Vaccine:</Text>
                <Text pl="10px">{data["1"].bbnyNYD1wgS}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">MFG:</Text>
                <Text pl="10px">{data["1"].rpkH9ZPGJcX}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Facility:</Text>
                <Text pl="10px">{data["1"].orgUnitName}</Text>
              </Flex>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Flex>}
      {isError && <Box>Certificate is invalid</Box>}
    </Flex>
  )
}

export default Validate
