import { Box, Button, Flex, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import QrCode from "qrcode.react";
import { FC, PureComponent, useRef } from "react";
import ReactToPrint from "react-to-print";
import mohImage from '../moh.png';
import { VACCINATION_CARD_NO } from "../Queries";
// import Signature from '../signature.png';
import Attribute from "./Attribute";
import Events from "./Events";

interface InstanceProps {
  attributeData: any;
  eventData: any;
  trackedEntityInstance: string
}

class Instance extends PureComponent<InstanceProps> {
  render() {
    const { attributeData, eventData, trackedEntityInstance } = this.props;
    return <Flex
      direction="column"
      p="50px"
      pt="10px"
      fontFamily='"Times New Roman", Georgia, Serif'
      mt="10px"
    >
      <SimpleGrid columns={3}>
        <Box><Text fontSize="20px" fontStyle="italic">Certificate No: <Text color="red" fontWeight="extrabold">{Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000)}</Text></Text></Box>
        <VStack>
          <Image src={mohImage} alt="Ministry of Health" boxSize="120px" />
          <Text textTransform="uppercase" color="#9a9b9e" fontSize="16">The Republic of Uganda</Text>
          <Text textTransform="uppercase">Ministry of Health</Text>
          <Text>Vaccines and Immunization Division</Text>

        </VStack>

        <Box textAlign="right">
          <Text fontSize="20px" fontStyle="italic">Vaccination Card No: <Text color="red">{attributeData[VACCINATION_CARD_NO]}</Text></Text>
        </Box>

      </SimpleGrid>
      <VStack spacing="20px" className="certificate">
        <Text mt="30px" fontWeight="extrabold" fontSize="30px">COVID-19 VACCINATION CERTIFICATE</Text>
        <Attribute data={attributeData} />
        <Events data={eventData} />
      </VStack>
      <Box mt="30px">
        <SimpleGrid columns={2}>
          <VStack textAlign="left">
            <Text textTransform="uppercase">Issued and Approved by</Text>
            {/* <Image src={Signature} alt="Ministry of Health" /> */}
            <Box h="10px" />
            <Text fontStyle="italic" textTransform="uppercase">Director General of Health Services</Text>
            <Text textTransform="uppercase" fontWeight="bold">Minister of Health</Text>
          </VStack>
          <VStack>
            <QrCode
              value={`https://epivac.health.go.ug/certificates/validate/${trackedEntityInstance}`}
              style={{
                width: 160,
                height: 160,
                marginTop: 5,
                marginBottom: 5,
              }}
              renderAs="svg"
            />
          </VStack>
        </SimpleGrid>
      </Box>
      <HStack left="30" bottom="2" position="absolute">
        <Text>t. +256-417-712323 | </Text>
        <Text>f. +256-417-712323 | </Text>
        <Text>e. epivac@health.go.ug | </Text>
        <Text>w. www.health.go.ug </Text>
      </HStack>
    </Flex>;
  }
}

const TrackedEntityInstance: FC<InstanceProps> = ({ eventData, attributeData, trackedEntityInstance }) => {
  const componentRef: any = useRef();
  return (
    <Box>
      <Instance ref={componentRef} eventData={eventData} attributeData={attributeData} trackedEntityInstance={trackedEntityInstance} />
      <ReactToPrint
        trigger={() => (
          <Box right="20" top="100" position="absolute">
            <Button>PRINT CERTIFICATE</Button>
          </Box>
        )}
        content={() => componentRef.current}
      />
    </Box>

  )
}

export default TrackedEntityInstance
