export interface Timespan {
  _type: string;
  // _key: string;
  edtf: string;
  date?: Date;
  begin?: {
    beginOfTheBegin?: Date;
    endOfTheBegin?: Date;
  };
  end?: {
    beginOfTheEnd?: Date;
    endOfTheEnd?: Date;
  }
  description?: string;
}