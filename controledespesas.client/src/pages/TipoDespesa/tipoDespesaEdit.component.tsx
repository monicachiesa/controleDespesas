
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { addTipoDespesa, alterarValorInput, editTipoDespesa, getTipoDespesaById, getTodosTiposDespesas } from "../../actions/tipoDespesa.actions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TipoDespesaEdit = () => {
    const dispatch = useDispatch();
    const tipoDespesa = useSelector(state => state.tipoDespesa.tipoDespesa);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            dispatch(getTipoDespesaById(params.id));
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            id: params.id,
            nome: tipoDespesa.nome,
            descricao: tipoDespesa.descricao
        };

        if (params.id) {
            dispatch(editTipoDespesa(params.id, payload));
        } else {
            dispatch(addTipoDespesa(payload));
        }

        dispatch(getTodosTiposDespesas());
        navigate("/tiposDespesas")
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(alterarValorInput(name, value));
    };

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col xs={12} className="text-center">
                    <h4>Cadastrar Tipo de Despesa</h4>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <Label for="nome">Nome *</Label>
                            <Input
                                id="nome"
                                name="nome"
                                type="text"
                                value={tipoDespesa.nome}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <Label for="descricao">Descrição</Label>
                            <Input
                                id="descricao"
                                name="descricao"
                                type="textarea"
                                value={tipoDespesa.descricao}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs={12} className="d-flex justify-content-end gap-3">
                        <Button color="secondary" type="button" onClick={() => navigate("/tiposDespesas")}>Cancelar</Button>
                        <Button color="primary" type="submit">Salvar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default TipoDespesaEdit;
