import qs from 'query-string';
import { useCallback, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

function setQueryStringWithoutPageReload<T>(qsValue: T) {
    const newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        qsValue?.toString();

    window.history.pushState({ path: newurl }, '', newurl);
}

function setQueryStringValue<T>(
    key: string,
    value: T,
    queryString = window?.location.search
) {
    const values = qs.parse(queryString);
    const newQsValue = qs.stringify({ ...values, [key]: value });
    setQueryStringWithoutPageReload(`?${newQsValue}`);
}

function getQueryStringValue(
    key: string,
    queryString = window?.location.search
): string {
    const values = qs.parse(queryString);
    return values[key] as string;
}

function useQueryString<T extends string>(
    key: string,
    initialValue: T
): [T, Function] {
    if (!isBrowser) return [initialValue, () => {}];
    const [value, setValue] = useState<T>(
        (getQueryStringValue(key) as T) || initialValue
    );

    const onSetValue = useCallback(
        (newValue: T) => {
            setValue(newValue);
            setQueryStringValue(key, newValue);
        },
        [key]
    );

    return [value, onSetValue];
}

export default useQueryString;
