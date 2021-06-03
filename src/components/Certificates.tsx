import { Box,Flex } from '@chakra-ui/react';
import { PDFViewer } from '@react-pdf/renderer';
import { FC } from 'react';
import { useLocation } from 'react-router';
import { useTracker } from '../Queries';
import { MyDocument } from './MyDocument';
interface TerminologyProps {
}
const Certificates: FC<TerminologyProps> = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const { error, isError, isLoading, isSuccess, data } = useTracker(params.get('nin'), params.get('phone'))
  return (
    <Flex alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" h="100%">
      {isLoading && <Box fontSize="4xl">Loading</Box>}
      {isSuccess && data.eligible && <PDFViewer width="100%" height="100%">
        <MyDocument data={data.qr} trackedEntityInstance={data.trackedEntityInstance} attributeData={data.attributes} eventData={data.events} />
      </PDFViewer>}
      {isSuccess && !data.eligible && <Box  fontSize="4xl">No certificate or not eligible for certificate</Box>}
      {isError && <Box>{error?.message}</Box>}
    </Flex>
  )
}

export default Certificates


