import { User } from '../models/user.model.js';

class FormController {
  async submitForm(req, res) {
    try {
      console.log("Received form submission request");

      const {
        name,
        gender,
        dateOfBirth,
        fathersPhone,
        jeeRollNo,
        fathersName,
        category,
        phone,
        emailId,
        jeeRank,
        addressLine1,
        addressLine2,
        state,
        city,
        zipCode,
        schoolName,
        board,
        percentage,
        passingYear,
        photo,
        signature,
        documents = [],
      } = req.body;

      // Basic validation (optional, improve as needed)
      if (!name || !emailId || !photo || !signature || documents.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields or files",
        });
      }

      const userData = {
        name,
        gender,
        dateOfBirth,
        fathersPhone,
        jeeRollNo,
        fathersName,
        category,
        phone,
        emailId,
        jeeRank,
        addressLine1,
        addressLine2,
        state,
        city,
        zipCode,
        schoolName,
        board,
        percentage,
        passingYear,
        photo,
        signature,
        documents,
      };

      const newUser = new User(userData);
      const saved = await newUser.save();

      console.log("Form submitted and saved:", saved._id);

      res.status(201).json({
        success: true,
        message: "Form submitted successfully",
        data: {
          id: saved._id,
          name: saved.name,
          emailId: saved.emailId,
        },
      });
    } catch (error) {
      console.error("Form submission error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  async getSubmission(req, res) {
    try {
      const { id } = req.params;
      const submission = await User.findById(id);
      if (!submission) {
        return res.status(404).json({
          success: false,
          message: "Submission not found",
        });
      }

      res.json({ success: true, data: submission });
    } catch (error) {
      console.error("Error fetching submission:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  async getAllSubmissions(req, res) {
    try {
      const submissions = await User.find().sort({ createdAt: -1 });
      res.json({ success: true, data: submissions });
    } catch (error) {
      console.error("Error fetching all submissions:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
}

export default new FormController();
