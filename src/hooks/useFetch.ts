import { useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

interface StateWithRefetch<T> extends State<T> {
  refetch: () => void;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

/*
 * I used https://usehooks-ts.com/react-hook/use-fetch as a starting point for this hook
 * I added the "isLoading" state and avoid the .json() call when response as no content
 * and added the refetch function
 */
function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): StateWithRefetch<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    isLoading: false,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, isLoading: true };
      case "fetched":
        return { ...initialState, isLoading: false, data: action.payload };
      case "error":
        return { ...initialState, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async () => {
    // Do nothing if the url is not given
    if (!url) return;

    dispatch({ type: "loading" });

    // If a cache exists for this url, return it
    if (cache.current[url]) {
      dispatch({ type: "fetched", payload: cache.current[url] });
      return;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data =
        response.status === 204
          ? (undefined as unknown as T)
          : ((await response.json()) as T);
      cache.current[url] = data;

      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: "error", payload: error as Error });
    }
  };

  useEffect(() => {
    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const refetch = () => {
    // Do nothing if the url is not given
    if (!url) return;

    // Delete the cache for this url
    cache.current[url] = undefined as unknown as T;

    // Refetch
    void fetchData();
  };

  return { ...state, refetch };
}

export default useFetch;
