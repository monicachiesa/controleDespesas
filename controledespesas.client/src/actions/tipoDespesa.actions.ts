import axios from 'axios';
import config from '../config/config';
import { ITipoDespesaProps } from '../types/ITipoDespesaProps.t';
import { toQueryString } from '../utils/Functions';
import { IFilterModelProps } from '../types/IFilterModelProps.t';
import { toast } from 'react-toastify';

// Action para adicionar tipo de despesa
export const addTipoDespesa = (payload: ITipoDespesaProps) => {
    return async (dispatch) => {
        try {
            // Faz a requisição POST para adicionar o tipo de despesa
            const response = await axios.post(`${config.BASE_URL}`, payload, {
                headers: {
                    'Content-Type': 'application/json', // Especifica o tipo de conteúdo                   
                }
            });

            //resposta com status = created
            if (response.status == 201) {
                toast.success('Tipo de despesa cadastrado com sucesso!');
                dispatch({
                    type: 'ADD_TIPO_DESPESA',
                    payload: response.data // Dados retornados pelo backend
                });
            }

        } catch (error) {
            console.error('Erro ao adicionar tipo de despesa:', error);
            // Você pode despachar um erro se precisar
        }
    };
};

// Action para remover tipo de despesa
export const removeTipoDespesa = (id: number) => {
    return async (dispatch) => {
        try {
            // Faz a requisição DELETE para remover o tipo de despesa
            const response = await axios.delete(`${config.BASE_URL}/${id}`);

            if (response.status == 200) {
                toast.success('Tipo de despesa excluído com sucesso!');
                dispatch({
                    type: 'REMOVE_TIPO_DESPESA',
                    payload: id // Id do tipo de despesa removido
                });
            }
        } catch (error) {
            console.error('Erro ao remover tipo de despesa:', error);
        }
    };
};

// Action para editar tipo de despesa
export const editTipoDespesa = (id: number, payload: ITipoDespesaProps) => {
    return async (dispatch) => {
        try {
            // Faz a requisição PUT para editar o tipo de despesa
            const response = await axios.put(`${config.BASE_URL}/${id}`, payload, {
                headers: {
                    'Content-Type': 'application/json', // Especifica o tipo de conteúdo                   
                }
            });

            if (response.status == 200) {
                toast.success('Tipo de despesa alterado com sucesso!');

                dispatch({
                    type: 'EDIT_TIPO_DESPESA',
                    payload: payload
                });
            }
        } catch (error) {
            console.error('Erro ao editar tipo de despesa:', error);
        }
    };
};

// action para obter todos os tipos de despesas
export const getTodosTiposDespesas = (filterModel: IFilterModelProps) => {
    return async (dispatch) => {
        try {
            // Faz a requisição GET para obter o tipo de despesa
            const response = await axios.get(`${config.BASE_URL}/all${toQueryString(filterModel)}`);
            dispatch({
                type: 'GET_TIPO_DESPESA',
                payload: response.data // Dados do tipo de despesa
            });
        } catch (error) {
            console.error('Erro ao obter tipo de despesa:', error);
        }
    };
};

// action para obter despesa pelo id
export const getTipoDespesaById = (id: number) => {
    return async (dispatch) => {
        try {
            // Faz a requisição GET para obter o tipo de despesa
            const response = await axios.get(`${config.BASE_URL}/${id}`);
            dispatch({
                type: 'GET_TIPO_DESPESA',
                payload: response.data // Dados do tipo de despesa
            });
        } catch (error) {
            console.error('Erro ao obter tipo de despesa:', error);
        }
    };
};

// Action para alterar o valor de um input baseado no nome da prop
export const alterarValorInput = (nomeCampo: string, novoValor: string) => ({
    type: 'ALTERAR_VALOR_INPUT',
    payload: { nomeCampo, novoValor }
});

