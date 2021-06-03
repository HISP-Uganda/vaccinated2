import { Box, Flex } from "@chakra-ui/layout";
import { useParams } from "react-router-dom";
import { useInstance } from "../Queries";

type ParamProps = {
  tei: string
}
const Validate = () => {
  const { tei } = useParams<ParamProps>();
  const { isError, isSuccess, isLoading, data } = useInstance(tei, 'XXXX')
  return (
    <Flex alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" h="100%" fontSize="4xl">
      {isLoading && <Box>Validating...</Box>}
      {isSuccess && !!data && <Box>Certificate is valid</Box>}
      {isError && <Box>Certificate is invalid</Box>}
    </Flex>
  )
}

export default Validate
