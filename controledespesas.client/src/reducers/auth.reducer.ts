const initialState = {
    auth: [],
    email: '',
    senha: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH':
            return {
                ...state,
                auth: [...state.auth, action.payload]
            };

        case 'EDIT_AUTH':
            return {
                ...state,
                auth: state.auth.map(tipo =>
                    tipo.nome === action.payload.nome
                        ? { ...tipo, descricao: action.payload.novaDescricao }
                        : tipo
                )
            };
        case 'ALTERAR_VALOR_INPUT':
            const { nomeCampo, novoValor } = action.payload;
            return {
                ...state,
                auth: {
                    ...state.auth, // Mant�m as outras propriedades de auth
                    [nomeCampo]: novoValor // Atualiza o campo espec�fico
                }
            };
        default:
            return state;
    }
};

export default authReducer;
