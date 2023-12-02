import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export async function sendEmail(to: any, code: any) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.DEFAULT_EMAIL_SENDER,
            pass: process.env.SMTP_PASSWORD
        }
    })
    let message = {
        from: process.env.DEFAULT_EMAIL_SENDER,
        to: to,
        subject: "Código de Ativicação de Conta",
        text: `Código para ativação da conta: ${code}`
    }
    transporter.sendMail(message, (error: any) =>{
        if (error) {
            console.log(error)
        }
    }) 
} 
