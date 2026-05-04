import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    dateTime: {
      type: Date,
      default: null,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true },
);

export default mongoose.model("Task", taskSchema);
