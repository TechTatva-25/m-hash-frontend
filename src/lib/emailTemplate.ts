export const createEmailTemplate = (message: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M-Hash Support Response</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f8fffe;
            color: #333333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
            padding: 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        .logo {
            width: 120px;
            height: auto;
            margin-bottom: 15px;
            position: relative;
            z-index: 1;
        }
        .header-title {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 1;
        }
        .header-subtitle {
            color: #e6fffa;
            font-size: 16px;
            margin: 8px 0 0 0;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 40px 30px;
            line-height: 1.6;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #16a34a;
            margin-bottom: 20px;
        }
        .message-content {
            background-color: #f8fffe;
            border-left: 4px solid #16a34a;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
            font-size: 16px;
            white-space: pre-wrap;
        }
        .support-info {
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .support-info h3 {
            color: #16a34a;
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .contact-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            font-size: 14px;
        }
        .contact-icon {
            width: 16px;
            height: 16px;
            margin-right: 10px;
            color: #16a34a;
        }
        .footer {
            background-color: #1f2937;
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }
        .signature {
            border-top: 2px solid #16a34a;
            padding-top: 20px;
            margin-top: 20px;
        }
        .signature-content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        .signature-logo {
            width: 60px;
            height: auto;
        }
        .signature-text {
            text-align: left;
        }
        .signature-name {
            font-weight: bold;
            font-size: 18px;
            color: #16a34a;
            margin: 0;
        }
        .signature-title {
            font-size: 14px;
            color: #6b7280;
            margin: 2px 0;
        }
        .signature-org {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin: 5px 0 0 0;
        }
        .social-links {
            margin-top: 20px;
            text-align: center;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #16a34a;
            text-decoration: none;
            font-size: 14px;
            padding: 8px 12px;
            border: 1px solid #16a34a;
            border-radius: 20px;
            transition: all 0.3s ease;
        }
        .social-links a:hover {
            background-color: #16a34a;
            color: #ffffff;
        }
        .footer-note {
            font-size: 12px;
            color: #9ca3af;
            margin-top: 20px;
            line-height: 1.4;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            transition: transform 0.2s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
        }
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            .content {
                padding: 30px 20px;
            }
            .header {
                padding: 25px 20px;
            }
            .signature-content {
                flex-direction: column;
                text-align: center;
            }
            .signature-text {
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section -->
        <div class="header">
            <img src="/M-Hash-Logo.png" alt="M-Hash Logo" class="logo">
            <h1 class="header-title">M-Hash</h1>
            <p class="header-subtitle">Innovation • Technology • Excellence</p>
        </div>

        <!-- Main Content -->
        <div class="content">
            <div class="greeting">
                Hello,
            </div>
            
            <p>Thank you for reaching out to M-Hash support. We have received your inquiry and are pleased to provide you with the following response:</p>
            
            <div class="message-content">
                ${message}
            </div>

            <p>We hope this information helps resolve your query. If you need any further assistance or have additional questions, please don't hesitate to reach out to us.</p>

            <div class="support-info">
                <h3>🚀 Need More Help?</h3>
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <span>Email: support@m-hash.com</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">🌐</span>
                    <span>Website: www.m-hash.com</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <span>Follow us on social media for updates</span>
                </div>
            </div>

            <center>
                <a href="https://www.m-hash.com/contact" class="cta-button">Contact Support Again</a>
            </center>

            <!-- Signature Section -->
            <div class="signature">
                <div class="signature-content">
                    <img src="https://your-domain.com/M-Hash-Logo2.png" alt="M-Hash" class="signature-logo">
                    <div class="signature-text">
                        <p class="signature-name">M-Hash Support Team</p>
                        <p class="signature-title">Technical Support Department</p>
                        <p class="signature-org">M-Hash Technology Solutions</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="social-links">
                <a href="https://www.linkedin.com/company/m-hash">LinkedIn</a>
                <a href="https://twitter.com/m-hash">Twitter</a>
                <a href="https://www.instagram.com/m-hash">Instagram</a>
                <a href="https://github.com/m-hash">GitHub</a>
            </div>
            
            <div class="footer-note">
                This email was sent from M-Hash Support System. If you no longer wish to receive these emails, 
                please <a href="#" style="color: #16a34a;">unsubscribe here</a>.<br>
                <br>
                © ${new Date().getFullYear()} M-Hash Technology Solutions. All rights reserved.<br>
                Address: [Your Company Address] | Phone: [Your Phone Number]
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Quick template for simple text responses
export const createSimpleEmailTemplate = (message: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #16a34a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>M-Hash Support</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for contacting M-Hash support. Here's our response to your inquiry:</p>
            <div style="background: white; padding: 20px; border-left: 4px solid #16a34a; margin: 20px 0;">
                ${message}
            </div>
            <p>Best regards,<br>
            <strong>M-Hash Support Team</strong><br>
            M-Hash Technology Solutions</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} M-Hash Technology Solutions. All rights reserved.
        </div>
    </div>
</body>
</html>
  `;
};
