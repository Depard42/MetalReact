// import React from "react"
import { Suspense, lazy, useEffect, useState } from "react";
import { checkTelegramAuth } from './components/api/CheckTelegramAuth';

import NavigateBottomBar from "./components/NavigateBottomBar";
import LoadingScreen from "./components/UI/StatusScreens/LoadingScreen";
import { ErrorScreen } from "./components/UI/StatusScreens/ErrorScreen";
import { setupWebApp } from "./telegram";

const MainPage = lazy(() => import("./components/MainPage/MainPage"))


const AuthWrapper = () => {
  const [authState, setAuthState] = useState({
    loading: true,
    authorized: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      // Возможно дополнительный try и не нужен и так запакованно
      try {
        const response = await checkTelegramAuth();
        setAuthState({
          loading: false,
          authorized: response.status,
          error: response.error,
        });
      } catch (error) {
        setAuthState({
          loading: false,
          authorized: true,
          error: 'Произошла ошибка при проверке авторизации',
        });
      }
    };

    checkAuth();
  }, []);

  if (authState.loading) {
    return <LoadingScreen message="Проверка авторизации..." />;
  }

  if (!authState.authorized) {
    return <ErrorScreen text={authState.error || 'Доступ запрещен'} />;
  }

  return <MainPage />;
};

const App = () => {
  setupWebApp();

  return (
    <div>
      <Suspense fallback={<LoadingScreen message="Загрузка..." />}>
        <AuthWrapper />
      </Suspense>
      <NavigateBottomBar></NavigateBottomBar>
    </div>
  );
};

// class App extends React.Component{
//   constructor(props) {
//       super(props)
//       this.state = {
//         isUserAuth: false,
//         isLoading: true,
//         isError: false,
//         error_message: '',
//         loading_message: "Авторизация..."
//       }
      
//       setupWebApp();
      

//   }
//   componentDidMount(){
//   }

//   render() {
//     return (
//       <div>
//         <MainPage></MainPage>
//         <NavigateBottomBar></NavigateBottomBar>
//       </div>
//     )
//   }
  
  
// }
export default App