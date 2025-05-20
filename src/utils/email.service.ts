import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Hoặc sử dụng dịch vụ khác như Outlook, Yahoo, v.v.
  auth: {
    user: process.env.EMAIL_USER, // Email của bạn
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng (App Password)
  },
});

// Kiểm tra kết nối
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with email transporter:', error);
  } else {
    console.log('Email transporter is ready');
  }
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Email người gửi
    to, // Email người nhận
    subject,
    text,
    html, // Nội dung HTML (nếu có)
  };
  console.log('Sending email to:', to);
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
