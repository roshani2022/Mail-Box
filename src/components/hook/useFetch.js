import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchEmail = useCallback(async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.status);
      }
      const result = await res.json();
      setData(result);
      
    } catch (error) {
      setError(error);
      
    }
  }, [url]);
  useEffect(() => {
    fetchEmail();
  }, [fetchEmail,url]);
  return { data,error,fetchEmail };
};

export default useFetch;
