import Report from "../models/Report.js";
import Property from "../models/property.js";
import Agent from "../models/Agent.js";
import Client from "../models/Client.js";

/*
=========================================================
CREATE REPORT
ADMIN ONLY
=========================================================
*/

export const createReport = async (req, res, next) => {
  try {
    const {
      type,
      title,
      description,
      property,
      client,
      agent,
      amount,
      status,
      reportDate,
    } = req.body;

    if (!type || !title) {
      return res.status(400).json({
        success: false,
        message: "Report type and title are required",
      });
    }

    // Validate property if provided
    if (property) {
      const propertyExists = await Property.findById(property);

      if (!propertyExists) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
    }

    // Validate client if provided
    if (client) {
      const clientExists = await Client.findById(client);

      if (!clientExists) {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }
    }

    // Validate agent if provided
    if (agent) {
      const agentExists = await Agent.findById(agent);

      if (!agentExists) {
        return res.status(404).json({
          success: false,
          message: "Agent not found",
        });
      }
    }

    const report = await Report.create({
      type,
      title,
      description,
      property: property || null,
      client: client || null,
      agent: agent || null,
      amount: amount || 0,
      status: status || "pending",
      reportDate: reportDate || new Date(),
      createdBy: req.user._id,
    });

    const populatedReport = await Report.findById(report._id)
      .populate("property")
      .populate("client")
      .populate("agent")
      .populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report: populatedReport,
    });
  } catch (error) {
    next(error);
  }
};

/*
=========================================================
GET ALL REPORTS
ADMIN ONLY
=========================================================
*/

export const getReports = async (req, res, next) => {
  try {
    const {
      type,
      status,
      agent,
      client,
      property,
      startDate,
      endDate,
      month,
      year,
    } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;
    if (agent) filter.agent = agent;
    if (client) filter.client = client;
    if (property) filter.property = property;

    if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
      filter.reportDate = { $gte: startOfMonth, $lte: endOfMonth };
    } else if (startDate || endDate) {
      filter.reportDate = {};

      if (startDate) {
        filter.reportDate.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        filter.reportDate.$lte = end;
      }
    }

    const reports = await Report.find(filter)
      .populate("property")
      .populate("client")
      .populate("agent")
      .populate("createdBy", "name email")
      .sort({ reportDate: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    next(error);
  }
};

/*
=========================================================
GET SINGLE REPORT
ADMIN ONLY
=========================================================
*/

export const getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("property")
      .populate("client")
      .populate("agent")
      .populate("createdBy", "name email");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    next(error);
  }
};

/*
=========================================================
UPDATE REPORT
ADMIN ONLY
=========================================================
*/

export const updateReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const allowedFields = [
      "type",
      "title",
      "description",
      "property",
      "client",
      "agent",
      "amount",
      "status",
      "reportDate",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        report[field] = req.body[field];
      }
    });

    await report.save();

    const updatedReport = await Report.findById(report._id)
      .populate("property")
      .populate("client")
      .populate("agent")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    next(error);
  }
};

/*
=========================================================
DELETE REPORT
ADMIN ONLY
=========================================================
*/

export const deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await Report.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
=========================================================
REPORT SUMMARY / DASHBOARD STATISTICS
ADMIN ONLY
=========================================================
*/

export const getReportSummary = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const matchQuery = {};

    if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
      matchQuery.reportDate = { $gte: startOfMonth, $lte: endOfMonth };
    }

    const [
      totalProperties,
      activeProperties,
      soldProperties,
      totalAgents,
      totalClients,
      totalReports,
      completedReports,
      revenueResult,
    ] = await Promise.all([
      Property.countDocuments(),

      // Active properties are those that are not sold yet (e.g., Available, Pending, Rented, Inactive)
      Property.countDocuments({
        status: { $ne: "Sold" },
      }),

      // Sold properties count
      Property.countDocuments({
        status: "Sold",
      }),

      Agent.countDocuments(),

      Client.countDocuments(),

      Report.countDocuments(matchQuery),

      Report.countDocuments({
        ...matchQuery,
        status: "completed",
      }),

      Report.aggregate([
        {
          $match: {
            ...matchQuery,
            type: "property_sale",
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]),
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.status(200).json({
      success: true,

      summary: {
        totalProperties,
        activeProperties,
        soldProperties,
        totalAgents,
        totalClients,
        totalReports,
        completedReports,
        totalRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
};