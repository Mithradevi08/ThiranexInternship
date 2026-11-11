import ContactMessage from '../models/ContactMessage.js';
import { isConnectedToMongo, memoryMessages } from '../config/db.js';

export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Manual validation checks
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill out all required fields: name, email, subject, and message.'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long.'
      });
    }

    let savedMessage;

    if (isConnectedToMongo) {
      const newMessage = new ContactMessage({
        name,
        email,
        subject,
        message
      });
      savedMessage = await newMessage.save();
    } else {
      // In-memory fallback
      savedMessage = {
        _id: 'mem_' + Date.now(),
        name,
        email,
        subject,
        message,
        status: 'unread',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryMessages.unshift(savedMessage);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully. I will get back to you shortly.',
      data: savedMessage
    });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while processing your message.',
      error: error.message
    });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    let messages = [];

    if (isConnectedToMongo) {
      messages = await ContactMessage.find().sort({ createdAt: -1 });
    } else {
      messages = memoryMessages;
    }

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages.',
      error: error.message
    });
  }
};
