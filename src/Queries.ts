import axios from 'axios';
import { fromPairs } from 'lodash';
import { useQuery } from "react-query";
import QRCode from 'qrcode'

// Production
export const PROGRAM = 'yDuAzyqYABS';
export const ATTRIBUTE = 'sB1IHYu2xQT';
export const NAME_ATTRIBUTE = 'sB1IHYu2xQT';
export const NIN_ATTRIBUTE = 'Ewi7FUfcHAD';
export const PROGRAM_STAGE = 'a1jCssI2LkW';
export const OTHER_ID = 'YvnFn4IjKzx';
export const VACCINATION_CARD_NO = 'hDdStedsrHN';
const SEX_ATTRIBUTE = 'FZzQbW8AWVd';
const DOB_ATTRIBUTE = 'mAWcalQYYyk';
const PHONE_ATTRIBUTE = 'ciCR6BBvIT4';
// Localhost
// export const PROGRAM = 'IpHINAT79UW';
// export const ATTRIBUTE = 'TfdH5KvFmMy';
// export const NAME_ATTRIBUTE = 'w75KJ2mc4zz';
// export const PROGRAM_STAGE = 'A03MvHHogjR';


export const api = axios.create({
  baseURL: 'https://epivac.health.go.ug/api/',
  timeout: 10000,
  auth: { username: 'admin', password: 'District#9' }
});

const processTrackedEntityInstances = async (trackedEntityInstances: any) => {
  let results: any = {};
  const [{ attributes, enrollments, trackedEntityInstance }] = trackedEntityInstances;

  results = { attributes: fromPairs(attributes.map((a: any) => [a.attribute, a.value])), trackedEntityInstance };


  const programEnrollment = enrollments.find((en: any) => en.program === PROGRAM)
  if (programEnrollment) {
    const processedEvents = programEnrollment.events.filter((event: any) => !!event.eventDate && event.programStage === PROGRAM_STAGE).map(({ dataValues, ...others }: any) => {
      return { ...others, ...fromPairs(dataValues.map((dv: any) => [dv.dataElement, dv.value])) }
    });
    results = { ...results, events: processedEvents }

    const qr = await QRCode.toDataURL(`Name:${results.attributes[NAME_ATTRIBUTE]}\nNIN:${results.attributes[NIN_ATTRIBUTE]}\nSex:${results.attributes[SEX_ATTRIBUTE]}\nDOB:${results.attributes[DOB_ATTRIBUTE]}\nPHONE:${results.attributes[PHONE_ATTRIBUTE]}\n${processedEvents[0].bbnyNYD1wgS}:${new Intl.DateTimeFormat('fr').format(Date.parse(processedEvents[0].eventDate))},${processedEvents[0].orgUnitName}\n${processedEvents[1].bbnyNYD1wgS}:${new Intl.DateTimeFormat('fr').format(Date.parse(processedEvents[1].eventDate))},${processedEvents[1].orgUnitName}\n\nClick to verify\nhttps://epivac.health.go.ug/certificates/#/validate/${trackedEntityInstance}`, { margin: 0 });

    if (processedEvents.length >= 2) {
      results = { ...results, eligible: true, qr }
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
        attribute: ATTRIBUTE
      }
      const { data: { attributes } } = await api.get(`trackedEntityInstances/${tei}`, { params });
      // const allAttributes = fromPairs(attributes.map((a: any) => [a.attribute, a.value]));
      return attributes.length > 0;
    },
  );
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
        results = processTrackedEntityInstances(trackedEntityInstances)
      } else if (!!trackedEntityInstances1 && trackedEntityInstances1.length > 0) {
        results = processTrackedEntityInstances(trackedEntityInstances1)
      }
      return results;
    },
  );
}


export function useQRCode(text: string) {
  return useQuery<any, Error>(
    ['qr-code', text],
    async () => {
      return await QRCode.toDataURL(text, { margin: 0 })
    },
  );
}
