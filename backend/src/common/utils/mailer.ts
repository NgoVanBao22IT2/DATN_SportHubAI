import nodemailer from 'nodemailer';
import { ServiceUnavailableError } from '../errors/AppError';
import logger from './logger';

type OtpMailContext = {
  to: string;
  code: string;
  purpose: 'verification' | 'password_reset';
  expiresInMinutes?: number;
};

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

const getSubject = (purpose: OtpMailContext['purpose']) => {
  if (purpose === 'password_reset') {
    return 'SportHubAI - Mã OTP khôi phục mật khẩu';
  }
  return 'SportHubAI - Mã OTP xác thực email';
};

const getTitle = (purpose: OtpMailContext['purpose']) => {
  if (purpose === 'password_reset') {
    return 'Khôi phục mật khẩu SportHubAI';
  }
  return 'Xác thực tài khoản SportHubAI';
};

const getDescription = (purpose: OtpMailContext['purpose']) => {
  if (purpose === 'password_reset') {
    return 'Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản SportHubAI. Dùng mã bên dưới để tiếp tục.';
  }

  return 'Chào mừng bạn đến với SportHubAI. Dùng mã OTP bên dưới để xác thực email và hoàn tất đăng ký.';
};

const getAccentColor = (purpose: OtpMailContext['purpose']) => {
  return purpose === 'password_reset' ? '#0f766e' : '#2563eb';
};

const getOtpLabel = (purpose: OtpMailContext['purpose']) => {
  return purpose === 'password_reset' ? 'OTP khôi phục mật khẩu' : 'OTP xác thực email';
};

const getHeadingIcon = (purpose: OtpMailContext['purpose']) => {
  return purpose === 'password_reset' ? '🔐' : '✅';
};

const buildEmailHtml = ({ code, purpose, expiresInMinutes = 10 }: OtpMailContext) => {
  const title = getTitle(purpose);
  const description = getDescription(purpose);
  const accentColor = getAccentColor(purpose);
  const otpLabel = getOtpLabel(purpose);
  const headingIcon = getHeadingIcon(purpose);

  return `
    <div style="margin:0;padding:0;background:#f6f9fc;">
      <div style="max-width:640px;margin:0 auto;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a;">
        <div style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
          <div style="background:linear-gradient(135deg, ${accentColor}, #0f172a);padding:28px 32px;color:#ffffff;">
            <div style="font-size:18px;font-weight:700;letter-spacing:0.3px;">SportHubAI</div>
            <div style="font-size:34px;line-height:1;margin-top:16px;">${headingIcon} ${title}</div>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">${description}</p>
            <div style="padding:18px 20px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;margin-bottom:18px;">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;margin-bottom:10px;">${otpLabel}</div>
              <div style="font-size:34px;font-weight:800;letter-spacing:8px;color:${accentColor};text-align:center;">${code}</div>
            </div>
            <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#475569;">Mã này có hiệu lực trong <strong>${expiresInMinutes} phút</strong>.</p>
            <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">Nếu bạn không yêu cầu thao tác này, hãy bỏ qua email này để bảo vệ tài khoản.</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const sendOtpEmail = async ({ to, code, purpose, expiresInMinutes = 10 }: OtpMailContext): Promise<void> => {
  const transporter = getTransporter();

  if (!transporter) {
    throw new ServiceUnavailableError(
      'Dịch vụ email chưa được cấu hình đầy đủ.',
      'SMTP_NOT_CONFIGURED',
      {
        required: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL'],
      }
    );
  }

  const subject = getSubject(purpose);
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

  if (!fromEmail) {
    throw new ServiceUnavailableError('Thiếu địa chỉ gửi email FROM_EMAIL.', 'SMTP_FROM_EMAIL_MISSING');
  }

  const html = buildEmailHtml({ to, code, purpose, expiresInMinutes });

  try {
    await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html,
    });
  } catch (error) {
    logger.error('[MAIL] Không thể gửi email OTP:', error);
    throw new ServiceUnavailableError('Không thể gửi email OTP lúc này. Vui lòng thử lại sau.', 'SMTP_SEND_FAILED');
  }

  logger.info(`[MAIL] Đã gửi email OTP tới ${to} (${purpose})`);
};
