import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import Wait from "../../../profile/Wait";

export default function GoogleCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Включаем загрузчик перед началом запроса

            try {
                const response = await axios.get(
                    `${config.BACKEND_API_URL}/auth/google/callback${location.search}`
                );

                localStorage.setItem('chrry-userId', response.data.userId);
                localStorage.setItem('chrry-username', response.data.username);
                localStorage.setItem('chrry-api-token', response.data.token);

                navigate(`/profile/dashboard`); // Перенаправляем на профиль
            } catch (error) {
                console.error(error); // Логируем ошибку
            } finally {
                setLoading(false); // Отключаем загрузчик
            }
        };

        fetchData();
    }, [location.search, navigate]);

    if (loading) {
        return <Wait />; // Показываем компонент загрузки, если идет загрузка
    }

    return null; // Если ничего не нужно отображать, пока идет редирект
}
