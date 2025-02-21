import React, { useEffect } from "react";
import styles from "@/styles/loadingBar.module.css";
import useOnRouteChange from "@/hooks/useOnRouteChange";

const LoadingBar = () => {
  const { loading, progress } = useOnRouteChange();

  useEffect(() => {
    return () => {
      // Cleanup any remaining styles on unmount
      const progressBar = document.querySelector(`.${styles.progressBar}`);
      const progressBg = document.querySelector(
        `.${styles.progressBackground}`
      );
      if (progressBar) progressBar.remove();
      if (progressBg) progressBg.remove();
    };
  }, []);

  if (!loading) return null;

  return (
    <>
      <div className={styles.progressBackground} />
      <div
        className={styles.progressBar}
        style={{
          width: `${progress}%`,
          transition: progress === 0 ? "none" : undefined,
        }}
      />
      <div className={styles.spinner} />
    </>
  );
};

export default LoadingBar;
