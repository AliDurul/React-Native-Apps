import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useFetch = (fn: any) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fn();
            setData(res.result);
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, loading, refetch };
};


export default useFetch;
