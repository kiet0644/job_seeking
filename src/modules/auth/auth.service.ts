// src/modules/auth/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/prismaClient.js';
import { sendEmail } from '@/utils/email.service.js';
import {
  IUserPayload,
  IAuthRegisterBody,
  IAuthLoginBody,
} from './auth.types.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Đăng ký người dùng mới
 */
export async function registerUser({
  email,
  password,
}: IAuthRegisterBody): Promise<{ message: string } | { error: string }> {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: 'Email already registered' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
    },
  });

  return { message: 'User registered successfully' };
}

/**
 * Đăng nhập người dùng
 */
export async function loginUser(
  body: IAuthLoginBody
): Promise<{ token: string } | { error: string }> {
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

  return { token };
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

  const resetLink = `https://your-app.com/reset-password?token=${resetToken}`;
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
