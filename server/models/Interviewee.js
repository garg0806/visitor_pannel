import mongoose from "mongoose";

const intervieweeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

   
    tenthMarks: {
  type: String,
  required: true,
},

twelfthMarks: {
  type: String,
  default: "",
},

undergraduateMarks: {
  type: String,
  default: "",
},

postgraduateMarks: {
  type: String,
  default: "",
},

    experience: {
      type: String,
      default: "",
    },

    applyingFor: {
      type: String,
      required: true,
    },

    interviewer: {
      type: String,
      required: true,
    },

    interviewDate: {
      type: Date,
      required: true,
    },

    

    resume: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [ "Scheduled",
    "Confirmed",
    "Checked In",
    "In Progress",
    "Completed",
    "Selected",
    "Rejected",
    "On Hold",
    "Shortlisted",
    "Waiting List",
    "Offer Released",
    "Offer Accepted",
    "Offer Rejected",
    "No Show",
    "Cancelled"],
      default: "Scheduled",
    },

    remarks: {
      type: String,
      default: "",
    },

    review: {
  type: String,
  default: "",
},

technicalRating: {
  type: Number,
  default: 0,
},

communicationRating: {
  type: Number,
  default: 0,
},

overallRating: {
  type: Number,
  default: 0,
},


  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interviewee", intervieweeSchema);