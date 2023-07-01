import React from "react";
import styled from "styled-components";
import Pencel from "../../../assets/landingPage/pencil.png";
import Perview from "../../../assets/landingPage/perview.png";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
export const FormRow = styled.div<{ header: number }>`
  height: 50px;
  display: flex;
  align-items: center;
  min-width: 750px;
  background-color: ${(props) => props.header && "#004A91"};
  color: ${(props) => (props.header ? "#fff" : "#004A91")};

  box-sizing: border-box;
`;
export const FormRowItemsContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: auto 15px;
  width: 90%;
  min-width: 90px;
  text-align: start;
`;
export const FormRowItem = styled.div<{ flex: string }>`
  text-align: start;
  flex: ${(props) => props.flex};
  padding: 5px;
  width: fit-content;
  min-width: 90px;
`;
export const Status = styled.div<{ ispending: number }>`
  color: ${(props) => (props.ispending ? "#1FE08F" : "#FFC107")};
  background: #ededef;
  width: fit-content;
  padding: 3px 6px;
`;
export const Actions = styled.div`
  display: flex;
  align-items: center;
`;
export const ActionIcon = styled(Image)<{ background: string }>`
  margin: auto 10px;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: ${(props) => props.background};
  cursor: pointer;
`;
export const DeleteBtn = styled.div`
  background-color: #dcac00;
  padding: 8px 10px;
  color: black;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;
`;
const ApprovedPage = (props: {
  id: string;
  title: string;
  generatedOn: string;
  index: number;
  user:string
}) => {
  const handleClick = () => {
    const SendData = async () => {
      try {
        const res = await axios({
          method: "Delete",
          url: `/forms/${props.id}`,
        });
        console.log("deleted successfully");
      } catch (err) {
        console.log(err);
      }
    };
    SendData();
  };
  return (
    <FormRow key={props.id} header={0}>
      <FormRowItemsContainer>
        <FormRowItem flex={"1"}>{props.index + 1}</FormRowItem>
        <FormRowItem flex={"2"}>{props.user}</FormRowItem>
        <FormRowItem flex={"1"}>{props.generatedOn}</FormRowItem>
        <FormRowItem flex={"1"}>
          <Actions>
            <Link passHref href={`./forms/${props.id}`}>
              <ActionIcon background="#004A91" src={Pencel} alt="Pencel" />
            </Link>
            <Link passHref href={`./forms/${props.id}`}>
              <ActionIcon background="#FFFFFF" src={Perview} alt="Perview" />
            </Link>
            <DeleteBtn onClick={() => handleClick()}>
              <MdDelete />
            </DeleteBtn>
          </Actions>
        </FormRowItem>
      </FormRowItemsContainer>
    </FormRow>
  );
};

export default ApprovedPage;
