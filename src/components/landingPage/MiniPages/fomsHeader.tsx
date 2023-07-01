import React from "react";
import styled from "styled-components";
import form from "../../../assets/landingPage/form.png";
import Search from "../../../assets/landingPage/search.png";
import ArrowDown from "../../../assets/landingPage/arrowDown.png";
import Image from "next/image";
import {
  NavBar,
  NavbarData,
  NavbarIcon,
  NavbarLeftSide,
  NavbarTitle,
} from "../../common/page";

const NavbarRightSide = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
const SearchInput = styled.input`
  height: 50px;
  width: 250px;
  padding: 3px 20px;
  margin: auto 20px;
  background-image: url(${Search.src});
  background-repeat: no-repeat;
  background-position: 250px 17px;
  background-size: 20px;
  border: 1px solid #b7b7ba;
  box-shadow: 0 0 10px #b7b7ba;
  @media (max-width: 1100px) {
    width: 120px;
  }
  @media (max-width: 750px) {
    display: none;
  }
`;
const SortBtn = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  padding: 3px 20px;
  cursor: pointer;
  justify-content: space-between;
  width: 130px;
  height: 50px;
  border: 1px solid #b7b7ba;
  box-shadow: 0 0 10px #b7b7ba;
  font-size: 14px;
  color: #004a91;
  @media (max-width: 550px) {
    width: 80px;
  }
  @media (max-width: 450px) {
    display: none;
  }
`;
const FomsHeader = () => {
  return (
    <NavBar>
      <NavbarLeftSide>
        <NavbarIcon>
          <Image src={form} alt="form" />
        </NavbarIcon>
        <NavbarData>
          <NavbarTitle>Forms</NavbarTitle>
          <div>All the compulsory forms are available here</div>
        </NavbarData>
      </NavbarLeftSide>
      <NavbarRightSide>
        <SearchInput placeholder="Search" />
        <SortBtn>
          <div>Sort By</div>
          <Image src={ArrowDown} alt="ArrowDown" />
        </SortBtn>
      </NavbarRightSide>
    </NavBar>
  );
};

export default FomsHeader;
