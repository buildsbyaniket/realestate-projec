import Property from "../models/property.js";

/*
=========================================================
CREATE PROPERTY
POST /api/properties
=========================================================
*/

export const createProperty = async (req, res) => {
  try {
    console.log('--- createProperty request start ---');
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    // Fields from multipart/form-data are in req.body (strings)
    const {
      title,
      description,
      propertyType,
      status,
      price,
      bedrooms,
      bathrooms,
      area,
      areaUnit,
      address,
      city,
      state,
      zipCode,
      country,
      agent,
      isFeatured,
    } = req.body;



    // Validation
    if (!title || !propertyType || price === undefined || !address || !city) {
      return res.status(400).json({
        success: false,
        message: "Title, property type, price, address and city are required",
      });
    }

    // Process uploaded files (multer stores them in req.files)
    const imagePaths = (req.files || []).map((file) => `/uploads/${file.filename}`);
    const featuredImage = imagePaths[0] || "";

    const property = await Property.create({
      title,
      description,
      propertyType,
      status,
      price,
      bedrooms,
      bathrooms,
      area,
      areaUnit,
      address,
      city,
      state,
      zipCode,
      country,
      images: imagePaths,
      featuredImage,
      agent: agent || null,
      isFeatured: isFeatured === "true" || isFeatured === true,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("Create property error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};

/*
=========================================================
GET ALL PROPERTIES
GET /api/properties
=========================================================
*/

export const getProperties = async (req, res) => {
  try {
    const {
      search,
      propertyType,
      status,
      city,
      minPrice,
      maxPrice,
      agentId,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      isActive: true,
    };

    // Agent filter
    if (agentId) {
      filter.agent = agentId;
    }

    // Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (status) {
      filter.status = status;
    }

    if (city) {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const pageNumber = Math.max(Number(page), 1);
    const pageLimit = Math.min(Math.max(Number(limit), 1), 100);

    const skip = (pageNumber - 1) * pageLimit;

    const [properties, total] = await Promise.all([
      Property.find(filter)
        .populate("agent")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit),

      Property.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageLimit),
      properties,
    });
  } catch (error) {
    console.error("Get properties error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

/*
=========================================================
GET SINGLE PROPERTY
GET /api/properties/:id
=========================================================
*/

export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("agent")
      .populate("createdBy", "name email");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("Get property error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

/*
=========================================================
UPDATE PROPERTY
PUT /api/properties/:id
=========================================================
*/

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "propertyType",
      "status",
      "price",
      "bedrooms",
      "bathrooms",
      "area",
      "areaUnit",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
      "images",
      "featuredImage",
      "agent",
      "isFeatured",
      "isActive",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });

    await property.save();

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error("Update property error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};

/*
=========================================================
DELETE PROPERTY
DELETE /api/properties/:id
=========================================================
*/

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await property.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

/*
=========================================================
PROPERTY STATISTICS
GET /api/properties/stats
=========================================================
*/

export const getPropertyStats = async (req, res) => {
  try {
    const [
      total,
      available,
      sold,
      rented,
      pending,
    ] = await Promise.all([
      Property.countDocuments({ isActive: true }),

      Property.countDocuments({
        isActive: true,
        status: "Available",
      }),

      Property.countDocuments({
        isActive: true,
        status: "Sold",
      }),

      Property.countDocuments({
        isActive: true,
        status: "Rented",
      }),

      Property.countDocuments({
        isActive: true,
        status: "Pending",
      }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        total,
        available,
        sold,
        rented,
        pending,
      },
    });
  } catch (error) {
    console.error("Property stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch property statistics",
    });
  }
};