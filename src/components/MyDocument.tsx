import {
  Document,
  Image, Page,
  StyleSheet, Text,
  View
} from '@react-pdf/renderer';
import { FC } from 'react';
import mohImage from '../moh.png';
import sig from '../sig.png';
import { NAME_ATTRIBUTE, VACCINATION_CARD_NO } from '../Queries';

interface QR {
  data: any,
  attributeData: any;
  eventData: any;
  trackedEntityInstance: string;
  certificate: string;
}

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
  header: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    textAlign: 'center',
    color: 'grey',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  pageBackground: {
    position: 'absolute',
    marginLeft: '24.5%',
    marginTop: '10%',
    opacity: 0.2,
    zIndex: -1,
    height: 350,
    width: 350,
  },
  table: { display: 'flex', flexDirection: 'row', height: 170, marginHorizontal: '10px' },
});

// Create Document Component
export const MyDocument: FC<QR> = ({ data, eventData, attributeData, certificate }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body} orientation="landscape">
        <View style={{
          width: '100%', height: '100%', border: '3px solid black',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Helvetica'
        }}>
          <View style={{ width: '100%', height: '100%', border: '3px solid yellow' }}>
            <View style={{ width: '100%', height: '100%', border: '3px solid red' }}>
              <View style={styles.header}>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignContent: 'center', alignItems: 'center', paddingHorizontal: '10px' }}>
                  <View style={{ width: '30%' }}>
                    <Text>Certificate No:</Text>
                    <Text style={{ fontFamily: 'Times-Italic', color: 'red' }}>{certificate}</Text>
                  </View>
                  <View style={{ width: '40%', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={styles.image}
                      src={mohImage}
                    />
                  </View>
                  <View style={{ width: '30%', textAlign: 'right' }}>
                    <View>
                      <Text>Card No:</Text>
                      <Text style={{ fontFamily: 'Times-Italic', color: 'red' }}>{attributeData[VACCINATION_CARD_NO]}</Text>
                    </View>
                  </View>
                </View>
                {/* <View style={{ backgroundColor: 'red' }}> */}

                <Text style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '5px', marginVertical: 2, fontFamily: 'Times-Bold' }}>Republic of Uganda</Text>
                <Text style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', marginBottom: '30px', fontFamily: 'Times-Bold' }}> Ministry of Health</Text>
                <Text style={{ textTransform: 'uppercase', fontSize: '22px', letterSpacing: '1px', fontWeight: 'extrabold', fontFamily: 'Times-Bold' }}>COVID-19 VACCINATION CERTIFICATE</Text>
                {/* </View> */}
                <Text style={{ margin: 30, textAlign: 'center' }}>
                  This is to Certify that
                  <Text style={{ fontWeight: 'black', textTransform: 'uppercase', fontFamily: 'Helvetica-Bold' }}> {attributeData[NAME_ATTRIBUTE]} ({attributeData.idValue}) </Text>
                  was vaccinated against COVID-19 as shown below
                </Text>
              </View>
              <View style={styles.table}>
                <View style={{ width: '70%', display: 'flex', flexDirection: 'row' }}>
                  <View style={{ width: '49%', display: 'flex', flexDirection: 'column', border: '1px solid #9CA3AF' }}>
                    <View style={{ backgroundColor: '#9CA3AF' }}>
                      <Text style={{ textTransform: 'uppercase', fontSize: '32px', color: 'white', textAlign: 'center' }}>Dose 01</Text>
                    </View>
                    <View style={{ display: 'flex', padding: 10 }}>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Date:</Text>
                        <Text>{new Intl.DateTimeFormat('fr').format(Date.parse(eventData[0].eventDate))}</Text>
                      </View>

                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Batch No:</Text>
                        <Text>{eventData[0].Yp1F4txx8tm}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Vaccine:</Text>
                        <Text>{eventData[0].bbnyNYD1wgS}</Text>
                      </View>

                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Text>MFG:</Text>
                        <Text style={{}}>{eventData[0].rpkH9ZPGJcX}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Facility:</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>{eventData[0].orgUnitName}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text >District:</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>{eventData[0].district}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ width: '49%', display: 'flex', flexDirection: 'column', border: '1px solid #9CA3AF' }}>
                    <View style={{ backgroundColor: '#9CA3AF' }}>
                      <Text style={{ textTransform: 'uppercase', fontSize: '32px', color: 'white', textAlign: 'center' }}>Dose 02</Text>
                    </View>
                    <View style={{ display: 'flex', padding: 10 }}>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Date:</Text>
                        <Text>{new Intl.DateTimeFormat('fr').format(Date.parse(eventData[1].eventDate))}</Text>
                      </View>

                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Batch No:</Text>
                        <Text>{eventData[1].Yp1F4txx8tm}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Vaccine:</Text>
                        <Text>{eventData[1].bbnyNYD1wgS}</Text>
                      </View>

                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Text>MFG:</Text>
                        <Text style={{}}>{eventData[1].rpkH9ZPGJcX}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text >Facility:</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>{eventData[1].orgUnitName}</Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text >District:</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>{eventData[1].district}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    style={{ width: 150, height: 150 }}
                    src={data}
                  />
                </View>
              </View>

              <View style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                <Text style={{ fontSize: '14px', fontFamily: 'Helvetica-Bold' }}>ISSUED AND APPROVED BY</Text>
                <Image
                  style={{ height: 60 }}
                  src={sig}
                />
                <Text style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '25px' }}>DIRECTOR GENERAL OF HEALTH SERVICES, Ministry of Health</Text>
              </View>
              <Image src={mohImage} style={styles.pageBackground} />

              <View
                style={{ ...styles.pageNumber }}
              >
                <Text>tel. +256-417-712-221 | email. ps@health.go.ug | website. www.health.go.ug </Text>
              </View>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  )
};
