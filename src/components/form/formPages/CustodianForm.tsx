import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Btn, ButtonsContainer, FormInput } from "@/components/common/page";
import axios from "axios";
import { usePathname } from "next/navigation";
type Inputs = {
  Name: string;
  AddressOfCorrespondence: string;
  AccountName: string;
  AccountNumber: Number;
};
export const FormContainer = styled.form`
  min-height: 320px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 100%;
  margin-left: 25px;
  padding: 20px;
`;
export const FormTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #004a91;
  margin-top: 20px;
  margin-left: 20px;
`;
const InputsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;
export const SingleInputContainer = styled.div`
  margin-bottom: 30px;
  position: relative;
`;

const ErrorMsg = styled.div`
  position: absolute;
  color: red;
  bottom: -10px;
  left: 30px;
`;
const CustodianForm = (props: {
  setActivePage: (value: string | ((prevVar: string) => string)) => void;
  SetFormId: (value: string | ((prevVar: string) => string)) => void;
}) => {
  const pathname = usePathname();
  const FormId = pathname.split("/")[2];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const SendData = async () => {
      try {
        const res = await axios({
          method: "Post",
          url: `/api/forms/${FormId}`,
          data: { data, title: "CustodianDetails" },
        });
        console.log(res, data);
        props.SetFormId(res.data)
        props.setActivePage("Other Information")
        
      } catch (err) {
        console.log(err);
      }
    };
    SendData();
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Custodian Details</FormTitle>
      <InputsContainer>
        <SingleInputContainer>
          <FormInput
            placeholder="Name *"
            {...register("Name", { required: true })}
          />
          {errors.Name && <ErrorMsg>Name can not be Empty</ErrorMsg>}
        </SingleInputContainer>
        <SingleInputContainer>
          <FormInput
            placeholder="Address of Correspondence *"
            {...register("AddressOfCorrespondence", { required: true })}
          />
          {errors.AddressOfCorrespondence && (
            <ErrorMsg>please Enter your Address</ErrorMsg>
          )}
        </SingleInputContainer>
        <SingleInputContainer>
          <FormInput
            placeholder="Account Name *"
            {...register("AccountName", { required: true })}
          />
          {errors.AccountName && <ErrorMsg> Name can not be empty</ErrorMsg>}
        </SingleInputContainer>
        <SingleInputContainer>
          <FormInput
            placeholder="Account Number  *"
            type="number"
            {...register("AccountNumber", { required: true })}
          />{" "}
          {errors.AccountNumber && (
            <ErrorMsg>please Enter a valid Number</ErrorMsg>
          )}
        </SingleInputContainer>
      </InputsContainer>
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

export default CustodianForm;
