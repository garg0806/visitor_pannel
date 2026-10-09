import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    personVisited: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    zip: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    aadhar: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },

    

    adminReview: {
  type: String,
  default: "",
},

rating: {
  type: Number,
  default: 0,
},

visitStatus: {
  type: String,
  enum: [
    "Pending",
    "Checked In",
    "Completed",
    "Cancelled",
  ],
  default: "Pending",
},


  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Visitor", visitorSchema);