import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

const useFetch = (fn: any) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fn();
            setData(res.result);
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setLoading(false);
        }
    }, [fn]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => fetchData();

    return { data, loading, refetch };
};

export default useFetch;
