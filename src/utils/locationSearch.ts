export const getLocationSearch = (): Record<string, string> => location.search
    .slice(1)
    .split('&')
    .reduce((acc, s) => {
        const [k, v] = s.split('=');
        return Object.assign(acc, { [k]: v });
    }, {});
