export interface Patch {
  value: string
  path?: string[]
}

export interface EDTF {
  type: string
  lower?: {
    min?: number
    max?: number
  }
  upper?: {
    min?: number
    max?: number
  }
  min?: number
  max?: number
}

export type Timespan = {
  edtf?: string
  beginOfTheBegin?: string
  endOfTheBegin?: string
  date?: string
  beginOfTheEnd?: string
  endOfTheEnd?: string
}

/* prettier-ignore */
export type EDTFDate =
  | {
    uncertain?: boolean | number
    approximate?: number
    type: 'Date'
  }
  | 'Infinity'

export interface EDTFInterval {
  type: 'Interval'
  values: [EDTFDate | null, EDTFDate | null]
}

export type EDTFValue = EDTFDate | EDTFInterval

export interface TimespanValue {
  beginOfTheBegin?: string
  endOfTheBegin?: string
  beginOfTheEnd?: string
  endOfTheEnd?: string
  date?: string
  edtf?: string
}
