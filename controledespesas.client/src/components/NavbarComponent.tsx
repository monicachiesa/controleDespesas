import { Nav, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";
import { logOut } from "../actions/auth.actions";
import { useDispatch } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
    color: inherit !important;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: #f8f9fa;
        color: #333 !important;
    }
`;

const StyledDiv = styled.div`
display: flex;
flex-direction: row
`;

function NavbarComponent() {
    const { logout: authContextLogout } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        authContextLogout();
        navigate("/");
    }

    return (
        <Nav className="bg-light shadow-sm p-3 mb-4 d-flex justify-content-between">
            <StyledDiv>
                <NavItem>
                    <StyledNavLink href="/">Home</StyledNavLink>
                </NavItem>
                <NavItem>
                    <StyledNavLink href="/tiposDespesas">Tipos de Despesas</StyledNavLink>
                </NavItem>
                <NavItem>
                    <StyledNavLink href="/despesas">Despesas</StyledNavLink>
                </NavItem>
            </StyledDiv>
            <NavItem>
                <StyledNavLink onClick={handleLogout}>Sair</StyledNavLink>
            </NavItem>
        </Nav>
    );
}

export default NavbarComponent;