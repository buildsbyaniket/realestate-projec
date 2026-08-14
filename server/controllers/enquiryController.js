import Enquiry from '../models/Enquiry.js';
import Agent from '../models/Agent.js';

// Create a new enquiry (user -> agent)
export const createEnquiry = async (req, res) => {
  try {
    const { agentId, message } = req.body;
    const senderId = req.user._id; // authenticated user (could be client or normal user)

    if (!agentId || !message) {
      return res.status(400).json({ success: false, message: 'agentId and message are required' });
    }

    // Verify agent exists
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    const enquiry = await Enquiry.create({
      sender: senderId,
      agent: agentId,
      message,
    });

    return res.status(201).json({ success: true, message: 'Enquiry created', enquiry });
  } catch (error) {
    console.error('Create enquiry error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create enquiry', error: error.message });
  }
};

// Get enquiries for the logged‑in agent
export const getEnquiriesForAgent = async (req, res) => {
  try {
    const agentId = req.user._id; // only agents can access their enquiries
    const enquiries = await Enquiry.find({ agent: agentId })
      .populate('sender', 'name email')
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, enquiries });
  } catch (error) {
    console.error('Get enquiries error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch enquiries', error: error.message });
  }
};

// Update status / add response (admin or agent)
export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (status) enquiry.status = status;
    if (response) {
      enquiry.response = response;
      enquiry.respondedAt = new Date();
      enquiry.status = 'resolved';
    }

    await enquiry.save();
    return res.status(200).json({ success: true, message: 'Enquiry updated', enquiry });
  } catch (error) {
    console.error('Update enquiry error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update enquiry', error: error.message });
  }
};
