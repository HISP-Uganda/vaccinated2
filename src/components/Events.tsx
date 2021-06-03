import { FC } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

interface TableProps {
  data: any;
}

const Events: FC<TableProps> = ({ data }) => {
  return (
    <Table variant="unstyled">
      <Thead>
        <Tr>
          <Th border="1px solid black">Date</Th>
          <Th border="1px solid black">Batch No.</Th>
          <Th border="1px solid black">Vaccine Given</Th>
          <Th border="1px solid black">Dose</Th>
          <Th border="1px solid black">Manufacturer</Th>
          <Th border="1px solid black">Vaccination Site</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data && data.length > 0 ?
          data.map((event: any) => <Tr key={event.event}>
            <Td border="1px solid black">{new Intl.DateTimeFormat('fr').format(Date.parse(event.eventDate))}</Td>
            <Td border="1px solid black">{event.Yp1F4txx8tm}</Td>
            <Td border="1px solid black">{event.bbnyNYD1wgS}</Td>
            <Td border="1px solid black">{event.LUIsbsm3okG}</Td>
            <Td border="1px solid black">{event.rpkH9ZPGJcX}</Td>
            <Td border="1px solid black">{event.orgUnitName}</Td>
          </Tr>)
          : <Tr>
            <Td textAlign="center" colSpan={5}>No Vaccinations done</Td>
          </Tr>}
      </Tbody>
    </Table>
  )
}

export default Events
