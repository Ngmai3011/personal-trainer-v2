import {useState, useEffect, useCallback} from "react";

const useFetchData = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const response = await fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });

    setData(response);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, url]);

  return {data, loading, error, refetch: fetchData};
};

export default useFetchData;
