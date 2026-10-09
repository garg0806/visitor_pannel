import Interviewee from "../models/Interviewee.js";

// Create Interviewee
export const createInterviewee = async (req, res) => {
  try {
    const interviewee = await Interviewee.create({
  ...req.body,
  resume: req.file
    ? `/uploads/resumes/${req.file.filename}`
    : "",

});
   

    res.status(201).json({
      success: true,
      message: "Interview Registered Successfully",
      interviewee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      
      
    });
  }
};

// Get All Interviewees
export const getInterviewees = async (req, res) => {
  try {
    const interviewees = await Interviewee.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      interviewees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      
      message: error.message,
    });
  }
};

// Get Single Interviewee
export const getInterviewee = async (req, res) => {
  try {
    const interviewee = await Interviewee.findById(req.params.id);

    if (!interviewee) {
      return res.status(404).json({
        success:false,
        
        message: "Interviewee not found",
        
      });
    }

    res.json({
      success: true,
      
      interviewee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
     
    });
  }
};

// Update Interviewee
export const updateInterviewee = async (req, res) => {
  try {
    const interviewee = await Interviewee.findByIdAndUpdate(
      req.params.id,
      
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Interview Updated Successfully",
      interviewee,
     
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      
      
    });
  }
};

// Delete Interviewee
export const deleteInterviewee = async (req, res) => {
  try {
    await Interviewee.findByIdAndDelete(req.params.id);
    
    

    res.json({
      success: true,
      message: "Interview Deleted Successfully",
  
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      

    });
  }
};