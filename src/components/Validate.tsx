import { Box, Flex } from "@chakra-ui/layout";
import { useParams } from "react-router-dom";
import {
  useInstance
} from "../Queries";
import ValidationResult from "./ValidationResult";

type ParamProps = {
  tei: string;
};
const ValidateForces = () => {
  const { tei } = useParams<ParamProps>();
  const { isError, isSuccess, isLoading, data } = useInstance(tei);
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
      {isSuccess && !!data && <ValidationResult data={data} />}
      {isError && <Box>Certificate is invalid</Box>}
    </Flex>
  );
};

export default ValidateForces;
