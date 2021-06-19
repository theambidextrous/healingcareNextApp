import { useSWRInfinite } from "swr";
import configurations from './Config';

const fetcher = url => fetch(url).then(res => res.json())
const baseUrl = configurations.base_api;

export const usePaginateJobs = endpoint => {
    if (!endpoint) {
        throw new Error("endpoint is required");
    }
    const url = baseUrl + endpoint;
    const PAGE_LIMIT = 6;

    const { data, error, size, setSize } = useSWRInfinite( 
        index => `${url}/page/${index + 1}/limit/${PAGE_LIMIT}`,
        fetcher
    );
    const jobs = data ? [].concat(...data) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);
    return { jobs, error, isLoadingMore, size, setSize, isReachingEnd };
}

export const useSearchPaginateJobs = endpoint => {
    if (!endpoint) {
        throw new Error("endpoint is required");
    }
    const url = baseUrl + endpoint;
    const PAGE_LIMIT = 6;

    const { data, error, size, setSize } = useSWRInfinite( 
        index => `${url}/page/${index + 1}/limit/${PAGE_LIMIT}`,
        fetcher
    );
    const jobs = data ? [].concat(...data) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);
    return { jobs, error, isLoadingMore, size, setSize, isReachingEnd };
}