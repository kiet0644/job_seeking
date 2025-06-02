// src/modules/auth/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/prismaClient';
import { sendEmail } from '@/utils/email.service';
import { IUserPayload, IAuthRegisterBody, IAuthLoginBody } from './auth.types';
import { Role, User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Đăng ký người dùng mới
 */
export async function registerUser({
  email,
  password,
  fullName,
  role,
  avatar,
  address,
  phone,
}: IAuthRegisterBody): Promise<{ message: string } | { error: string }> {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: 'Email already registered' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      fullName,
      role: role || Role.JOB_SEEKER,
      avatar: avatar || null,
      address: address || null,
      phone: phone || null,
      emailVerified: false,
    },
  });

  // Gửi email xác thực bằng hàm đã có template đẹp
  await sendVerificationEmail(email);

  return {
    message:
      'User registered successfully. Please check your email to verify your account.',
  };
}

/**
 * Đăng nhập người dùng
 */
export async function loginUser(
  body: IAuthLoginBody
): Promise<{ token: string; user: User } | { error: string }> {
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return { error: 'Email does not exist' };
  }

  const valid = await bcrypt.compare(body.password, user.passwordHash);
  if (!valid) {
    return { error: 'Wrong password' };
  }

  const payload: IUserPayload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  // Sau khi xác thực thành công:
  return { token, user }; // user là thông tin user lấy từ DB
}

/**
 * Gửi email đặt lại mật khẩu
 */
export async function sendPasswordReset(
  email: string
): Promise<{ message: string } | { error: string }> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: 'Email does not exist' };
  }

  const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '15m',
  });

  const appDomain = process.env.APP_DOMAIN || 'https://your-app.com';
  const resetLink = `${appDomain}/auth/reset-password?token=${resetToken}`;
  const subject = 'Password Reset Request';

  const text = `You requested a password reset. Use the following link to reset your password: ${resetLink}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;">Password Reset Request</h2>
      <p>Hi,</p>
      <p>You recently requested to reset your password for your account. Click the button below to reset it. <strong>This password reset link is only valid for the next 15 minutes.</strong></p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
      </div>
      <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
      <p>Thanks,<br>The Your App Team</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #555;">If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
      <p style="font-size: 12px; color: #555;"><a href="${resetLink}" style="color: #4CAF50;">${resetLink}</a></p>
    </div>
  `;

  try {
    await sendEmail(email, subject, text, html);
    return { message: 'Password reset email sent' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'Failed to send email' };
  }
}

/**
 * Đổi mật khẩu
 */
export async function changePassword(
  userId: string,
  newPassword: string
): Promise<{ message: string }> {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedPassword },
  });

  return { message: 'Password updated successfully' };
}

/**
 * Xác thực email
 */
export async function verifyEmail(
  token: string
): Promise<{ message: string } | { error: string }> {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as IUserPayload;

    await prisma.user.update({
      where: { id: payload.id },
      data: { emailVerified: true },
    });

    return { message: 'Email verified successfully' };
  } catch (err) {
    console.error('Error verifying email:', err);
    return { error: 'Invalid or expired token' };
  }
}

/**
 * Đăng xuất người dùng
 */
export async function logout(token: string): Promise<{ message: string }> {
  // TODO: Thêm token vào danh sách đen (blacklist) nếu cần
  console.log(`Token blacklisted: ${token}`);
  return { message: 'Logged out successfully' };
}

/**
 * Gửi email xác thực
 */
export async function sendVerificationEmail(
  email: string
): Promise<{ message: string } | { error: string }> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: 'Email does not exist' };
  }

  const verifyToken = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '1d',
  });

  const appDomain = process.env.APP_DOMAIN || 'https://your-app.com';
  const verifyLink = `${appDomain}/auth/verify-email?token=${verifyToken}`;
  const subject = 'Verify Your Email Address';

  const html = `
    <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 40px 0;">
      <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px;">
        <div style="text-align: center;">
          <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Verify Email" width="64" style="margin-bottom: 16px;" />
          <h2 style="color: #4CAF50; margin-bottom: 8px;">Verify Your Email</h2>
        </div>
        <p style="font-size: 16px; color: #333; margin-bottom: 24px;">
          Hi,<br>
          Thank you for registering! Please verify your email address to activate your account.
        </p>
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${verifyLink}" style="background: #4CAF50; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 5px; font-size: 16px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="font-size: 14px; color: #555;">
          If the button above doesn't work, copy and paste this link into your browser:<br>
          <a href="${verifyLink}" style="color: #4CAF50;">${verifyLink}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          If you did not create an account, you can safely ignore this email.<br>
          &copy; ${new Date().getFullYear()} Job Seeking App
        </p>
      </div>
    </div>
  `;

  try {
    await sendEmail(email, subject, '', html);
    return { message: 'Verification email sent' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'Failed to send email' };
  }
}
