import axios from 'axios';
import { fromPairs, max } from 'lodash';
import { useQuery } from "react-query";
import QRCode from 'qrcode';
import { parseISO, differenceInDays } from 'date-fns';

// Production
export const PROGRAM = 'yDuAzyqYABS';
export const ATTRIBUTE = 'sB1IHYu2xQT';
export const NAME_ATTRIBUTE = 'sB1IHYu2xQT';
export const NIN_ATTRIBUTE = 'Ewi7FUfcHAD';
export const PROGRAM_STAGE = 'a1jCssI2LkW';
export const OTHER_ID = 'YvnFn4IjKzx';
export const VACCINATION_CARD_NO = 'hDdStedsrHN';
export const SEX_ATTRIBUTE = 'FZzQbW8AWVd';
export const DOB_ATTRIBUTE = 'mAWcalQYYyk';
export const PHONE_ATTRIBUTE = 'ciCR6BBvIT4';
export const BATCH_ATTRIBUTE = 'Yp1F4txx8tm';
export const VACCINE_ATTRIBUTE = 'bbnyNYD1wgS';
export const MFG_ATTRIBUTE = 'rpkH9ZPGJcX';

export const api = axios.create({
  baseURL: 'https://epivac.health.go.ug/api/',
  timeout: 10000,
  auth: { username: 'admin', password: 'District#9' }
});

const processTrackedEntityInstances = async (trackedEntityInstances: any, byNIN: boolean = true) => {
  let results: any = {};
  const [{ attributes, enrollments, trackedEntityInstance }] = trackedEntityInstances;

  let processedAttributes = fromPairs(attributes.map((a: any) => [a.attribute, a.value]));

  if (byNIN) {
    processedAttributes = { ...processedAttributes, idLabel: 'NIN', idValue: processedAttributes[NIN_ATTRIBUTE] }
  } else {
    processedAttributes = { ...processedAttributes, idLabel: 'ID', idValue: processedAttributes[OTHER_ID] }
  }

  results = { attributes: processedAttributes, trackedEntityInstance };

  const programEnrollment = enrollments.find((en: any) => en.program === PROGRAM)
  if (programEnrollment) {
    const processedEvents = programEnrollment.events.filter((event: any) => !!event.eventDate && event.programStage === PROGRAM_STAGE).map(({ dataValues, ...others }: any) => {
      return { ...others, ...fromPairs(dataValues.map((dv: any) => [dv.dataElement, dv.value])) };
    });
    if (processedEvents.length >= 2) {
      results = { ...results, events: processedEvents }
      const lastDoseDate: string | undefined = max(processedEvents.map((ev: any) => ev.eventDate));
      if (!!lastDoseDate && differenceInDays(new Date(), parseISO(lastDoseDate)) >= 14) {
        const qr = await QRCode.toDataURL(`Name:${results.attributes[NAME_ATTRIBUTE]}\n${processedAttributes.idLabel}:${processedAttributes.idValue}\nSex:${results.attributes[SEX_ATTRIBUTE]}\nDOB:${results.attributes[DOB_ATTRIBUTE] || ' '}\nPHONE:${results.attributes[PHONE_ATTRIBUTE]}\n${processedEvents[0].bbnyNYD1wgS}:${new Intl.DateTimeFormat('fr').format(Date.parse(processedEvents[0].eventDate))},${processedEvents[0].orgUnitName}\n${processedEvents[1].bbnyNYD1wgS}:${new Intl.DateTimeFormat('fr').format(Date.parse(processedEvents[1].eventDate))},${processedEvents[1].orgUnitName}\n\nClick to verify\nhttps://epivac.health.go.ug/certificates/#/validate/${trackedEntityInstance}`, { margin: 0 });
        const { prints, id } = await getCertificateDetails(trackedEntityInstance);
        if (prints <= 5) {
          results = { ...results, eligible: true, qr, certificate: id };
        } else {
          results = { ...results, message: `Your have exceeded the numbers of downloads` }
        }

      } else if (!!lastDoseDate) {
        results = { ...results, message: `Your certificate is not yet ready please try again after ${14 - differenceInDays(new Date(), parseISO(lastDoseDate))} days` }
      }
    } else {
      results = { ...results, message: `Your may have not been fully vaccinated, current records show you have only received first dose.` }
    }
  }
  return results;
}


export function useInstance(tei: string, nin: string) {
  return useQuery<any, Error>(
    ['instance', tei],
    async () => {
      const params: any = {
        program: PROGRAM,
        attribute: ATTRIBUTE,
        fields: '*'
      }
      const { data: { attributes, enrollments } } = await api.get(`trackedEntityInstances/${tei}`, { params });
      const allAttributes = fromPairs(attributes.map((a: any) => [a.attribute, a.value]));
      const programEnrollment = enrollments.find((en: any) => en.program === PROGRAM);
      if (programEnrollment) {
        const processedEvents = programEnrollment.events.filter((event: any) => !!event.eventDate && event.programStage === PROGRAM_STAGE).map(({ dataValues, ...others }: any) => {
          return { ...others, ...fromPairs(dataValues.map((dv: any) => [dv.dataElement, dv.value])) };
        });
        return { ...allAttributes, ...processedEvents };
      }
    },
  );
}

export async function sendEmail(data:any){

  const email = axios.create({
    baseURL: 'https://api.mailjet.com/v3.1/',
    auth: { username: '02255d90a62b476dcb1129082cbc91be', password: '8c795fd335f2d3a4f230b6e3864ebc79' }
  });

  const payload = {
    "Messages":[
      {
        "From": {
          "Email": "colupot@hispuganda.org",
          "Name": "HISP Uganda"
        },
        "To": [
          {
            "Email": "unepi@health.go.ug",
            "Name": "UNEPI"
          }
        ],
        "Subject": "COVAX Certificate complaint",
        "TextPart": "This is a complaint from",
        "HTMLPart": `<b>Name</b>: <b>${data.fullName}</b><br/><b>Registration Id</b>:<b>${data.registrationId}</b> `,
        "CustomID": "AppGettingStartedTest"
      }
    ]
  }

  return await email.post('send', payload)
}

export function useTracker(nin: string | null, phone: string | null) {
  return useQuery<any, Error>(
    ['trackedEntityInstances', nin, phone],
    async () => {
      const params = [{
        name: 'program', value: PROGRAM,
      }, {
        name: 'filter', value: `${NIN_ATTRIBUTE}:EQ:${nin}`,
      }, {
        name: 'filter', value: `${PHONE_ATTRIBUTE}:LIKE:${phone}`,
      }, {
        name: 'fields', value: '*',
      }, {
        name: 'ouMode', value: 'ALL'
      }]

      const params1 = [{
        name: 'program', value: PROGRAM,
      }, {
        name: 'filter', value: `${OTHER_ID}:EQ:${nin}`,
      }, {
        name: 'filter', value: `${PHONE_ATTRIBUTE}:LIKE:${phone}`,
      }, {
        name: 'fields', value: '*',
      }, {
        name: 'ouMode', value: 'ALL'
      }]

      const p1 = params.map((x: any) => `${x.name}=${x.value}`).join('&');
      const p2 = params1.map((x: any) => `${x.name}=${x.value}`).join('&');

      const [{ data: { trackedEntityInstances } }, { data: { trackedEntityInstances: trackedEntityInstances1 } }] = await Promise.all([
        api.get(`trackedEntityInstances.json?${p1}`),
        api.get(`trackedEntityInstances.json?${p2}`)
      ]);

      let results = {};
      if (!!trackedEntityInstances && trackedEntityInstances.length > 0) {
        results = processTrackedEntityInstances(trackedEntityInstances);
      } else if (!!trackedEntityInstances1 && trackedEntityInstances1.length > 0) {
        results = processTrackedEntityInstances(trackedEntityInstances1, false)
      } else {
        results = { ...results, message: `No record with identifier ${nin} and phone number ending ${phone} was found` }
      }
      return results;
    },
  );
}


export async function getCertificateDetails(tei: string) {
  const { data } = await api.get('dataStore');

  if (data.indexOf("covid19-certificates") !== -1) {
    const { data } = await api.get("dataStore/covid19-certificates");
    if (data.indexOf(tei) !== -1) {
      let { data: details } = await api.get(`dataStore/covid19-certificates/${tei}`);
      details = { ...details, prints: details.prints + 1 };
      await api.put(`dataStore/covid19-certificates/${tei}`, details);
      return details;
    } else {
      const details = { id: Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000), prints: 1 }
      await api.post(`dataStore/covid19-certificates/${tei}`, details);
      return details;
    }
  } else {
    const details = { id: Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000), prints: 1 }
    await api.post(`dataStore/covid19-certificates/${tei}`, details);
    return details;
  }
}


export function useQRCode(text: string) {
  return useQuery<any, Error>(
    ['qr-code', text],
    async () => {
      return await QRCode.toDataURL(text, { margin: 0 })
    },
  );
}
