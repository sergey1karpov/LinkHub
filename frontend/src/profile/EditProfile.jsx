import AuthUserContext from '../contexts/AuthUserContext';
import { useContext } from 'react';

export default function EditProfile() {
    const authUserData = useContext(AuthUserContext)
    
    return (
        <>
            <h1>EditProfile</h1>
            {/* <p>{authUserData.email}</p> */}
        </>
    )
}