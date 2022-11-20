import React, { useRef, useCallback, useReducer } from "react";
import useSafeDispatch from "@hooks/useSafeDispatch.hooks";
import COPY_TEXT from "@util/copyText";

export type AsyncState<T> = {
  status: "idle" | "rejected" | "resolved" | "pending";
  error: Error | null;
  data: T | null;
};
const defaultInitialState = {
  status: "idle",
  data: null,
  error: null,
};

function useAsync<T>(initialState: AsyncState<T>) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = useReducer(
    (s: AsyncState<T>, a: AsyncState<T>) => ({ ...s, ...a }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (data: T) => safeSetState({ data, status: "resolved" }),
    [safeSetState]
  );
  const setError = useCallback(
    (error: Error) => safeSetState({ error, status: "rejected" }),
    [safeSetState]
  );
  const reset = useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error(COPY_TEXT.INTERNAL.ASYNC_NOT_PASSED);
      }
      safeSetState({ status: "pending" });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export default useAsync;
