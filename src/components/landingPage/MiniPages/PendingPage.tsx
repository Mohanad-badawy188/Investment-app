import React from "react";
import {
  ActionIcon,
  Actions,
  DeleteBtn,
  FormRow,
  FormRowItem,
  FormRowItemsContainer,
  Status,
} from "./ApprovedPage";
import Link from "next/link";
import Pencel from "../../../assets/landingPage/pencil.png";
import Perview from "../../../assets/landingPage/perview.png";
import { MdDelete } from "react-icons/md";
import axios from "axios";
const PendingPage = (props: {
  id: string;
  title: string;
  generatedOn: string;
  status: string;
  index: number;
}) => {
  const handleClick = () => {
    const SendData = async () => {
      try {
        const res = await axios({
          method: "Delete",
          url: `https://precious-dragon-e4869a.netlify.app/api/forms/${props.id}`,
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
        <FormRowItem flex={"2"}>{props.title}</FormRowItem>
        <FormRowItem flex={"1"}>
          <Status ispending={props.status === "Pending" ? 1 : 0}>
            {props.status}
          </Status>
        </FormRowItem>
        <FormRowItem flex={"1"}>{props.generatedOn}</FormRowItem>
        <FormRowItem flex={"1"}>
          {" "}
          <Actions>
            <Link passHref href={`./forms/${props.id}`}>
              <ActionIcon background="#004A91" src={Pencel} alt="Pencel" />
            </Link>
            <Link passHref href={`./forms/${props.id}`}>
              <ActionIcon background="#FFFFFF" src={Perview} alt="Perview" />
            </Link>
            <DeleteBtn>
              <MdDelete onClick={() => handleClick()} />
            </DeleteBtn>
          </Actions>
        </FormRowItem>
      </FormRowItemsContainer>
    </FormRow>
  );
};

export default PendingPage;
