import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const navigate = useNavigate();

    // Используем useRouteError внутри компонента
    // useRouteError(() => {
    //     console.log('An error occurred while navigating to the route');
    // });

    return (
        <div>
            <h1>Something went wrong 😢</h1>
            <p>An error occurred while navigating to the route.</p>
            <button onClick={() => navigate(-1)}>← Go back</button>
        </div>
    );
};