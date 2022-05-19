import { AxiosPromise } from 'axios';

import ApiClient from './common';

export const fetchAllEntriesRequest = (): AxiosPromise => ApiClient.get('scheduler/getScheduler');
