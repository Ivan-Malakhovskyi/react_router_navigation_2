import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export const useAbort = (cb) => {
  const controller = useRef(null);
  const [isError, setIsError] = useState(null);
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  });

  const abortedCb = useCallback(async (...args) => {
    if (controller.current) {
      controller.current?.abort();
    }

    try {
      controller.current = new AbortController();
      await cbRef.current(controller, args);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setIsError(error);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      controller.current?.abort();
    };
  }, []);

  return { abortedCb, isError };
};
