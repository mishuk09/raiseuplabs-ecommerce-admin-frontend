import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = (apiEndpoint) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/signin");
                return;
            }

            try {
                await axios.get(`https://riseuplabs-ecommerce-backend.onrender.com${apiEndpoint}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setLoading(false); // Authentication successful
            } catch (error) {
                console.error("Error fetching data:", error.response ? error.response.data : error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate("/signin");
                }
            }
        };

        fetchData();
    }, [navigate, apiEndpoint]);

    return { loading };
};

export default useAuth;
