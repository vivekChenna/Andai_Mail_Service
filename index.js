const  express  = require("express");
const  nodemailer = require("nodemailer");
const  cors  = require("cors");
const  dotenv  = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9065;

app.use(cors()); 
app.use(express.json()); 

app.post("/sendMail", async (req, res) => {
  const { name, email, score } = req.body;

  console.log(req.body);

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
    subject: "Interview Completed - Your Score",
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for giving the interview!</p>
      <p>Your interview score: <strong>${score}</strong></p>
      <p>We appreciate your time and effort.</p>
      <p>Best regards,<br>AndAI Platforms Pvt Ltd</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
