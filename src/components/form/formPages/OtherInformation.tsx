import React, { useEffect, useRef } from "react";
import {
  FormContainer,
  FormTitle,
  SingleInputContainer,
} from "./CustodianForm";
import styled from "styled-components";
import RadioForm from "./RadioForm";
import { Btn, ButtonsContainer, FormInput } from "@/components/common/page";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { usePathname } from "next/navigation";
import { ErrorMsg } from "./Certification";
type Inputs = {
  Certificates: string;
  ProfitsOrAny0therIncome: string;
  SalesOutcomes: string;
  OtherEntityInput: string;
};
const SubHeader = styled.div`
  font-size: 16px;
  color: #272830;
  margin: 20px;
  font-weight: 500;
`;
const SpaceAround = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 40px auto;
`;

const OtherInformation = (props: {
  setActivePage: (value: string | ((prevVar: string) => string)) => void;
  formId: string;
}) => {
  const pathname = usePathname();
  const FormId = pathname.split("/")[2];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(props);
    const SendData = async () => {
      try {
        const res = await axios({
          method: "Post",
          url: `/api/forms/${FormId}`,
          data: { data, title: "OtherInfo", formId: props.formId },
        });
        console.log(res, data);
        props.setActivePage("Certification");
      } catch (err) {
        console.log(err);
      }
    };
    SendData();
  };

  const handleClick = (e: any) => {
    if (e.target.name === "Certificates") {
      setValue("Certificates", e.target.value);
    } else if (e.target.name === "ProfitsOrAny0therIncome") {
      setValue("ProfitsOrAny0therIncome", e.target.value);
    } else if (e.target.name === "SalesOutcomes") {
      setValue("SalesOutcomes", e.target.value);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Other Information</FormTitle>
      <SubHeader>Where do you want to send the following:</SubHeader>
      <SpaceAround>
        <SingleInputContainer>
          <RadioForm
            Click={handleClick}
            {...register("Certificates", { required: true })}
            ref={null}
            title={"Certificates"}
          />
          {errors.Certificates && (
            <ErrorMsg>please select your Certificates</ErrorMsg>
          )}
        </SingleInputContainer>
        <SingleInputContainer>
          <RadioForm
            Click={handleClick}
            {...register("ProfitsOrAny0therIncome", { required: true })}
            title={"Profits or any other Income"}
            ref={null}
          />
                  {errors.ProfitsOrAny0therIncome && (
            <ErrorMsg>please select your Income</ErrorMsg>
          )}
        </SingleInputContainer>
        <SingleInputContainer>
          <RadioForm
            Click={handleClick}
            {...register("SalesOutcomes", { required: true })}
            title={"Sales Outcomes"}
            ref={null}
          />
          {errors.SalesOutcomes && (
            <ErrorMsg>please select your Sales Outcomes</ErrorMsg>
          )}
        </SingleInputContainer>
      </SpaceAround>
      <FormInput placeholder="Other Entity" {...register("OtherEntityInput")} />
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

export default OtherInformation;
