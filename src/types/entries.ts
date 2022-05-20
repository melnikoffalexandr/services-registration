export interface Entry {
    date: string,
    count: number
}

export type EntriesList = {
    id: number,
    entry: Entry[]
}[];

export type SchedulerSearchList = {
    additionalInfo: null;
    date: string;
    client: string;
    works: string[];
    postId: string;
    postName: string;
}[];
