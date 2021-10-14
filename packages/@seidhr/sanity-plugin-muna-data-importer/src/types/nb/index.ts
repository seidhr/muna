export interface Response {
  totalElements: number;
  _links: Links;
  _embedded: MediaTypeResults;
}

export interface MediaTypeResults {
  mediaTypeResults: MediaTypeResult[];
  aggregations: Aggregation[];
}

export interface Aggregation {
  name: string;
  buckets: Bucket[]
}

export interface Bucket {
  key: string,
  count: number
}

export interface MediaTypeResult {
  mediaType: string;
  result: Result;
}

export interface Result {
  debugQuery: string;
  _links: Links;
  page: Page;
  _embedded: ResultEmbedded;
}

export interface ResultEmbedded {
  items: Item[];
  aggregations: Aggregation[];
  contentFragmentResource: ContentFragment[];
}

export interface ContentFragment {
  pageid: string;
  text: string;
  pageNumber: string;
  _links: Links;
}

export interface Links {
  additionalProp1: AdditionalProp;
  additionalProp2: AdditionalProp;
  additionalProp3: AdditionalProp;
}

export interface AdditionalProp {
  href: string;
  hreflang: string;
  title: string;
  type: string;
  deprecation: string;
  profile: string;
  name: string;
  templated: boolean;
}

export interface Item {
  expand: string;
  id: string;
  _links: Links;
  accessInfo: AccessInfo;
  metadata: Metadata;
  contentFragments: ContentFragment[];
  relatedItems: RelatedItems;
  explain: Aggregation[];
}

export interface AccessInfo {
  accessAllowedFrom: string;
  viewability: string;
  license: string;
  actions: string[];
  legalDepositReservationStatus: string;
  legalDepositLoginText: string;
  isDigital: boolean;
  isPublicDomain: boolean;
}

export interface Metadata {
  title: string;
  titleInfos: TitleInfo[];
  typeOfResource: string;
  genres: string[];
  summary: string;
  people: Person[];
  corporates: Corporate[];
  geographic: Geographic;
  originInfo: { [key: string]: string };
  recordInfo: RecordInfo;
  classification: { [key: string]: string[] };
  collection: Collection;
  identifiers: Identifiers;
  notes: string[];
  subject: Subject;
  statementOfResponsibility: string[];
  languages: Language[];
  streamingInfo: StreamingInfo[];
  pageCount: number;
  mediaTypes: string[];
  creators: string[];
  contentClasses: string[];
  metadataClasses: string[];
  dateCreated: string;
  series: string[];
  seriesuniform: string[];
  namehosts: string[];
  nameauthors: string[];
  namerecipients: string[];
  subjectName: string[];
  titleAlternative: string[];
  tableOfContents: string[];
  targetAudience: string[];
  targetAudienceJuvenile: string[];
  targetAudienceNotes: string[];
  literaryform: string;
  physicalDescription: PhysicalDescription;
  relatedItems: RelatedItem[];
  owner: string;
  relationType: string;
  rightsNotes: string[];
  enumChron: EnumChron;
}

export interface Collection {
  accessProject: string[];
  accessCollection: string[];
}

export interface Corporate {
  name: string[];
  date: string;
  roles: Role[];
  usage: string;
  identifier: string;
}

export interface Role {
  name: string;
  description: string;
}

export interface EnumChron {
  volume: string;
  number: string;
  consecutive_number: string;
  year: string;
  month_season: string;
  date_in_month: string;
}

export interface Geographic {
  placeString: string;
  place: Place;
  coordinates: Coordinates;
  city: string;
  county: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Place {
  country: string;
  region: string;
  city: string;
  area: string;
}

export interface Identifiers {
  isbn10: string[];
  isbn13: string[];
  issn: string[];
  ismn: string[];
  sesamId: string;
  oaiId: string;
  urn: string;
  matrixNumber: string[];
  issueNumber: string[];
}

export interface Language {
  code: string;
  objectPart: string;
}

export interface Person {
  name: string;
  termsOfAddress: string;
  date: string;
  affiliation: string;
  roles: Role[];
  usage: string;
  identifier: string;
}

export interface PhysicalDescription {
  form: string[];
  extent: string;
}

export interface RecordInfo {
  identifier: string;
  identifierSource: string;
  created: string;
}

export interface RelatedItem {
  name: string[];
  type: string;
}

export interface StreamingInfo {
  identifier: string;
  offset: number;
  extent: number;
}

export interface Subject {
  topics: string[];
  persons: Person[];
  corporates: Corporate[];
  geographics: string[];
  genres: string[];
  titleInfos: string[];
  conferences: Corporate[];
}

export interface TitleInfo {
  title: string;
  subTitle: string;
  type: string;
  partNumber: string;
  partName: string;
  displayLabel: string;
}

export interface RelatedItems {
  itemId: string;
  _links: Links;
  id: string;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
