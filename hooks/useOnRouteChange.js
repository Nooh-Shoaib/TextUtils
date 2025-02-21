import { useState, useEffect } from "react";
import Router from "next/router";

function useOnRouteChange() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval;
    let cleanupTimeout;

    const handleStart = () => {
      // Clear any existing intervals/timeouts
      if (progressInterval) clearInterval(progressInterval);
      if (cleanupTimeout) clearTimeout(cleanupTimeout);

      setLoading(true);
      setProgress(0);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 30) return prev + 2;
          if (prev < 60) return prev + 1;
          if (prev < 90) return prev + 0.5;
          return prev;
        });
      }, 100);
    };

    const handleComplete = () => {
      clearInterval(progressInterval);
      setProgress(100);

      // Use cleanupTimeout to track the setTimeout
      cleanupTimeout = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    };

    const handleError = () => {
      clearInterval(progressInterval);
      handleComplete();
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleError);

    return () => {
      // Clean up all timers
      if (progressInterval) clearInterval(progressInterval);
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleError);
    };
  }, []);

  return { loading, progress };
}

export default useOnRouteChange;
