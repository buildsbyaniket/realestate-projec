import Agent from "../models/Agent.js";

/*
=========================================================
GET ALL AGENTS
GET /api/agents
=========================================================
*/

export const getAgents = async (req, res) => {
  try {
    const {
      search = "",
      status,
      department,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    /*
    -------------------------
    SEARCH
    -------------------------
    */

    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { location: searchRegex },
        { jobTitle: searchRegex },
      ];
    }

    /*
    -------------------------
    STATUS FILTER
    -------------------------
    */

    if (status && status !== "all") {
      filter.status = status;
    }

    /*
    -------------------------
    DEPARTMENT FILTER
    -------------------------
    */

    if (department && department !== "all") {
      filter.department = department;
    }

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.min(Math.max(Number(limit), 1), 100);

    const skip = (pageNumber - 1) * limitNumber;

    const [agents, total] = await Promise.all([
      Agent.find(filter)
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),

      Agent.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: agents.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      agents,
    });
  } catch (error) {
    console.error("Get agents error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch agents",
    });
  }
};

/*
=========================================================
GET AGENT BY ID
GET /api/agents/:id
=========================================================
*/

export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    return res.status(200).json({
      success: true,
      agent,
    });
  } catch (error) {
    console.error("Get agent error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch agent",
    });
  }
};

/*
=========================================================
CREATE AGENT
POST /api/agents
=========================================================
*/

export const createAgent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      avatar,
      jobTitle,
      department,
      location,
      status,
      managedProperties,
      propertiesSold,
      propertiesListed,
      rating,
      bio,
    } = req.body || {};

    /*
    -------------------------
    VALIDATION
    -------------------------
    */

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    /*
    -------------------------
    CHECK DUPLICATE EMAIL
    -------------------------
    */

    const existingAgent = await Agent.findOne({
      email: normalizedEmail,
    });

    if (existingAgent) {
      return res.status(409).json({
        success: false,
        message: "An agent with this email already exists",
      });
    }

    /*
    -------------------------
    CREATE AGENT
    -------------------------
    */

    const agent = await Agent.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone || "",
      avatar: avatar || "",
      jobTitle: jobTitle || "Property Agent",
      department: department || "Residential",
      location: location || "",
      status: status || "active",
      managedProperties: Number(managedProperties) || 0,
      propertiesSold: Number(propertiesSold) || 0,
      propertiesListed: Number(propertiesListed) || 0,
      rating: Number(rating) || 0,
      bio: bio || "",
      isActive: status !== "inactive",
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Agent created successfully",
      agent,
    });
  } catch (error) {
    console.error("Create agent error:", error);

    /*
    Duplicate MongoDB unique index
    */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An agent with this email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create agent",
    });
  }
};

/*
=========================================================
UPDATE AGENT
PUT /api/agents/:id
=========================================================
*/

export const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    const allowedFields = [
      "name",
      "email",
      "phone",
      "avatar",
      "jobTitle",
      "department",
      "location",
      "status",
      "managedProperties",
      "propertiesSold",
      "propertiesListed",
      "rating",
      "bio",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        agent[field] = req.body[field];
      }
    });

    if (req.body.email) {
      agent.email = req.body.email.trim().toLowerCase();
    }

    if (req.body.status) {
      agent.isActive = req.body.status === "active";
    }

    await agent.save();

    return res.status(200).json({
      success: true,
      message: "Agent updated successfully",
      agent,
    });
  } catch (error) {
    console.error("Update agent error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An agent with this email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update agent",
    });
  }
};

/*
=========================================================
DELETE AGENT
DELETE /api/agents/:id
=========================================================
*/

export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    await agent.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
    });
  } catch (error) {
    console.error("Delete agent error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete agent",
    });
  }
};

/*
=========================================================
AGENT DASHBOARD STATISTICS
GET /api/agents/stats
=========================================================
*/

export const getAgentStats = async (req, res) => {
  try {
    const [
      totalAgents,
      activeAgents,
      inactiveAgents,
      managedPropertiesResult,
      propertiesSoldResult,
    ] = await Promise.all([
      Agent.countDocuments(),

      Agent.countDocuments({
        status: "active",
      }),

      Agent.countDocuments({
        status: "inactive",
      }),

      Agent.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$managedProperties",
            },
          },
        },
      ]),

      Agent.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$propertiesSold",
            },
          },
        },
      ]),
    ]);

    const managedProperties =
      managedPropertiesResult.length > 0
        ? managedPropertiesResult[0].total
        : 0;

    const propertiesSold =
      propertiesSoldResult.length > 0
        ? propertiesSoldResult[0].total
        : 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalAgents,
        activeAgents,
        inactiveAgents,
        managedProperties,
        propertiesSold,
      },
    });
  } catch (error) {
    console.error("Get agent stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch agent statistics",
    });
  }
};