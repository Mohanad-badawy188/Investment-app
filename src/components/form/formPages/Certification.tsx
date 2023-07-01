import React from "react";
import { FormContainer, FormTitle } from "./CustodianForm";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { Btn, ButtonsContainer } from "@/components/common/page";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

type Inputs = {
  certifyForm: string;
};
const CertificationForm = styled.div`
  height: 350px;
  width: 95%;
  margin: 20px 10px;
  background-color: #d9d9d9;
  color: #272830;
  font-size: 16px;
  padding: 10px;
  font-weight: 300;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CheckBoxContainer = styled.label`
  position: relative;
  margin: 25px;
  margin-bottom: 40px;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  color: #004a91;
`;
const Check = styled.div`
  height: 20px;
  width: 20px;

  background: #d9d9d9;
  border: none;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
  color: white;
`;
const CheckBoxInput = styled.input`
  visibility: hidden;
  &:checked + ${Check} {
    background: #004a91;
    color: white;
  }
`;
const CheckBox = styled.div`
  top: 1px;
  left: 1px;
  position: absolute;
`;
const SubText = styled.div`
  font-size: 14px;
  color: #004a91;
  margin: 30px 20px;
  width: 70%;
`;
export const ErrorMsg = styled.div`
  position: absolute;
  color: red;
  bottom: -20px;
  left: 20px;
`;
const Certification = (props: { formId: string }) => {
  const pathname = usePathname();
  const FormId = pathname.split("/")[2];
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // after submit the form sned the data to server side then return to landing page
    const SendData = async () => {
      try {
        const res = await axios({
          method: "Post",
          url: `http://localhost:3000/api/forms/${FormId}`,
          data: { data, title: "Certify", formId: props.formId },
        });
        console.log(res, data);
        push("/");
      } catch (err) {
        console.log(err);
      }
    };
    SendData();
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Certification</FormTitle>
      <CertificationForm>
        I hereby certify the information that I have provided in this
        subscription form is valid, correct, and complete, and an integral part
        of this subscription form, and XYZ Capital in its capacity as the
        &quot;Fund Manager&quot; has the full right to rely on such data and
        information. <br />
        <br /> The applicant confirms that they have read and understood the
        Terms and Conditions of the Fund, and accepts and agrees to what is
        stated therein irrevocably and unconditionally. <br /> <br />
        The applicant agrees to participate in the Fund with the number of units
        specified in This subscription form submitted by XYZ Capital in
        accordance with the provisions of the Investment Funds Regulations
        issued by the Capital Market Authority in the Kingdom of Saudi Arabia,
        and the payment of the subscription value in accordance with the Terms
        and Conditions and this subscription form. <br /> <br /> The applicant
        acknowledges that they fulfill all the requirements stipulated in the
        Terms and Conditions. Accordingly, by accepting the Fund Manager to the
        signed subscription form, they will become legally bound by all the
        terms, conditions, and documents related to it and to the offering of
        the Fund&apos;s units, and this subscription form is subject to all the
        provisions stipulated in the Terms and Conditions of the Fund. <br />{" "}
        <br />
      </CertificationForm>
      <CheckBoxContainer>
        <CheckBoxInput
          type="checkbox"
          {...register("certifyForm", { required: true })}
        />
        {errors.certifyForm && (
          <ErrorMsg>you must certify to submit the form</ErrorMsg>
        )}
        <Check>
          <CheckBox>
            <BsCheck />
          </CheckBox>
        </Check>{" "}
        Please tick the box to certify.
      </CheckBoxContainer>

      <FormTitle>Digitally Certify Document</FormTitle>
      <SubText>
        You can click on the below button it will redirect to a platform where
        you can <span style={{ fontWeight: "700" }}>E-Sign</span> the document
        to certify the details and the contract with
        <span style={{ fontWeight: "700" }}> XYZ.Capital</span>
      </SubText>
      <Btn outline={false} style={{ width: "300px" }} type="button">
        E-Sign Document
      </Btn>
      <ButtonsContainer>
        <Link
          passHref
          href={"/"}
          style={{ textDecoration: "none", color: "inherit" }}>
          <Btn outline={true} type="button">
            {" "}
            Cancel
          </Btn>
        </Link>
        <Btn outline={false} type="submit">
          Save
        </Btn>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default Certification;
