import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { FC } from "react";
import mohImage from "../moh.png";
import sig from "../sig.png";
import { NAME_ATTRIBUTE, VACCINATION_CARD_NO, DOB_ATTRIBUTE } from "../Queries";

interface QR {
  data: any;
  certificate: string;
  doses: number;
}

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
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 10,
    textAlign: "center",
    color: "grey",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  pageBackground: {
    position: "absolute",
    marginLeft: "24.5%",
    marginTop: "10%",
    opacity: 0.2,
    zIndex: -1,
    height: 350,
    width: 350,
  },
  table: {
    display: "flex",
    flexDirection: "row",
    height: 200,
    marginHorizontal: "10px",
  },
});

export const MyDocument: FC<QR> = ({ data, certificate }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body} orientation="landscape">
        <View
          style={{
            width: "100%",
            height: "100%",
            border: "3px solid black",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Helvetica",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              border: "3px solid yellow",
            }}
          >
            <View
              style={{ width: "100%", height: "100%", border: "3px solid red" }}
            >
              <View style={styles.header}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center",
                    paddingHorizontal: "10px",
                  }}
                >
                  <View style={{ width: "20%" }}></View>
                  <View
                    style={{
                      width: "60%",
                      display: "flex",
                      alignSelf: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Image style={styles.image} src={mohImage} />
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: "12px",
                        letterSpacing: "5px",
                        marginVertical: 2,
                        fontFamily: "Times-Bold",
                      }}
                    >
                      Republic of Uganda
                    </Text>
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        marginBottom: "10px",
                        fontFamily: "Times-Bold",
                      }}
                    >
                      Ministry of Health
                    </Text>
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: "22px",
                        letterSpacing: "1px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Bold",
                      }}
                    >
                      COVID-19 VACCINATION CERTIFICATE
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "flex-end",
                      alignContent: "flex-end",
                      alignItems: "flex-end",
                      marginTop: "10px",
                      paddingRight: "20px",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Image
                          style={{ width: 120, height: 120 }}
                          src={data.qr}
                        />
                      </View>
                      <View>
                        <Text
                          style={{ fontFamily: "Times-Italic", color: "red" }}
                        >
                          {certificate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Text
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 30,
                    textAlign: "center",
                  }}
                >
                  This is to Certify that
                  <Text
                    style={{
                      fontWeight: "black",
                      textTransform: "uppercase",
                      fontFamily: "Helvetica-Bold",
                    }}
                  >
                    {" "}
                    {data[NAME_ATTRIBUTE]} ({data.id}){" "}
                  </Text>
                  born on{" "}
                  <Text
                    style={{
                      fontWeight: "black",
                      textTransform: "uppercase",
                      fontFamily: "Helvetica-Bold",
                    }}
                  >
                    {" "}
                    {new Date(data[DOB_ATTRIBUTE]).toDateString()}{" "}
                  </Text>{" "}
                  was{" "}
                  <Text
                    style={{
                      fontWeight: "black",
                      textTransform: "uppercase",
                      fontFamily: "Helvetica-Bold",
                    }}
                  >
                    {" "}
                    {data.type} vaccinated
                  </Text>{" "}
                  against COVID-19{" "}
                  <Text
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      fontFamily: "Times-Italic",
                    }}
                  >
                    (Card No. {data[VACCINATION_CARD_NO]})
                  </Text>{" "}
                  as shown below
                </Text>
              </View>
              <View
                style={{
                  height: "24px",
                  marginHorizontal: "10px",
                  backgroundColor: "#E2E8F0",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "2px",
                }}
              >
                <View style={{ width: "8%" }}></View>
                <View
                  style={{
                    width: "23%",
                    paddingLeft: "5px",
                    textAlign: "center",
                    marginLeft: "2px",
                    fontSize: "14px",
                  }}
                >
                  <Text>DOSE 01</Text>
                </View>
                <View
                  style={{
                    width: "23%",
                    paddingLeft: "5px",
                    textAlign: "center",
                    marginLeft: "2px",
                    fontSize: "14px",
                  }}
                >
                  <Text>DOSE 02</Text>
                </View>
                <View
                  style={{
                    width: "23%",
                    paddingLeft: "5px",
                    textAlign: "center",
                    marginLeft: "2px",
                    fontSize: "14px",
                  }}
                >
                  <Text>BOOSTER 01</Text>
                </View>
                <View
                  style={{
                    width: "23%",
                    paddingLeft: "5px",
                    textAlign: "center",
                    marginLeft: "2px",
                    fontSize: "14px",
                  }}
                >
                  <Text>BOOSTER 02</Text>
                </View>
              </View>
              <View style={styles.table}>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "8%",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #9CA3AF",
                      backgroundColor: "#E2E8F0",
                    }}
                  >
                    <View
                      style={{
                        fontSize: "12px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      <Text style={{ paddingLeft: "5px" }}>Date:</Text>
                    </View>
                    <View
                      style={{
                        fontSize: "12px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        Batch No:
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "12px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        Vaccine:
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "12px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        Mfg:
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "12px",
                        height: "30%",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        Facility:
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "12px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        District:
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "23%",
                      marginLeft: "2px",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #9CA3AF",
                    }}
                  >
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE1"]
                          ? new Intl.DateTimeFormat("fr").format(
                              Date.parse(data["DOSE1"].eventDate)
                            )
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE1"]?.Yp1F4txx8tm}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE1"]?.bbnyNYD1wgS}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE1"]?.rpkH9ZPGJcX}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "30%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE1"]?.orgUnitName}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE1"]?.districtName}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "23%",
                      paddingLeft: "5px",
                      marginLeft: "2px",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #9CA3AF",
                    }}
                  >
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE2"]
                          ? new Intl.DateTimeFormat("fr").format(
                              Date.parse(data["DOSE2"].eventDate)
                            )
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE2"]?.Yp1F4txx8tm}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE2"]?.bbnyNYD1wgS}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE2"]?.rpkH9ZPGJcX}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "30%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE2"]?.orgUnitName}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: "14px",
                        height: "14%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        {data["DOSE2"]?.districtName}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "23%",
                      paddingLeft: "5px",
                      marginLeft: "2px",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #9CA3AF",
                    }}
                  >
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER1"]
                        ? new Intl.DateTimeFormat("fr").format(
                            Date.parse(data["DOSE1"].eventDate)
                          )
                        : ""}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER1"]?.Yp1F4txx8tm}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER1"]?.bbnyNYD1wgS}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER1"]?.rpkH9ZPGJcX}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER1"]?.orgUnitName}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER1"]?.districtName}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "23%",
                      paddingLeft: "5px",
                      marginLeft: "2px",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #9CA3AF",
                    }}
                  >
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER2"]
                        ? new Intl.DateTimeFormat("fr").format(
                            Date.parse(data["DOSE1"].eventDate)
                          )
                        : ""}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER2"]?.Yp1F4txx8tm}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER2"]?.bbnyNYD1wgS}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER2"]?.rpkH9ZPGJcX}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER2"]?.orgUnitName}
                    </Text>
                    <Text style={{ fontSize: "14px", height: "16.66666667%" }}>
                      {data["BOOSTER2"]?.districtName}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Text
                  style={{ fontSize: "14px", fontFamily: "Helvetica-Bold" }}
                >
                  ISSUED AND APPROVED BY
                </Text>
                <Image style={{ height: 60 }} src={sig} />
                <Text
                  style={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    marginBottom: "25px",
                  }}
                >
                  DIRECTOR GENERAL OF HEALTH SERVICES, Ministry of Health
                </Text>
              </View>
              <Image src={mohImage} style={styles.pageBackground} />
              <View style={styles.pageNumber}>
                <Text style={{ width: "20%" }}></Text>
                <Text style={{ flex: 1, width: "60%" }}>
                  tel. +256-417-712-221 | email. ps@health.go.ug | website.
                  www.health.go.ug{" "}
                </Text>
                <Text style={{ width: "20%" }}>Version: COVICERT-003</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
