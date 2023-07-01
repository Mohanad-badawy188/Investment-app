import styled from "styled-components";
export const NavBar = styled.div`
  height: 120px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (max-width: 1100px) {
    width: 96%;
    justify-content: center;
  }
`;
export const NavbarLeftSide = styled.div`
  display: flex;
  align-items: center;
`;
export const NavbarIcon = styled.div`
  margin: auto 20px;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-color: #004a91;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1100px) {
    width: 50px;
    height: 50px;
  }
`;

export const NavbarData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45px;
  font-weight: 300;
  color: #004a91;
  font-size: 14px;
  @media (max-width: 1100px) {
    height: 60px;
  }
`;
export const NavbarTitle = styled.div`
  color: #004a91;
  font-size: 18px;
  font-weight: 600;
`;

export const FormInput = styled.input`
  width: 350px;
  height: 3rem;
  margin: 1rem;
  height: 50px;
  padding: 3px 20px;
  border: 1px solid #b7b7ba;
  box-shadow: 0 0 3px #b7b7ba;
  ::placeholder {
    color: #004a91;
    font-weight: 400;
    font-size: 14px;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: 400px) {
    width: 250px;
  }
`;
export const ButtonsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-wrap: wrap;
`;

export const Btn = styled.button<{ outline: boolean }>`
  height: 50px;
  width: 200px;
  border: 1px solid #004a91;
  background-color: ${(props) => (props.outline ? "#fff" : "#004A91")};
  color: ${(props) => (props.outline ? "#004A91" : "#fff")};
  margin-left: 30px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  margin-top: 40px;
`;
