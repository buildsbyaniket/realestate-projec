import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
      minlength: [2, "Title must contain at least 2 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },

    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      enum: [
        "Apartment",
        "Villa",
        "House",
        "Office",
        "Commercial",
        "Land",
        "Studio",
        "Other",
      ],
    },

    status: {
      type: String,
      enum: ["Available", "Sold", "Rented", "Pending", "Inactive"],
      default: "Available",
    },

    price: {
      type: Number,
      required: [true, "Property price is required"],
      min: [0, "Price cannot be negative"],
    },

    bedrooms: {
      type: Number,
      min: [0, "Bedrooms cannot be negative"],
      default: 0,
    },

    bathrooms: {
      type: Number,
      min: [0, "Bathrooms cannot be negative"],
      default: 0,
    },

    area: {
      type: Number,
      min: [0, "Area cannot be negative"],
      default: 0,
    },

    areaUnit: {
      type: String,
      enum: ["sqft", "sqm", "acre"],
      default: "sqft",
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    zipCode: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    images: {
      type: [String],
      default: [],
    },

    featuredImage: {
      type: String,
      default: "",
    },

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property =
  mongoose.models.Property ||
  mongoose.model("Property", propertySchema);

export default Property;