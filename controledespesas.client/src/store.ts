import { createStore, combineReducers, applyMiddleware } from 'redux';
import tipoDespesaReducer from './reducers/tipoDespesa.reducer';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/auth.reducer';

// Combina os reducers
const rootReducer = combineReducers({
    tipoDespesa: tipoDespesaReducer,
    auth: authReducer
});

// Cria a store com o middleware redux-thunk
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)  // Correção aqui
);

export default store;
