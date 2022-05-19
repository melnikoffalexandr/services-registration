export interface Entry {
    date: string,
    count: number
}

export type EntriesList = {
    id: number,
    entry: Entry[]
}[];
