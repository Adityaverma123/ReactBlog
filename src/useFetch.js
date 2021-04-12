import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch data from the resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setData(null);
          setError(e.message);
          setLoading(false);
        }
      });
    return () => abortController.abort();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
