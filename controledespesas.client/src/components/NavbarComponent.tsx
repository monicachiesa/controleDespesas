import { Nav, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
    color: inherit !important;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #f8f9fa;
        color: #333 !important;
    }
`;

function NavbarComponent() {
    return (
        <Nav className="bg-light shadow-sm p-3 mb-4">
            <NavItem className="ml-4">
                <StyledNavLink href="/">Home</StyledNavLink>
            </NavItem>
            <NavItem>
                <StyledNavLink href="/tiposDespesas">Tipos de Despesas</StyledNavLink>
            </NavItem>
            <NavItem>
                <StyledNavLink href="/despesas">Despesas</StyledNavLink>
            </NavItem>
        </Nav>
    );
}

export default NavbarComponent;
