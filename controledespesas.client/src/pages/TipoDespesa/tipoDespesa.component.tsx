import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Input, Row, Table } from "reactstrap";
import { getTodosTiposDespesas, removeTipoDespesa } from "../../actions/tipoDespesa.actions";
import { useDispatch, useSelector } from "react-redux";
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';
import styled from "styled-components";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useDebounce } from "../../utils/Functions";

const ThStyled = styled.th`
  cursor: pointer;
  text-align: center;
`;

const TipoDespesa = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [idTipoDespesa, setIdTipoDespesa] = useState(0);
    const [modal, setModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 2000);

    const toggle = () => setModal(!modal);

    const handleOpenModal = (id) => {
        setIdTipoDespesa(id);
        toggle();
    }

    const tipoDespesa = useSelector(state => state.tipoDespesa.tipoDespesa);

    useEffect(() => {
        const filterModel = { SearchValue: debouncedValue };
        dispatch(getTodosTiposDespesas(filterModel));
    }, [debouncedValue, dispatch]);

    const goToDespesa = () => {
        navigate("/tipoDespesa");
    };

    const goToEditDespesa = (id: number) => {
        navigate("/tipoDespesa/" + id);
    };

    const handleDeleteTipoDespesa = () => {
        dispatch(removeTipoDespesa(idTipoDespesa));
        toggle();
    }

    return (
        <Row>
            <Col md={12} lg={12} xs={12} xl={12} className="mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Col md={6} lg={6} xs={6} xl={6}>
                    <Input
                        id="pesquisa"
                        name="pesquisa"
                        placeholder="Pesquisar"
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Col>
                <Col md={6} lg={6} xs={6} xl={6} align="right" className="mr-4">
                    <Button onClick={goToDespesa} color="primary">Adicionar</Button>
                </Col>
            </Col>
            <Table responsive striped bordered className="table-full-width">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                {tipoDespesa && tipoDespesa.length > 0 ? tipoDespesa.map(t =>
                    <tbody key={t.id}>
                        <tr>
                            <th scope="row">{t.id}</th>
                            <td>{t.nome}</td>
                            <td>{t.descricao}</td>
                            <ThStyled><PencilSimple size={20} onClick={() => goToEditDespesa(t.id)} /> <TrashSimple size={20} onClick={() => handleOpenModal(t.id)} /></ThStyled>
                        </tr>
                    </tbody>
                ) : <tbody>
                    <tr>
                        <td scope="row" align="center" colSpan={4}>Nenhum dado a ser exibido</td>
                    </tr>
                </tbody>}
            </Table>
            {modal ?
                <ConfirmationModal
                    toggle={toggle}
                    functionYes={handleDeleteTipoDespesa}
                    modal={modal} />
                : null}
        </Row>
    );
};

export default TipoDespesa;
