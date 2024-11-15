import dotenv from 'dotenv';
dotenv.config();

const config ={
    port: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || '',
    EMAIL_NODEMAILER: process.env.EMAIL_NODEMAILER || '',
    PASSWORD_NODEMAILER: process.env.PASSWORD_NODEMAILER || '',
    SECRET_KEY: process.env.SECRET_KEY || ''
}

export default config