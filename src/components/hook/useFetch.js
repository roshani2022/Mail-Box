import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmail = useCallback(async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.status);
      }
      const result = await res.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchEmail();
  }, [fetchEmail]);
  return { data, loading, error,fetchEmail };
};

export default useFetch;
