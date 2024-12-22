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
