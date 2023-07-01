"use client";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import Notification from "../../assets/header/Notification.png";
import Moon from "../../assets/header/Moon.png";
import ArrowDown from "../../assets/header/ArrowDown.png";
import { FaBars } from "react-icons/fa";
const Container = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: end;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 700px;
  margin-right: 20px;
  @media (max-width: 750px) {
    display: none;
  }
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 180px;
  background-color: #004a91;
  color: white;
  cursor: pointer;
  margin: auto 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  text-shadow: -1px -1px 0 #000, 0 -1px 0 #000, 2px -1px 0 #000, 2px 0 0 #000,
    2px 2px 0 #000, 0 2px 0 #000, -1px 2px 0 #000, -1px 0 0 #000;

`;
const Icon = styled(Image)`
  height: 30px;
  width: 30px;
  cursor: pointer;
  margin: auto 10px;
`;
const LnaguageContainer = styled.div`
  height: 45px;
  width: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a2522;
  border-radius: 8px;
  margin: auto 10px;
`;
const Langauge = styled.div<{ color: string }>`
  width: 47px;
  height: 35px;
  display: flex;
  font-weight: 300;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  cursor: pointer;
`;
const WelcomeUser = styled.div`
  margin: auto 10px;
  padding: 3px 5px;
  border-radius: 5px;
  height: 60px;
  width: 260px;
  border: 1px solid rgba(0, 75, 145, 0.3);

  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 600px) {
width: 90%;
height: 100px;
margin-top: 50px !important;
}
`;
const WelcomeUserIcon = styled.div`
  background-color: #004a91;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WelcomeUserData = styled.div`
  color: #64646c;
  font-weight: 500;
  font-size: 15px;
`;
const UserName = styled.div`
  font-weight: 600;
  font-size: 18px;
`;
const MobileNavBar = styled.div<{ right: string , display:string }>`
  div {
    text-decoration: none;
    margin: 10% 1px;
    text-align: center;
  }
  overflow: hidden;
  display: ${props=>props.display};
  flex-direction: column;
  position: absolute;
  top: 0px;
  width: 55%;
  right: ${(props) => props.right};
  height: 100vh;
  background: white;
  z-index: 2;
  align-items: center;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.05);
  transition: all 1s  ease;
  animation: 1.8s ease 0s 1 normal Navbar ;
  border-radius: 25px 0 0 0;
  @keyframes Navbar {
  from {right: -55%;}
  to {right: -20px;}
}
  @media (min-width: 750px) {
    display: none;
  }

`;
const NavClose = styled.button`
  border: none;
  background: transparent;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  left: 10px;
  top: 10px;
  cursor: pointer;
`;
const OpenNav = styled.div`
  margin-right: 50px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.05);
  background-color: #2a2522;
  color: white;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  @media (min-width: 750px) {
    display: none;
  }
`;
const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const User = {
    name: "Mohanad Badawy",
  };
  const [active, setActive] = useState("English");
  return (
    <Container>
      <Wrap>
        <Button>Individual Investor</Button>
        <Icon src={Moon} alt="Moon" />
        <Icon src={Notification} alt="Notification" />
        <LnaguageContainer>
          <Langauge
            color={active === "English" ? "#DCAC00 " : "#2A2522"}
            onClick={() => setActive("English")}>
            EN
          </Langauge>
          <Langauge
            color={active === "Arabic" ? "#DCAC00" : "#2A2522"}
            onClick={() => setActive("Arabic")}>
            ع
          </Langauge>
        </LnaguageContainer>
        <WelcomeUser>
          <WelcomeUserIcon>
            {User.name
              .split(" ")
              .map(function (item) {
                return item[0];
              })
              .join("")}
          </WelcomeUserIcon>
          <WelcomeUserData>
            <div>welcome</div>
            <UserName>{User.name}</UserName>
          </WelcomeUserData>
          <Image src={ArrowDown} alt="ArrowDown" />
        </WelcomeUser>
      </Wrap>
      <MobileNavBar right={showNavbar ? "-20px" : "-100%"} display={showNavbar ? "flex":"none"}>
        <NavClose onClick={handleShowNavbar}>X</NavClose>
        <WelcomeUser>
          <WelcomeUserIcon>
            {User.name
              .split(" ")
              .map(function (item) {
                return item[0];
              })
              .join("")}
          </WelcomeUserIcon>
          <WelcomeUserData>
            <div>welcome</div>
            <UserName>{User.name}</UserName>
          </WelcomeUserData>
          <Image src={ArrowDown} alt="ArrowDown" />
        </WelcomeUser>
        <Button>Individual Investor</Button>
        <div>
          <Icon src={Moon} alt="Moon" />
          <Icon src={Notification} alt="Notification" />
        </div>
        <LnaguageContainer>
          <Langauge
            color={active === "English" ? "#DCAC00 " : "#2A2522"}
            onClick={() => setActive("English")}>
            EN
          </Langauge>
          <Langauge
            color={active === "Arabic" ? "#DCAC00" : "#2A2522"}
            onClick={() => setActive("Arabic")}>
            ع
          </Langauge>
        </LnaguageContainer>
      </MobileNavBar>
      <OpenNav>
        <FaBars onClick={handleShowNavbar} />
      </OpenNav>
    </Container>
  );
};

export default Header;
