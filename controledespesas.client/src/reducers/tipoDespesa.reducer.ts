const initialState = {
    tipoDespesa: [],
    nome: '',
    descricao: '',
    excluido: false
};

const tipoDespesaReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TIPO_DESPESA':
            return {
                ...state,
                tipoDespesa: [...state.tipoDespesa, action.payload]
            };

        case 'REMOVE_TIPO_DESPESA':
            return {
                ...state,
                tipoDespesa: state.tipoDespesa.filter(tipo => tipo.nome !== action.payload)
            };

        case 'EDIT_TIPO_DESPESA':
            return {
                ...state,
                tipoDespesa: state.tipoDespesa.map(tipo =>
                    tipo.nome === action.payload.nome
                        ? { ...tipo, descricao: action.payload.novaDescricao }
                        : tipo
                )
            };

        case 'GET_TIPO_DESPESA':
            return {
                ...state,
                tipoDespesa: action.payload
            };
        case 'ALTERAR_VALOR_INPUT':
            const { nomeCampo, novoValor } = action.payload;
            return {
                ...state,
                tipoDespesa: {
                    ...state.tipoDespesa, // Mantém as outras propriedades de tipoDespesa
                    [nomeCampo]: novoValor // Atualiza o campo específico
                }
            };
        default:
            return state;
    }
};

export default tipoDespesaReducer;
