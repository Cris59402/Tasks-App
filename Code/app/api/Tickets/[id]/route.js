import TicketModel from "@/app/(models)/TicketModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const foundTicket = await TicketModel.findOne({ _id: id });
  return NextResponse.json({ foundTicket }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const ticketData = body.data;
    const updateTicketData = await TicketModel.findByIdAndUpdate(id, {
      ...ticketData,
    });
    return NextResponse.json({ message: "Ticket actualizat" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await TicketModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Sters" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
