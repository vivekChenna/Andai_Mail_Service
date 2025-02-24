const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9065;

app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/sendMail", async (req, res) => {
  const { name, email, score, downloadUrl } = req.body;

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    cc : process.env.SMTP_EMAIL,
    subject: "Interview Report",
    html: `
   <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interview Completion - Your Score</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f3f3; font-family: Arial, sans-serif;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" bgcolor="#f3f3f3">
    <tr>
      <td align="center" style="padding: 20px;">
        
        <!-- MAIN CONTAINER -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#ffffff" style="width: 600px; max-width: 100%; box-shadow: 0px 2px 10px rgba(0,0,0,0.1); border: 1px solid #dddddd;">
          
          <!-- HEADER SECTION -->
          <tr>
            <td align="center" style="background-color: #2c3e50; padding: 30px;">
              <img src="https://firebasestorage.googleapis.com/v0/b/andai-admin-portal.appspot.com/o/images%2Fpoorit.jpg?alt=media&token=651b6cff-d947-4e79-afb9-aa1c61bb7095" 
                   alt="Poorit Logo" 
                   width="80" 
                   style="display: block; width: 80px; border-radius: 50%; background-color: #ffffff; padding: 10px; box-shadow: 0px 2px 5px rgba(0,0,0,0.1);" />
            </td>
          </tr>
          
          <!-- BODY SECTION -->
          <tr>
            <td align="left" style="padding: 40px; color: #333333;">
              <p style="font-size: 17px; margin-bottom: 20px;">
                Dear <strong style="color: #2c3e50; font-size: 18px;">${name}</strong>,
              </p>
              <p style="font-size: 16px; margin-bottom: 20px; color: #555;">
                We have evaluated your responses, and here is your interview score:
              </p>

              <!-- SCORE CARD -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#e9ecef" style="border-radius: 8px; padding: 20px; text-align: center;">
                <tr>
                  <td style="font-size: 20px; color: #6c757d; padding-bottom: 10px;">Your Score</td>
                </tr>
                <tr>
                  <td style="font-size: 48px; font-weight: bold; color: #2c3e50;">
                    ${score}<span style="font-size: 32px; color: #6c757d;">/10</span>
                  </td>
                </tr>
              </table>

              <p style="font-size: 16px; margin-top: 25px; color: #555;">
                You can view your detailed interview report using the link below:
              </p>

              <!-- BUTTON -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 20px;">
                <tr>
                  <td align="center" bgcolor="#28a745" style="border-radius: 8px;">
                    <a href="${downloadUrl}" target="_blank" 
                       style="display: inline-block; padding: 14px 28px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 8px; background-color: #28a745;">
                      View Report
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 16px; margin-top: 25px; color: #555;">
                If you have any questions, feel free to reach out.
              </p>

              <!-- SIGNATURE -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 1px solid #dddddd; padding-top: 20px;">
                <tr>
                  <td>
                    <p style="font-size: 16px; margin: 0; color: #2c3e50;">Best regards,</p>
                    <p style="font-size: 16px; margin: 8px 0 0 0; color: #2c3e50; font-weight: 500;">Vidhi Chakraborty</p>
                    <p style="font-size: 14px; margin: 4px 0; color: #64748b;">Customer Support Manager</p>
                    <p style="font-size: 14px; margin: 4px 0; color: #2c3e50;">Poorit Technologies powered by AndAIPlatforms</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>

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

app.post("/interviewCompletion", async (req, res) => {
  const { email, name } = req.body;

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
  <title>AI Review in Progress - AndAI</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
</head>
<body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #eef2f3 0%, #dfe5e8 100%); font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
    
    <!-- Header Section -->
    <div style="background: linear-gradient(90deg, #2c3e50 0%, #3498db 100%); padding: 30px; text-align: center;">
      <img 
        src="https://firebasestorage.googleapis.com/v0/b/andai-admin-portal.appspot.com/o/images%2Fpoorit.jpg?alt=media&token=651b6cff-d947-4e79-afb9-aa1c61bb7095" 
        alt="Poorit Logo" 
        style="width: 80px; height: auto; border-radius: 50%; background: white; padding: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" 
        class="animate__animated animate__fadeIn"
      />
    </div>
    
    <!-- Content Section -->
    <div style="padding: 40px; color: #333;">
      <p style="font-size: 17px; margin-bottom: 20px;">Dear <strong style="color: #2c3e50; font-size: 18px;">${name}</strong>,</p>
      
      <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
        Thank you for completing your interview with us. Your effort and time are greatly appreciated.
      </p>

      <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
        Your responses are now being reviewed by our advanced AI Agents. Based on their analysis, you will soon receive a detailed interview report providing insights into your performance.
      </p>

      <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
        If you have any questions in the meantime, feel free to reach out to us.
      </p>
      
      <!-- Closing Section -->
      <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
      <p style="font-size: 16px; margin: 0; color: #2c3e50;">Best regards,</p>
                <p style="font-size: 16px; margin: 8px 0 0 0; color: #2c3e50; font-weight: 500;">Vidhi Chakraborty</p>
                <p style="font-size: 14px; margin: 4px 0; color: #64748b;">Customer Support Manager</p>
                <p style="font-size: 14px; margin: 4px 0; color: #2c3e50;">Poorit Technologies powered by AndAIPlatforms</p>
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
