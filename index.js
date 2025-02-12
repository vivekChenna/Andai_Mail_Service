const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9065;

app.use(cors());
app.use(express.json());

app.post("/sendMail", async (req, res) => {
  const { name, email, score, downloadUrl } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Thank You for Completing Your Interview",
    html: `
   <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interview Completion - Your Score</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
</head>
<body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%); font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
    <!-- Header Banner -->
    <div style="background: linear-gradient(90deg, #2c3e50 0%, #3498db 100%); padding: 30px; text-align: center;">
      <img 
        src="https://firebasestorage.googleapis.com/v0/b/andai-admin-portal.appspot.com/o/images%2FnewAndai.jpg?alt=media&token=b92aa612-bf3a-4da5-a626-794649957d6c" 
        alt="Andai Logo" 
        style="width: 80px; height: auto; border-radius: 50%; background: white; padding: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" 
        class="animate__animated animate__fadeIn"
      />
    </div>
    
    <div style="padding: 40px; color: #333333;">
      <p style="font-size: 17px; margin-bottom: 20px;">Dear <strong style="color: #2c3e50; font-size: 18px;">${name}</strong>,</p>
      
      <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
        Thank you for taking the time to complete your interview with us. We appreciate your effort and interest in the position.
      </p>
      
      <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
        We have evaluated your responses, and here is your interview score:
      </p>
      
      <!-- Score Card -->
      <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
        <div style="font-size: 20px; color: #6c757d; margin-bottom: 10px;">Your Score</div>
        <div style="font-size: 48px; font-weight: bold; color: #2c3e50; margin: 10px 0;" class="animate__animated animate__fadeIn">
          ${score}<span style="font-size: 32px; color: #6c757d;">/10</span>
        </div>
      </div>

      <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
        You can view your detailed interview report using the link below:
      </p>

      <!-- Call to Action Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${downloadUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 16px; color: #ffffff; background: linear-gradient(90deg, #28a745 0%, #20c997 100%); text-decoration: none; border-radius: 8px; transition: transform 0.2s; box-shadow: 0 2px 10px rgba(40, 167, 69, 0.2);">
          View Report
        </a>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
        Our team will review your performance, and we will get back to you with the next steps soon.
      </p>
      
      <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
        If you have any questions, feel free to reach out.
      </p>
      
      <!-- Signature Section -->
      <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
        <p style="font-size: 16px; margin: 0; color: #555;">Best regards,</p>
        <p style="font-size: 17px; margin: 5px 0; color: #2c3e50; font-weight: 500;">Vidhi Chakraborty</p>
        <p style="font-size: 15px; margin: 0; color: #6c757d;">Customer Support Manager</p>
        <p style="font-size: 15px; margin: 5px 0; color: #2c3e50; font-weight: 500;">AndAI Platforms Pvt Ltd</p>
      </div>
    </div>
  </div>
</body>
</html>


        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
