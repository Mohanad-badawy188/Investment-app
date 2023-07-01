import React from "react";
import styled from "styled-components";
const FormItemHeader = styled.div`
  color: #272830;
  font-weight: 500;
  font-size: 14px;
  margin: 20px;
  margin-top: 30px;
`;
const RadioFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;
const RadioInputContainer = styled.div`
  display: flex;
  margin-right: 20px;
`;

const RadioInput = styled.input`
  margin-right: 10px;
  appearance: none;
  background-color: #fff;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid #d9d9d9;
  border-radius: 50%;
  transform: translateY(-0.075em);
  place-content: center;
  display: grid;
  &:before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 70ms transform ease-in-out;
    box-shadow: inset 1em 1em #004a91;
  }
  &:checked {
    &:before {
      transform: scale(1);
    }
    border: 0.15em solid #004a91;
  }
`;
const RadioForm = (props: {
  name: string;
  title: string;
  ref:null ,
  Click: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div >
      <FormItemHeader>{props.title}</FormItemHeader>
      <RadioFormContainer>
        <RadioInputContainer>
          <RadioInput
            onClick={(e) => props.Click(e)}
            value={"Client"}
            name={props.name}
            type="radio"
          />
          Client
        </RadioInputContainer>
        <RadioInputContainer>
          <RadioInput
            onClick={(e) => props.Click(e)}
            value={"Custodian"}
            name={props.name}
            type="radio"
          />
          Custodian
        </RadioInputContainer>
        <RadioInputContainer>
          <RadioInput
            onClick={(e) => props.Click(e)}
            value={"Other Entity"}
            name={props.name}
            type="radio"
          />
          Other Entity
        </RadioInputContainer>
      </RadioFormContainer>
    </div>
  );
};

export default RadioForm;
