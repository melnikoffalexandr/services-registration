import { AxiosPromise } from 'axios';

import ApiClient  from './common';

export const fetchAllEntriesRequest = (): AxiosPromise => {
    return ApiClient.get('/entries' );
};
