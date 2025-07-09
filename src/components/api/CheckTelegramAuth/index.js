import myAxios from "../axios"
import { getCredsTelegram } from "../../../telegram"



const ErrorResponse = {
    status: true,
    error: "Произошла непредвиденная ошибка, попробуйте перезагрузить приложение или обратиться в поддержку."
}

export const checkTelegramAuth = async () => {
    myAxios.get("/api/check_auth")
    myAxios.post("/api/check_auth", getCredsTelegram(), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const data = response.data
        console.log('Response:', data);
        return data
    })
    .catch(error => {
        console.error('Error:', error.response?.data || error.message);
    });
    return ErrorResponse
}
