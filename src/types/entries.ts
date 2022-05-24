export interface Entry {
    date: string,
    count: number
}

export type EntriesList = {
    id: number,
    entry: Entry[]
}[];

export interface Search {
    additionalInfo: string[];
    autoId: string;
    autoModel: string;
    date: string;
    client: string;
    clientId: string;
    works: string[];
    postId: string;
    postName: string;
}

export type SearchList = Search[];
