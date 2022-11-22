import React, { useLayoutEffect, useCallback } from "react";

function useSafeDispatch(dispatch: Function) {
  const mounted = React.useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args: any) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

export default useSafeDispatch;
