const SMTP_HOST = process.env.SMTP_HOST || "smtp.example.com"
const SMTP_PORT = process.env.SMTP_PORT || 587
const SMTP_SECURE = process.env.SMTP_SECURE === "true"
const EMAIL_FROM = process.env.EMAIL_FROM || "example@example.com"
const SMTP_USER = process.env.SMTP_USER || "you@example.com"
const SMTP_PASS = process.env.SMTP_PASS || "yourpassword"

export default {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    EMAIL_FROM,
    SMTP_USER,
    SMTP_PASS
}