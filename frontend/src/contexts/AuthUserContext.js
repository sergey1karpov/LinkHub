import { createContext } from "react";

//Создаем контекст авторизованного пользователя, и передаем этого
//пользователя всем дочерним компонентам вместо прокидывания пропсов
const AuthUserContext = createContext()

export default AuthUserContext