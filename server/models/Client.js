import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      minlength: [2, "Client name must contain at least 2 characters"],
      maxlength: [100, "Client name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Client email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Client phone is required"],
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    budget: {
      type: Number,
      min: [0, "Budget cannot be negative"],
      default: 0,
    },

    clientType: {
      type: String,
      enum: ["buyer", "seller", "tenant", "investor"],
      required: [true, "Client type is required"],
    },
    postalCode: {
      type: String,
      trim: true,
      default: "",
    },
    budgetMin: {
      type: Number,
      min: [0, "Minimum budget cannot be negative"],
      default: 0,
    },
    budgetMax: {
      type: Number,
      min: [0, "Maximum budget cannot be negative"],
      default: 0,
    },
    preferredLocation: {
      type: String,
      trim: true,
      default: "",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [2000, "Notes cannot exceed 2000 characters"],
      default: "",
    },

    // Client ↔ Agent
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      default: null,
    },

    // Client ↔ Property
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client =
  mongoose.models.Client ||
  mongoose.model("Client", clientSchema);

export default Client;