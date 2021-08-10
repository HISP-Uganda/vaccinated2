import axios from 'axios';
import { differenceInDays, parseISO } from 'date-fns';
import { flatten, fromPairs, uniq } from 'lodash';
import QRCode from 'qrcode';
import { useQuery } from "react-query";

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
  baseURL: 'https://services.dhis2.hispuganda.org/'
});

const processTrackedEntityInstances = async (trackedEntityInstances: any, byNIN: boolean = true) => {
  let results: any = {};
  const [{ attributes }] = trackedEntityInstances;
  const trackedEntityInstance = trackedEntityInstances.map((tei: any) => tei.trackedEntityInstance).join(',')

  const allEvents = trackedEntityInstances.map((tei: any) => {
    const enroll = tei.enrollments.filter((en: any) => en.program === PROGRAM);
    return flatten(enroll.map((en: any) => en.events));
  });

  let processedAttributes = fromPairs(attributes.map((a: any) => [a.attribute, a.value]));

  if (byNIN) {
    processedAttributes = { ...processedAttributes, idLabel: 'NIN', idValue: processedAttributes[NIN_ATTRIBUTE] }
  } else {
    processedAttributes = { ...processedAttributes, idLabel: 'ID', idValue: processedAttributes[OTHER_ID] }
  }

  results = { attributes: processedAttributes, trackedEntityInstance };

  let units: any[] = []

  let processedEvents = flatten(allEvents).filter((event: any) => !!event.eventDate && event.deleted === false && event.programStage === PROGRAM_STAGE).map(({ dataValues, ...others }: any) => {
    units = [...units, others.orgUnit]
    return { ...others, ...fromPairs(dataValues.map((dv: any) => [dv.dataElement, dv.value])) };
  });

  const districts = await getDistricts(uniq(units));

  processedEvents = processedEvents.map((ev: any) => {
    return { ...ev, district: districts[ev.orgUnit] }
  });

  const lastDose = processedEvents.find((e: any) => e.LUIsbsm3okG === 'DOSE2');
  const firstDose = processedEvents.find((e: any) => e.LUIsbsm3okG === 'DOSE1');

  if (firstDose && lastDose) {
    results = { ...results, events: [firstDose, lastDose] }
    if (!!lastDose.eventDate && differenceInDays(new Date(), parseISO(lastDose.eventDate)) >= 14) {
      const qr = await QRCode.toDataURL(`Name:${results.attributes[NAME_ATTRIBUTE]}\n${processedAttributes.idLabel}:${processedAttributes.idValue}\nSex:${results.attributes[SEX_ATTRIBUTE]}\nDOB:${results.attributes[DOB_ATTRIBUTE] || ' '}\nPHONE:${results.attributes[PHONE_ATTRIBUTE]}\n${firstDose.bbnyNYD1wgS}:${new Intl.DateTimeFormat('fr').format(Date.parse(firstDose.eventDate))},${firstDose.orgUnitName},${firstDose.district}\n${lastDose.bbnyNYD1wgS}:${new Intl.DateTimeFormat('fr').format(Date.parse(lastDose.eventDate))},${lastDose.orgUnitName},${lastDose.district}\n\nClick to verify\nhttps://epivac.health.go.ug/certificates/#/validate/${trackedEntityInstance}`, { margin: 0 });
      const { prints, id } = await getCertificateDetails(trackedEntityInstance);
      if (prints <= 100000) {
        results = { ...results, eligible: true, qr, certificate: id };
      } else {
        results = { ...results, vaccinations: 2, message: `Your have exceeded the numbers of prints/downloads` }
      }
    } else if (!!lastDose.eventDate) {
      results = { ...results, message: `Your certificate is not yet ready please try again after ${14 - differenceInDays(new Date(), parseISO(lastDose.eventDate))} days` }
    }
  } else if (processedEvents.length === 1) {
    const [dose] = processedEvents;
    if (dose['LUIsbsm3okG'] === "DOSE2" && dose['vk2nF6wZwY4']) {
      const eventDate = dose['lySxMCMSo8Z'];
      const orgUnitName = dose['AmTw4pWCCaJ'];
      const facilityDoseWasGiven = dose['X7tI86pr1y0'] || dose['OW3erclrDW8']
      const event = {
        ...dose,
        bbnyNYD1wgS: 'N/A',
        eventDate,
        orgUnitName: `${orgUnitName}(${facilityDoseWasGiven})`,
        rpkH9ZPGJcX: 'N/A',
        Yp1F4txx8tm: 'N/A',
        district: 'N/A'
      }
      const qr = await QRCode.toDataURL(`Name:${results.attributes[NAME_ATTRIBUTE]}\n${processedAttributes.idLabel}:${processedAttributes.idValue}\nSex:${results.attributes[SEX_ATTRIBUTE]}\nDOB:${results.attributes[DOB_ATTRIBUTE] || ' '}\nPHONE:${results.attributes[PHONE_ATTRIBUTE]}\n${event.bbnyNYD1wgS}:${new Intl.DateTimeFormat('fr').format(Date.parse(event.eventDate))},${event.orgUnitName},${event.district}\n${dose.bbnyNYD1wgS}:${new Intl.DateTimeFormat('fr').format(Date.parse(dose.eventDate))},${dose.orgUnitName},${dose.district}\n\nClick to verify\nhttps://epivac.health.go.ug/certificates/#/validate/${trackedEntityInstance}`, { margin: 0 });
      results = { ...results, events: [event, dose] }
      const { prints, id } = await getCertificateDetails(trackedEntityInstance);
      if (prints <= 100000) {
        results = { ...results, eligible: true, qr, certificate: id };
      } else {
        results = { ...results, vaccinations: 2, message: `Your have exceeded the numbers of prints/downloads` }
      }
    } else if (dose['LUIsbsm3okG'] === "DOSE2") {
      results = { ...results, events: processedEvents, vaccinations: 1, message: `Your may have not been fully vaccinated, current records show you have only received second dose without first dose.` }
    } else {
      results = { ...results, events: processedEvents, vaccinations: 1, message: `Your may have not been fully vaccinated, current records show you have only received one dose.` }
    }
  } else if (processedEvents.length > 1) {
    results = { ...results, vaccinations: processedEvents.length, message: `You have multiple similar vaccinations` }
  } else {
    results = { ...results, vaccinations: 0, message: `You have no registered vaccination information` }
  }
  return results;
}


export function useInstance(tei: string, nin: string) {
  const allIds = tei.split(",");
  return useQuery<any, Error>(
    ['instance', tei],
    async () => {
      const params: any = {
        program: PROGRAM,
        attribute: ATTRIBUTE,
        fields: '*'
      }
      const records: any[] = await Promise.all(allIds.map((id: string) => api.get('dhis2', { params: { ...params, url: `trackedEntityInstances/${id}` } })));
      const allAttributes = fromPairs(records[0].data.attributes.map((a: any) => [a.attribute, a.value]));
      const allEvents = records.map(({ data }: any) => {
        const enroll = data.enrollments.filter((en: any) => en.program === PROGRAM);
        return flatten(enroll.map((en: any) => en.events));
      });
      let units: any[] = [];
      let processedEvents = flatten(allEvents).filter((event: any) =>  !!event.eventDate && event.deleted === false && event.programStage === PROGRAM_STAGE).map(({ dataValues, ...others }: any) => {
        units = [...units, others.orgUnit]
        return { ...others, ...fromPairs(dataValues.map((dv: any) => [dv.dataElement, dv.value])) }
      });
      const districts = await getDistricts(uniq(units));

      processedEvents = processedEvents.map((ev: any) => {
        return { ...ev, district: districts[ev.orgUnit] }
      })
      return { ...allAttributes, ...processedEvents };
    }
  );
}

export async function getDistricts(units: string[]) {
  const params = {
    includeAncestors: true,
    fields: 'id,name,level'
  }
  const records: any[] = await Promise.all(units.map((id: string) => api.get(`dhis2`, { params: { ...params, url: `organisationUnits/${id}` } })));
  const processed = records.map(({ data: { organisationUnits } }: any, index: number) => {
    const district = organisationUnits.find((unit: any) => unit.level === 3);
    return [units[index], district.name]
  });

  return fromPairs(processed);
}

export async function sendEmail(data: any) {
  return await api.post('email', "This is  testing email");
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
        api.get('dhis2', { params: { url: `trackedEntityInstances.json?${p1}` } }),
        api.get('dhis2', { params: { url: `trackedEntityInstances.json?${p2}` } })
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
  const { data } = await api.get('dhis2', { params: { url: 'dataStore' } });

  if (data.indexOf("covid19-certificates") !== -1) {
    const { data } = await api.get('dhis2', { params: { url: "dataStore/covid19-certificates" } });
    if (data.indexOf(tei) !== -1) {
      let { data: details } = await api.get('dhis2', { params: { url: `dataStore/covid19-certificates/${tei}` } });
      details = { ...details, prints: details.prints + 1 };
      await api.put('dhis2', details, { params: { url: `dataStore/covid19-certificates/${tei}` } });
      return details;
    } else {
      const details = { id: Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000), prints: 1 }
      await api.post('dhis2', details, { params: { url: `dataStore/covid19-certificates/${tei}` } });
      return details;
    }
  } else {
    const details = { id: Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000), prints: 1 }
    await api.post('dhis2', details, { params: { url: `dataStore/covid19-certificates/${tei}` } });
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
