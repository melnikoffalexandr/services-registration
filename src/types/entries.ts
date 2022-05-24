export interface Entry {
    date: string,
    count: number
}

export type EntriesList = {
    id: number,
    entry: Entry[]
}[];

export interface Search {
    additionalInfo: null;
    date: string;
    client: string;
    works: string[];
    postId: string;
    postName: string;
}

export type SearchList = Search[];
