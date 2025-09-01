// Email utility functions for the Resume Strength Analyzer

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export function generateWelcomeEmail(userEmail: string, userName?: string): EmailTemplate {
  const name = userName || userEmail.split('@')[0]
  
  return {
    subject: 'Welcome to Resume Strength Analyzer!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Welcome to Resume Strength Analyzer!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name}! 👋</h2>
            <p>Welcome to Resume Strength Analyzer! We're excited to help you create a powerful resume that stands out to employers.</p>
            
            <h3>🚀 What you can do now:</h3>
            <ul>
              <li>📄 Upload your resume (PDF or text format)</li>
              <li>📊 Get detailed analysis with scores</li>
              <li>💡 Receive personalized recommendations</li>
              <li>🎯 Improve your ATS (Applicant Tracking System) compatibility</li>
              <li>📈 Track your progress with multiple reports</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="http://localhost:3001/dashboard" class="button">Start Analyzing Your Resume</a>
            </div>
            
            <h3>🔧 Features Available:</h3>
            <p><strong>Resume Analysis Scores:</strong></p>
            <ul>
              <li>Overall Strength Score</li>
              <li>Skills Coverage Assessment</li>
              <li>Experience Relevance Rating</li>
              <li>ATS Readiness Check</li>
              <li>Impact & Achievement Analysis</li>
            </ul>
            
            <p><strong>Smart Recommendations:</strong></p>
            <ul>
              <li>Missing skill identification</li>
              <li>Formatting improvements</li>
              <li>Content enhancement suggestions</li>
              <li>Industry-specific optimizations</li>
            </ul>
            
            <p>Need help? Just reply to this email or visit our dashboard for more information.</p>
            
            <p>Best regards,<br>The Resume Strength Analyzer Team</p>
          </div>
          <div class="footer">
            <p>This email was sent because you registered for Resume Strength Analyzer.</p>
            <p>© 2025 Resume Strength Analyzer. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to Resume Strength Analyzer!
      
      Hello ${name}!
      
      Welcome to Resume Strength Analyzer! We're excited to help you create a powerful resume that stands out to employers.
      
      What you can do now:
      • Upload your resume (PDF or text format)
      • Get detailed analysis with scores
      • Receive personalized recommendations
      • Improve your ATS compatibility
      • Track your progress with multiple reports
      
      Visit: http://localhost:3001/dashboard
      
      Features Available:
      - Resume Analysis Scores (Overall, Skills, Experience, ATS, Impact)
      - Smart Recommendations (Missing skills, formatting, content improvements)
      
      Need help? Just reply to this email.
      
      Best regards,
      The Resume Strength Analyzer Team
    `
  }
}

export function generateLoginNotificationEmail(userEmail: string, loginTime: Date, userAgent?: string): EmailTemplate {
  const name = userEmail.split('@')[0]
  const timeString = loginTime.toLocaleString()
  
  return {
    subject: 'Resume Analyzer Login Notification',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
          .footer { text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Login Notification</h1>
          </div>
          <div class="content">
            <h2>Hello ${name}!</h2>
            <p>We wanted to let you know that your account was accessed.</p>
            
            <div class="info-box">
              <h3>Login Details:</h3>
              <p><strong>📅 Time:</strong> ${timeString}</p>
              <p><strong>📧 Email:</strong> ${userEmail}</p>
              ${userAgent ? `<p><strong>🖥️ Device:</strong> ${userAgent}</p>` : ''}
            </div>
            
            <p>If this was you, no action is needed. If you didn't log in, please contact us immediately.</p>
            
            <p>For security, always:</p>
            <ul>
              <li>Use a strong, unique password</li>
              <li>Log out when using shared computers</li>
              <li>Report suspicious activity</li>
            </ul>
            
            <p>Happy analyzing!<br>Resume Strength Analyzer Team</p>
          </div>
          <div class="footer">
            <p>© 2025 Resume Strength Analyzer. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Login Notification - Resume Strength Analyzer
      
      Hello ${name}!
      
      Your account was accessed at: ${timeString}
      Email: ${userEmail}
      ${userAgent ? `Device: ${userAgent}` : ''}
      
      If this wasn't you, please contact us immediately.
      
      For security:
      • Use a strong, unique password
      • Log out when using shared computers
      • Report suspicious activity
      
      Resume Strength Analyzer Team
    `
  }
}

export async function sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
  try {
    console.log('📧 Sending email to:', to)
    console.log('📧 Subject:', template.subject)
    console.log('📧 Email content preview:', template.text.slice(0, 200) + '...')

    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Email sent successfully (mock)')
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}
