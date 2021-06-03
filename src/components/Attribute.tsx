import { Flex, Text } from '@chakra-ui/react';
import { FC } from "react";
import { NAME_ATTRIBUTE, NIN_ATTRIBUTE } from "../Queries";

interface AttributeProps {
data:any
}
const Attribute: FC<AttributeProps> = ({ data }) => {
  return (
    <Flex my="10px" fontSize="22px" textAlign="center">
      <Text>This is to Certify that <span style={{ fontWeight: 'bolder' }}>{data[NAME_ATTRIBUTE]} ({data[NIN_ATTRIBUTE]})</span> was vaccinated against COVID-19 as shown below</Text>
    </Flex>

  )
}

export default Attribute
