import { Flex, Text } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/react";
import {
  DOB_ATTRIBUTE,
  NAME_ATTRIBUTE,
  NIN_ATTRIBUTE,
  OTHER_ID,
  VACCINATION_CARD_NO,
} from "../Queries";

type ValidationResultProps = {
  data: any;
};
const ValidationResult = ({ data }: ValidationResultProps) => {
  const attributes =
    data["DOSE1"] || data["DOSE2"] || data["BOOSTER1"] || data["BOOSTER2"];
  return (
    <Flex direction="column">
      {!!attributes ? (
        <>
          <Flex direction="column">
            <Text bg="yellow.300">Personal Details</Text>
            <Flex
              justifyContent="space-between"
              direction={["column", "column", "row"]}
            >
              <Text fontWeight="bold">Full Name:</Text>
              <Text pl={[null, null, "10px"]}>
                {attributes[NAME_ATTRIBUTE]}
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              direction={["column", "column", "row"]}
            >
              <Text fontWeight="bold">Vaccination Card No:</Text>
              <Text pl={[null, null, "10px"]}>
                {attributes[VACCINATION_CARD_NO]}
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              direction={["column", "column", "row"]}
            >
              <Text fontWeight="bold">Registration ID:</Text>
              <Text pl={[null, null, "10px"]}>
                {attributes[NIN_ATTRIBUTE] || attributes[OTHER_ID]}
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              direction={["column", "column", "row"]}
            >
              <Text fontWeight="bold">Date of Birth:</Text>
              <Text pl={[null, null, "10px"]}>
                {attributes[DOB_ATTRIBUTE] || attributes[OTHER_ID]}
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
                        Date.parse(data.DOSE1.event_execution_date)
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
                    <Text pl={[null, null, "10px"]}>{data.DOSE1.name}</Text>
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
                        Date.parse(data.DOSE2.event_execution_date)
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
                    <Text pl={[null, null, "10px"]}>{data.DOSE2.name}</Text>
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
                        Date.parse(data.BOOSTER1.event_execution_date)
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
                    <Text pl={[null, null, "10px"]}>{data.BOOSTER1.name}</Text>
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
                        Date.parse(data.BOOSTER2.event_execution_date)
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
                    <Text pl={[null, null, "10px"]}>{data.BOOSTER2.name}</Text>
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
        </>
      ) : (
        <Text color="red">
          Your vaccination certificate may not be valid, we could not find any
          records matching your details
        </Text>
      )}
    </Flex>
  );
};

export default ValidationResult;
