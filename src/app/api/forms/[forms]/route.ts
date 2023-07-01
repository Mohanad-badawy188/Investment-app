import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://mohanadmbadawy:mohanadmbadawy@cluster0.6lvqekw.mongodb.net/";
async function connectToDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to the database");
    return client.db("InvestmentForm");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw error;
  }
}

type Database = {
  id: string;
  formTitle: string;
  generatedOn: Date;
  createdAt:Date;
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
const ForCors = {
  status: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};
const FilePath = `${process.cwd()}/Database.json`;

export async function GET(
  request: Request,
  { params }: { params: { forms: string } }
) {

  // Retrieve all records from the collection

  const db = await connectToDatabase();
  const collection = db.collection("Forms");

  const forms = await collection.find({}).toArray();
  console.log("All records:", forms);

  // get the data based on status then filter it based on date and get only the first 6 elements
  if (params.forms === "Approved") {
    const data = forms
      ?.filter(
        (item: Database) => item.status === "Approved" && item.certify === true
      )
      .sort(function (a: any, b: any) {
        return +new Date(b.createdAt) - +new Date(a.createdAt);
      })
      .splice(0, 6);
    return NextResponse.json(data, ForCors);
  } else if (params.forms === "Pending") {
    const data = forms
      ?.filter(
        (item: Database) => item.status !== "Approved" && item.certify === true
      )
      .sort(function (a: any, b: any) {
        return +new Date(b.createdAt) - +new Date(a.createdAt);
      })
      .splice(0, 6);
    return NextResponse.json(data, ForCors);
  } else if (params.forms) {
    const data = forms?.filter((item: Database) => item.id === params.forms)[0];
    if (data) {
      return NextResponse.json(data, ForCors);
    }
    return NextResponse.json("New Form", ForCors);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { forms: string } }
) {
  const db = await connectToDatabase();
  const collection = db.collection("Forms");

  const forms = await collection.find({}).toArray();
  console.log("All records:", forms);

  const data = await req.json();
  // get the item based on params and title provided in the post request
  if (params.forms && data.title === "CustodianDetails") {
    const FormItem = await collection.findOne({ id: params.forms });
    if (FormItem) {
      const result = await collection.updateOne(
        { id: params.forms },
        { $set: { user: data.data } }
        );
        return NextResponse.json(result);
    } else {
      // if the items is not in the josn file to update then it ll create a
      // new item in the file then bring the id to client side
      var formID = null;
      const myForm = {
        id: uuidv4(),
        createdAt: new Date(),
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
      formID = myForm.id;
      ///////////////////////////////////////////////////////////
      // Create a new record in the collection

      const db = await connectToDatabase();
      const collection = db.collection("Forms");

      const result = await collection.insertOne(myForm);
      console.log("Record created:", result);
      return NextResponse.json(formID, ForCors);
    }
  }
  if (params.forms === "newForm" && data.title === "OtherInfo") {
    console.log(data.formId);
    const result = await collection.updateOne(
      { id: data.formId },
      { $set: { otherInfo: data.data } }
    );
    console.log("Record updated:", result.modifiedCount);
    return NextResponse.json(result, ForCors);
  } else if (params.forms && data.title === "OtherInfo") {
    const result = await collection.updateOne(
      { id: params.forms },
      { $set: { otherInfo: data.data } }
    );

    return NextResponse.json(result, ForCors);
  }
  if (params.forms === "newForm" && data.title === "Certify") {
    console.log(data);
    const result = await collection.updateOne(
      { id: data.formId },
      { $set: { certify: data.data.certifyForm } }
    );

    return NextResponse.json(result, ForCors);
  }
  if (params.forms && data.title === "Certify") {
    const result = await collection.updateOne(
      { id: params.forms },
      { $set: { certify: data.data.certifyForm } }
    );

    return NextResponse.json(result, ForCors);
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { forms: string } }
) {
  const db = await connectToDatabase();
  const collection = db.collection("Forms");
console.log(params.forms)
  const result = await collection.deleteOne({ id: params.forms });
  console.log("Record deleted:", result.deletedCount);
  return NextResponse.json(result, ForCors);
}
