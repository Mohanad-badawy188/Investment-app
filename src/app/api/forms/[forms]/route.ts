import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");
type Database = {
  id: string;
  formTitle: string;
  generatedOn: Date;
  status: string;
  user: {
    name: string;
    AddressOfCorrespondence: string;
    AccountName: string;
    AccountNumber: number;
  };
  otherInfo: {
    Certificates: string;
    ProfitsOrAnyOtherIncome: string;
    Outcomes: string;
    OtherEntity: string;
  };
  certify: boolean;
};
const ForCors ={
  status: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
}
const FilePath = `${process.cwd()}/tmp/Database.json`
export async function GET(
  request: Request,
  { params }: { params: { forms: string } }
) {
  //read the json file to get the data
  const DB = await fs.readFileSync(
    FilePath,
    "utf8",
    (err: Error, data: Database) => {
      if (err) {
        console.error(err);
      } else {
        return data;
      }
    }
  );

  const forms = JSON.parse(DB);
  // get the data based on status then filter it based on date and get only the first 6 elements
  if (params.forms === "Approved") {
    const data = forms
      ?.filter(
        (item: Database) => item.status === "Approved" && item.certify === true
      )
      .sort(function (a: any, b: any) {
        return +new Date(b.generatedOn) - +new Date(a.generatedOn);
      })
      .splice(0, 6);
    return NextResponse.json(data,ForCors );
  } else if (params.forms === "Pending") {
    const data = forms
      ?.filter(
        (item: Database) => item.status !== "Approved" && item.certify === true
      )
      .sort(function (a: any, b: any) {
        return +new Date(b.generatedOn) - +new Date(a.generatedOn);
      })
      .splice(0, 6);
    return NextResponse.json(data, ForCors);
  } else if (params.forms) {
    const data = forms?.filter((item: Database) => item.id === params.forms)[0];
    if (data) {
      return NextResponse.json(data,ForCors);
    }
    return NextResponse.json("New Form", ForCors);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { forms: string } }
) {
  const DB = await fs.readFileSync(
    FilePath,    "utf8",
    (err: Error, data: any) => {
      if (err) {
        console.error(err);
      } else {
        return data;
      }
    }
  );
  const DataObj = JSON.parse(DB);

  const data = await req.json();
  console.log(data);
  const forms = JSON.parse(DB);
  // get the item based on params and title provided in the post request
  if (params.forms && data.title === "CustodianDetails") {
    const FormItem = DataObj.find((item: Database) => item.id === params.forms);
    if (FormItem) {
      FormItem.user = data.data;
      fs.writeFileSync(
        FilePath,        JSON.stringify(DataObj),
        (err: Error) => {
          if (err) {
            console.error(err);
          }
          console.log("done");
        }
      );
    } else {
      // if the items is not in the josn file to update then it ll create a
      // new item in the file then bring the id to client side
      var formID = null;
      const Form = {
        id: uuidv4(),
        formTitle: "Custodian Form",
        generatedOn: new Date().toDateString(),
        status: "Pending",
        user: data.data,
        otherInfo: {
          Certificates: "",
          ProfitsOrAnyOtherIncome: "",
          SalesOutcomes: "",
          OtherEntity: "",
        },
        certify: false,
      };
      console.log(Form.id);
      formID = Form.id;
      DataObj.push(Form);
      fs.writeFileSync(
        FilePath,        JSON.stringify(DataObj),
        (err: Error) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }

    return NextResponse.json(formID,ForCors);
  }
  if (params.forms === "newForm" && data.title === "OtherInfo") {
    console.log(data);
    const FormItem = DataObj.find((item: Database) => item.id === data.formId);
    FormItem.otherInfo = data.data;
    fs.writeFileSync(
      FilePath,      JSON.stringify(DataObj),
      (err: Error) => {
        if (err) {
          console.error(err);
        }
        console.log("done");
      }
    );

    return NextResponse.json(data,ForCors);
  } else if (params.forms && data.title === "OtherInfo") {
    const FormItem = DataObj.find((item: Database) => item.id === params.forms);
    FormItem.otherInfo = data.data;
    fs.writeFileSync(
      FilePath,      JSON.stringify(DataObj),
      (err: Error) => {
        if (err) {
          console.error(err);
        }
        console.log("done");
      }
    );

    return NextResponse.json(data,ForCors);
  }
  if (params.forms === "newForm" && data.title === "Certify") {
    console.log(data);
    const FormItem = DataObj.find((item: Database) => item.id === data.formId);
    FormItem.certify = data.data.certifyForm;
    fs.writeFileSync(
      FilePath,      JSON.stringify(DataObj),
      (err: Error) => {
        if (err) {
          console.error(err);
        }
        console.log("done");
      }
    );

    return NextResponse.json(data,ForCors);
  }
  if (params.forms && data.title === "Certify") {
    const FormItem = DataObj.find((item: Database) => item.id === params.forms);

    FormItem.certify = data.data.certifyForm;
    fs.writeFileSync(
      FilePath,      JSON.stringify(DataObj),
      (err: Error) => {
        if (err) {
          console.error(err);
        }
        console.log("done");
      }
    );

    return NextResponse.json(data,ForCors);
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { forms: string } }
) {
  const DB = await fs.readFileSync(
    FilePath,    "utf8",
    (err: Error, data: any) => {
      if (err) {
        console.error(err);
      } else {
        return data;
      }
    }
  );
  console.log(params.forms);
  // remove the item chosed by id from the file ("create new file with same content without the  item")
  const forms = JSON.parse(DB);
  const data = forms?.filter((item: Database) => item.id !== params.forms);
  fs.writeFileSync(
    FilePath,    JSON.stringify(data),
    (err: Error) => {
      if (err) {
        console.error(err);
      }
      console.log("done");
    }
  );

  return NextResponse.json(data,ForCors);
}
