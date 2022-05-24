import { v4 as guid } from 'uuid';

import config from '../config';
import { getLocationSearch } from '../utils';

import { axiosClient } from './common';

const { userId } = getLocationSearch();

const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const makeNewEventType = (str: string) => {
    const [widget, type] = str.split('/');
    const _type = camelToSnakeCase(type);
    const _widget = widget;
    return {
        _widget,
        _type,
    };
};

const makeEvent = (eventName: string, data: any = {}) => {
    const eventField = makeNewEventType(eventName);
    return {
        eventUid: guid(),
        memberId: userId,
        timestamp: Math.floor(new Date().getTime() / 1000),
        ...eventField,
        ...data,
    };
};

const pushToServerMethod = ((eventName: string, ...data: any[]) => {
    const events = data.length > 0
        ? data.map((next) => makeEvent(eventName, next))
        : [makeEvent(eventName)];
    axiosClient.post(`${config.METRICS_API}`, events);
});

const pushLocal = (eventName: string, ...args: any[]) => {
    console.log('metricEvent: ', eventName, args);
};

export const pushMetric = process.env.NODE_ENV === 'development'
    ? pushLocal
    : pushToServerMethod;
