// types.ts
// Martin Pravda

// Opmet service type declarations

export type Param = {
  id: string;
  reportTypes: string[];
  stations: string[];
  countries: string[];
};

export type Payload = {
  id: string;
  method: string;
  params: Param[];
};

export type Error = {
  code: string;
  message: string;
};

export type Result = {
  placeId: string;
  queryType: string;
  receptionTime: string;
  refs: string[];
  reportTime: string;
  reportType: string;
  revision: string;
  stationId: string;
  text: string;
  textHTML: string;
};

export type Response = {
  error?: Error;
  id: string;
  result: Result[];
};
