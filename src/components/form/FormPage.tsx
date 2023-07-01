import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import FormHeader from "./FormHeader";
import CustodianForm from "./formPages/CustodianForm";
import SideBar from "./SideBar";
import OtherInformation from "./formPages/OtherInformation";
import Certification from "./formPages/Certification";

const Body = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

function FormPage() {
  const [activePage, setActivePage] = useState("Custodian Details");
  const [formId, SetFormId] = useState("");
  const [data, setData] = useState<{
    id: string;
    status: string;
    formTitle: string;
    generatedOn: string;
  } | null>(null);
  const pathname = usePathname();
  const FormId = pathname.split("/")[2];
  useEffect(() => {
    const GetData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/api/forms/${FormId}`,
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    GetData();
  }, [FormId]);
  return (
    <div>
      <FormHeader title={data?.formTitle || "New Form"} />
      <Body>
        <SideBar activePage={activePage} setActivePage={setActivePage} />
        {activePage === "Custodian Details" && (
          <CustodianForm setActivePage={setActivePage} SetFormId={SetFormId} />
        )}
        {activePage === "Other Information" && (
          <OtherInformation setActivePage={setActivePage} formId={formId} />
        )}
        {activePage === "Certification" && <Certification formId={formId} />}
      </Body>
    </div>
  );
}

export default FormPage;
