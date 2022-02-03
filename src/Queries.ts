import axios from "axios";
import { fromPairs } from "lodash";
import { useQuery } from "react-query";

// Production
export const PROGRAM = "yDuAzyqYABS";
export const ATTRIBUTE = "sB1IHYu2xQT";
export const NAME_ATTRIBUTE = "sB1IHYu2xQT";
export const NIN_ATTRIBUTE = "Ewi7FUfcHAD";
export const PROGRAM_STAGE = "a1jCssI2LkW";
export const OTHER_ID = "YvnFn4IjKzx";
export const VACCINATION_CARD_NO = "hDdStedsrHN";
export const SEX_ATTRIBUTE = "FZzQbW8AWVd";
export const DOB_ATTRIBUTE = "NI0QRzJvQ0k";
export const PHONE_ATTRIBUTE = "ciCR6BBvIT4";
export const BATCH_ATTRIBUTE = "Yp1F4txx8tm";
export const VACCINE_ATTRIBUTE = "bbnyNYD1wgS";
export const MFG_ATTRIBUTE = "rpkH9ZPGJcX";
export const ELSEWHERE_DATE = "lySxMCMSo8Z";
export const ELSEWHERE_IN_COUNTRY_DISTRICT = "ObwW38YrQHu";
export const ELSEWHERE_IN_COUNTRY_FACILITY = "X7tI86pr1y0";
export const ELSEWHERE_OUT_COUNTRY = "ONsseOxElW9";
export const ELSEWHERE_OUT_COUNTRY_FACILITY = "OW3erclrDW8";
export const ELSEWHERE_VACCINE = "wwX1eEiYLGR";
export const ELSEWHERE_MAN = "taGJD9hkX0s";
export const ELSEWHERE_BATCH = "muCgXjnCfnS";

export const api = axios.create({
  baseURL: "http://localhost:3001/",
  // baseURL: 'https://services.dhis2.hispuganda.org/'
});

export function useInstance(tei: string, nin: string) {
  return useQuery<any, Error>(["instance", tei], async () => {
    const { data } = await api.get(`certificates/validate/${tei}`);
    return data;
  });
}

export async function getDistricts(units: string[]) {
  const params = {
    includeAncestors: true,
    fields: "id,name,level",
  };
  const records: any[] = await Promise.all(
    units.map((id: string) =>
      api.get(`dhis2`, {
        params: { ...params, url: `organisationUnits/${id}` },
      })
    )
  );
  const processed = records.map(
    ({ data: { organisationUnits } }: any, index: number) => {
      const district = organisationUnits.find((unit: any) => unit.level === 3);
      return [units[index], district.name];
    }
  );
  return fromPairs(processed);
}

export async function sendEmail(data: any) {
  await api.post("feedbacks", data);
  return true;
}

export async function updateBirthDay(details: any) {
  const { data } = await api.post("certificates/update-birth", details);
  console.log(data);
  return data;
}

export function useTracker(identifier: string | null, phone: string | null) {
  return useQuery<any, Error>(["certificate", identifier, phone], async () => {
    const { data } = await api.get("certificates", {
      params: { identifier, phone },
    });
    return data;
  });
}

export function useFeedbacks(page: number, pageSize: number) {
  return useQuery<any, Error>(["feedbacks", page, pageSize], async () => {
    return await api.get("feedbacks", { params: { page, pageSize } });
  });
}
