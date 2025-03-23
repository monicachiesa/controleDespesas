import axios from 'axios';
import config from '../config/config';
import { ILoginProps } from '../types/ILoginProps.t';

// Action para logar no sistema
export const login = (payload: ILoginProps) => {
    return async (dispatch) => {
        try {

            const response = await axios.post(`${config.BASE_URL}auth/login`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status == 200) {
                localStorage.setItem("token", response.data.token)
            }
            //resposta com status = created
            if (response.status == 201) {
                dispatch({
                    type: 'AUTH',
                    payload: response.data // Dados retornados pelo backend
                });
            }

        } catch (error) {
            console.error('Erro ao realizar login no sistema:', error);
            // Você pode despachar um erro se precisar
        }
    };
};

export const logOut = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem("token")

        } catch (error) {
            console.error('Erro ao realizar login no sistema:', error);
            // Você pode despachar um erro se precisar
        }
    };
};

