import { Box, Flex, Text } from "@chakra-ui/layout";
import { useParams } from "react-router-dom";
import { useInstance, VACCINATION_CARD_NO, NAME_ATTRIBUTE, OTHER_ID, NIN_ATTRIBUTE, DOB_ATTRIBUTE } from '../Queries';
import { SimpleGrid } from '@chakra-ui/react';

type ParamProps = {
  tei: string
}
const ValidateForces = () => {
  const { tei } = useParams<ParamProps>();
  const { isError, isSuccess, isLoading, data } = useInstance(tei, 'XXXX')
  return (
    <Flex
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      fontSize={["xl", "xl", "2xl"]}
      mt="5"
    >
      {isLoading && <Box>Validating...</Box>}
      {isSuccess && !!data && (
        <Flex direction="column">
          <Flex direction="column">
            <Text bg="yellow.300">Personal Details</Text>
            <Flex
              justifyContent="space-between"
              direction={["column", "column", "row"]}
            >
              <Text fontWeight="bold">Full Name:</Text>
              <Text pl={[null, null, "10px"]}>{data[NAME_ATTRIBUTE]}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              direction={["column", "column", "row"]}
            >
              <Text fontWeight="bold">Vaccination Card No:</Text>
              <Text pl={[null, null, "10px"]}>{data[VACCINATION_CARD_NO]}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              direction={["column", "column", "row"]}
            >
              <Text fontWeight="bold">Registration ID:</Text>
              <Text pl={[null, null, "10px"]}>
                {data[NIN_ATTRIBUTE] || data[OTHER_ID]}
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              direction={["column", "column", "row"]}
            >
              <Text fontWeight="bold">Date of Birth:</Text>
              <Text pl={[null, null, "10px"]}>
                {data[DOB_ATTRIBUTE] || data[OTHER_ID]}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" mt="10">
            <Text bg="yellow.300" mb="10px">
              Vaccination Details
            </Text>
            <SimpleGrid columns={[1, 1, 2]} spacing="10">
              {!!data.DOSE1 && (
                <Flex direction="column" border="1px solid gray" p="5px">
                  <Text bg="gray.200">Dose1</Text>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Date:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {new Intl.DateTimeFormat("fr").format(
                        Date.parse(data.DOSE1.eventDate)
                      )}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Batch No:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE1.Yp1F4txx8tm}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Vaccine:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE1.bbnyNYD1wgS}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">MFG:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE1.rpkH9ZPGJcX}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Facility:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE1.orgUnitName}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">District:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE1.districtName}
                    </Text>
                  </Flex>
                </Flex>
              )}
              {!!data.DOSE2 && (
                <Flex direction="column" border="1px solid gray" p="5px">
                  <Text bg="gray.200">Dose2</Text>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Date:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {new Intl.DateTimeFormat("fr").format(
                        Date.parse(data.DOSE2.eventDate)
                      )}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Batch No:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE2.Yp1F4txx8tm}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Vaccine:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE2.bbnyNYD1wgS}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">MFG:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE2.rpkH9ZPGJcX}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Facility:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE2.orgUnitName}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">District:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.DOSE2.districtName}
                    </Text>
                  </Flex>
                </Flex>
              )}

              {!!data.BOOSTER1 && (
                <Flex direction="column" border="1px solid gray" p="5px">
                  <Text bg="gray.200">Booster 1</Text>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Date:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {new Intl.DateTimeFormat("fr").format(
                        Date.parse(data.BOOSTER1.eventDate)
                      )}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Batch No:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER1.Yp1F4txx8tm}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Vaccine:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER1.bbnyNYD1wgS}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">MFG:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER1.rpkH9ZPGJcX}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Facility:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER1.orgUnitName}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">District:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER1.districtName}
                    </Text>
                  </Flex>
                </Flex>
              )}
              {!!data.BOOSTER2 && (
                <Flex direction="column" border="1px solid gray" p="5px">
                  <Text bg="gray.200">Booster 2</Text>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Date:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {new Intl.DateTimeFormat("fr").format(
                        Date.parse(data.BOOSTER2.eventDate)
                      )}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Batch No:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER2.Yp1F4txx8tm}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Vaccine:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER2.bbnyNYD1wgS}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">MFG:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER2.rpkH9ZPGJcX}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">Facility:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER2.orgUnitName}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Text fontWeight="bold">District:</Text>
                    <Text pl={[null, null, "10px"]}>
                      {data.BOOSTER2.districtName}
                    </Text>
                  </Flex>
                </Flex>
              )}
            </SimpleGrid>
          </Flex>
        </Flex>
      )}
      {isError && <Box>Certificate is invalid</Box>}
    </Flex>
  );
}

export default ValidateForces
