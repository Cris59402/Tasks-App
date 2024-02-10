import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const TicketModel =
  mongoose.models.TicketModel || mongoose.model("TicketModel", ticketSchema);

export default TicketModel;
