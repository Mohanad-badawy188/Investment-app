import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import FomsHeader from "./MiniPages/fomsHeader";
import Link from "next/link";
import { Btn } from "../common/page";
import ApprovedPage, {
  FormRow,
  FormRowItem,
  FormRowItemsContainer,
} from "./MiniPages/ApprovedPage";
import PendingPage from "./MiniPages/PendingPage";
const Container = styled.div`
  margin: 50px auto;
  height: 500px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 90%;
  overflow: scroll;
  overflow-x: scroll;
  overflow-y: hidden;
`;
const StatusBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StatusBtn = styled.div<{ active: number }>`
  margin: 30px 0px;
  width: 115px;
  height: 45px;
  background-color: ${(props) => props.active && "#004A91"};
  color: ${(props) => (props.active ? "#fff" : "#004A91")};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const LandingPage = () => {
  const ApprovedFormTitles = [
    { flex: "1", name: "ID" },
    { flex: "2", name: "FormTitle" },
    { flex: "1", name: "Date" },
    { flex: "1", name: "Action" },
  ];
  const PendigFormTitles = [
    { flex: "1", name: "ID" },
    { flex: "2", name: "FormTitle" },
    { flex: "1", name: "status" },
    { flex: "1", name: "Date" },
    { flex: "1", name: "Action" },
  ];
  const [formsStatus, setFormsStatus] = useState("Approved");
  const [forms, setForms] = useState<Array<{
    id: string;
    status: string;
    formTitle: string;
    generatedOn: string;
  }> | null>(null);

  useEffect(() => {
    const GetData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `http://localhost:3000/api/forms/${formsStatus}`,
        });

        setForms(
          res.data.sort(function (a: any, b: any) {
            return +new Date(b.generatedOn) - +new Date(a.generatedOn);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    GetData();
  }, [formsStatus]);
  console.log(forms);
  return (
    <div>
      <FomsHeader />
      <Container>
        <StatusBtnContainer>
          <StatusBtn
            active={formsStatus === "Approved" ? 1 : 0}
            onClick={() => setFormsStatus("Approved")}>
            Approved
          </StatusBtn>
          <StatusBtn
            active={formsStatus === "Pending" ? 1 : 0}
            onClick={() => setFormsStatus("Pending")}>
            Pending
          </StatusBtn>
        </StatusBtnContainer>
        <FormRow header={1}>
          {formsStatus === "Approved" ? (
            <FormRowItemsContainer>
              {ApprovedFormTitles.map((item) => (
                <FormRowItem key={item.name} flex={item.flex}>
                  {item.name}
                </FormRowItem>
              ))}
            </FormRowItemsContainer>
          ) : (
            <FormRowItemsContainer>
              {PendigFormTitles.map((item) => (
                <FormRowItem key={item.name} flex={item.flex}>
                  {item.name}
                </FormRowItem>
              ))}
            </FormRowItemsContainer>
          )}
        </FormRow>
        {formsStatus === "Approved"
          ? forms
              ?.slice(0, 6)
              .map((item, index) => (
                <ApprovedPage
                  id={item.id}
                  key={item.id}
                  title={item.formTitle}
                  generatedOn={item.generatedOn}
                  index={index}
                />
              ))
          : forms
              ?.slice(0, 6)
              .map((item, index) => (
                <PendingPage
                  id={item.id}
                  key={item.id}
                  title={item.formTitle}
                  generatedOn={item.generatedOn}
                  status={item.status}
                  index={index}
                />
              ))}
      </Container>
      <Link href={`/forms/newForm`} passHref>
        <div>
          <Btn outline={false} style={{ margin: "30px auto" }}>
            Create form
          </Btn>
        </div>
      </Link>
    </div>
  );
};

export default LandingPage;
