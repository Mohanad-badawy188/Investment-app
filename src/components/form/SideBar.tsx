import React from "react";
import styled from "styled-components";
import { HiInformationCircle } from "react-icons/hi";
import { BiSolidUser } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";
const Container = styled.div`
  @media (max-width: 900px) {
    margin: 50px auto;
  }
`;
const SideBarItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 50px;
  background-color: ${(props) => (props.active === true ? "#004A91" : "white")};
  color: ${(props) => (props.active === true ? "#fff" : "#004A91")};
  font-weight: ${(props) => (props.active === true ? "600" : "400")};
  font-size: 15px;
  cursor: pointer;
`;
const SideBar = (props: {
  activePage: string;
  setActivePage: (value: string | ((prevVar: string) => string)) => void;
}) => {
  return (
    <Container>
      <SideBarItem
        active={props.activePage === "Custodian Details" ? true : false}
        onClick={() => props.setActivePage("Custodian Details")}>
        <BiSolidUser
          style={{ marginRight: "7px", width: "18px", height: "18px" }}
        />
        Custodian Details
      </SideBarItem>
      <SideBarItem
        active={props.activePage === "Other Information" ? true : false}
        onClick={() => props.setActivePage("Other Information")}>
        <HiInformationCircle
          style={{ marginRight: "7px", width: "18px", height: "18px" }}
        />
        Other Information
      </SideBarItem>
      <SideBarItem
        active={props.activePage === "Certification" ? true : false}
        onClick={() => props.setActivePage("Certification")}>
        <BsPatchCheckFill
          style={{ marginRight: "7px", width: "18px", height: "18px" }}
        />
        Certification
      </SideBarItem>
    </Container>
  );
};

export default SideBar;
