import React from "react";
import {
  NavBar,
  NavbarData,
  NavbarIcon,
  NavbarLeftSide,
  NavbarTitle,
} from "../common/page";
import Image from "next/image";
import form from "../../assets/landingPage/form.png";
function FormHeader(props: { title: string }) {
  return (
    <NavBar>
      <NavbarLeftSide>
        <NavbarIcon>
          <Image src={form} alt="form" />
        </NavbarIcon>
        <NavbarData>
          <NavbarTitle>{props?.title}</NavbarTitle>
          <div>Lorem ipsum dolor sit amet</div>
        </NavbarData>
      </NavbarLeftSide>
    </NavBar>
  );
}

export default FormHeader;
