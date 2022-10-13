import { NavLink } from "react-router-dom";
import * as styled from './styles';
import Logo from '../../assets/logo.png';
import { colors } from "../../colors";
import { globalContext } from "./../../store/GlobalStore";
import { useContext, useEffect } from "react";

type Props = {
  open: boolean;
}

function RightNav(props: Props) {
  const { globalState } = useContext(globalContext);
  let localCarts = globalState.carts as any;

  const activeStyle = {
    fontWeight: "bold",
    color: colors.blueActive,
    borderBottom: `5px solid ${colors.blueActive}`
  }
  return (
    <>
      <styled.Ul open={props.open}>
        <styled.LogoUl src={Logo} alt="Logo" />

        <NavLink  to="/"
            style={
                ({isActive}) => (
                isActive 
                ? activeStyle
                :{}
                )
            }
        end>
          <li>Products</li>
        </NavLink>
        <NavLink to="/cart"
          style={
                ({isActive}) => (
                isActive 
                ? activeStyle
                :{}
                )
            }
        >
          <li>
            Cart &nbsp;
            {localCarts.length > 0 && <span>{localCarts.length} product added </span>}
          </li>
        </NavLink>
      </styled.Ul>
    </>
  )
}

export default RightNav