import Client from "../models/Client.js";
import Agent from "../models/Agent.js";
import Property from "../models/Property.js";

/*
=========================================================
CREATE CLIENT
POST /api/clients
ADMIN ONLY
=========================================================
*/

export const createClient = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      postalCode,
      clientType,
      budgetMin,
      budgetMax,
      preferredLocation,
      propertyType,
      purpose,
      status,
      notes,
      agent,
      properties,
    } = req.body || {};

    // Basic required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    // Validate client type
    const allowedTypes = ["buyer", "seller", "tenant", "investor"];
    if (clientType && !allowedTypes.includes(clientType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client type",
      });
    }

    // Validate status if provided
    const allowedStatus = ["lead", "active", "inactive", "converted"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client status",
      });
    }

    // Validate budget range
    if (budgetMin !== undefined && budgetMax !== undefined && budgetMin > budgetMax) {
      return res.status(400).json({
        success: false,
        message: "budgetMin cannot be greater than budgetMax",
      });
    }

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingClient = await Client.findOne({
      email: normalizedEmail,
    });

    if (existingClient) {
      return res.status(409).json({
        success: false,
        message: "A client with this email already exists",
      });
    }

    // Validate agent if supplied
    if (agent) {
      const existingAgent = await Agent.findById(agent);

      if (!existingAgent) {
        return res.status(404).json({
          success: false,
          message: "Agent not found",
        });
      }
    }

    // Validate properties if supplied
    if (properties && properties.length > 0) {
      const propertyCount = await Property.countDocuments({
        _id: { $in: properties },
      });

      if (propertyCount !== properties.length) {
        return res.status(404).json({
          success: false,
          message: "One or more properties were not found",
        });
      }
    }

    const client = await Client.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      address,
      city,
      state,
      country,
      postalCode: postalCode || "",
      clientType: clientType || "buyer",
      budgetMin: budgetMin !== undefined ? budgetMin : 0,
      budgetMax: budgetMax !== undefined ? budgetMax : 0,
      preferredLocation: preferredLocation || "",
      propertyType,
      purpose,
      status: status || "lead",
      notes,
      agent: agent || null,
      properties: properties || [],
      createdBy: req.user._id,
    });

    const populatedClient = await Client.findById(client._id)
      .populate("agent")
      .populate("properties");

    return res.status(201).json({
      success: true,
      message: "Client created successfully",
      client: populatedClient,
    });
  } catch (error) {
    console.error("Create client error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: error.message,
    });
  }
};

/*
=========================================================
GET ALL CLIENTS
GET /api/clients
ADMIN ONLY
=========================================================
*/

export const getClients = async (req, res) => {
  try {
    const {
      search,
      status,
      purpose,
      propertyType,
      agent,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (purpose) {
      filter.purpose = purpose;
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (agent) {
      filter.agent = agent;
    }

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.min(Math.max(Number(limit), 1), 100);

    const skip = (pageNumber - 1) * limitNumber;

    const [clients, total] = await Promise.all([
      Client.find(filter)
        .populate("agent")
        .populate("properties")
        .populate("createdBy", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),

      Client.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: clients.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      clients,
    });
  } catch (error) {
    console.error("Get clients error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
      error: error.message,
    });
  }
};

/*
=========================================================
GET SINGLE CLIENT
GET /api/clients/:id
ADMIN ONLY
=========================================================
*/

export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate("agent")
      .populate("properties")
      .populate("createdBy", "name email role");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    console.error("Get client error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch client",
      error: error.message,
    });
  }
};

/*
=========================================================
UPDATE CLIENT
PUT /api/clients/:id
ADMIN ONLY
=========================================================
*/

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      budget,
      propertyType,
      purpose,
      status,
      notes,
      agent,
      properties,
      isActive,
    } = req.body || {};

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();

      const emailExists = await Client.findOne({
        email: normalizedEmail,
        _id: { $ne: client._id },
      });

      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Another client already uses this email",
        });
      }

      client.email = normalizedEmail;
    }

    if (agent !== undefined) {
      if (agent) {
        const existingAgent = await Agent.findById(agent);

        if (!existingAgent) {
          return res.status(404).json({
            success: false,
            message: "Agent not found",
          });
        }
      }

      client.agent = agent || null;
    }

    if (properties !== undefined) {
      if (properties.length > 0) {
        const propertyCount = await Property.countDocuments({
          _id: { $in: properties },
        });

        if (propertyCount !== properties.length) {
          return res.status(404).json({
            success: false,
            message: "One or more properties were not found",
          });
        }
      }

      client.properties = properties;
    }

    if (name !== undefined) client.name = name.trim();
    if (phone !== undefined) client.phone = phone.trim();
    if (address !== undefined) client.address = address;
    if (city !== undefined) client.city = city;
    if (state !== undefined) client.state = state;
    if (country !== undefined) client.country = country;
    if (postalCode !== undefined) client.postalCode = postalCode;
    if (clientType !== undefined) client.clientType = clientType;
    if (budgetMin !== undefined) client.budgetMin = budgetMin;
    if (budgetMax !== undefined) client.budgetMax = budgetMax;
    if (preferredLocation !== undefined) client.preferredLocation = preferredLocation;
    if (propertyType !== undefined) client.propertyType = propertyType;
    if (purpose !== undefined) client.purpose = purpose;
    if (status !== undefined) client.status = status;
    if (notes !== undefined) client.notes = notes;
    if (isActive !== undefined) client.isActive = isActive;

    await client.save();

    const updatedClient = await Client.findById(client._id)
      .populate("agent")
      .populate("properties")
      .populate("createdBy", "name email role");

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    console.error("Update client error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error.message,
    });
  }
};

/*
=========================================================
DELETE CLIENT
DELETE /api/clients/:id
ADMIN ONLY
=========================================================
*/

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await client.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Delete client error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete client",
      error: error.message,
    });
  }
};

/*
=========================================================
ASSIGN AGENT
PUT /api/clients/:id/agent
ADMIN ONLY
=========================================================
*/

export const assignAgent = async (req, res) => {
  try {
    const { agentId } = req.body || {};

    if (!agentId) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        agent: agentId,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("agent")
      .populate("properties");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Agent assigned to client successfully",
      client,
    });
  } catch (error) {
    console.error("Assign agent error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign agent",
      error: error.message,
    });
  }
};

/*
=========================================================
ASSIGN PROPERTIES
PUT /api/clients/:id/properties
ADMIN ONLY
=========================================================
*/

export const assignProperties = async (req, res) => {
  try {
    const { propertyIds } = req.body || {};

    if (!Array.isArray(propertyIds)) {
      return res.status(400).json({
        success: false,
        message: "propertyIds must be an array",
      });
    }

    if (propertyIds.length > 0) {
      const propertyCount = await Property.countDocuments({
        _id: { $in: propertyIds },
      });

      if (propertyCount !== propertyIds.length) {
        return res.status(404).json({
          success: false,
          message: "One or more properties were not found",
        });
      }
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        properties: propertyIds,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("agent")
      .populate("properties");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Properties assigned successfully",
      client,
    });
  } catch (error) {
    console.error("Assign properties error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign properties",
      error: error.message,
    });
  }
};