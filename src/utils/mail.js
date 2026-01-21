import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanager.com"
        }
    });

    const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

    const emailHtml = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_SMTP_HOST,
        port: process.env.MAIL_TRAP_SMTP_PORT,
        auth: {
            user: process.env.MAIL_TRAP_SMTP_USER,
            pass: process.env.MAIL_TRAP_SMTP_PASS
        }
    });

    const mail = {
        from: "mail.taskmanager@examplemail.com",
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml
    }

    try{
        await transporter.sendMail(mail)
    }catch(error){
        console.error("Email service failed silently. provide your mail trap credentials in env file");
    }
}

const emailVerificationMailgenContent = (username,verificationURL) => {
    return {
        body:{
            name: username,
            intro: "Welcome to PGM, We're very excited to have you on board.",
            action: {
                instructions: 'To get started with PGM, please click here:',
                button: {
                    color: "#22bc26",
                    text: "Click here to verify",
                    link: verificationURL
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}

const forgetPasswordMailgenContent = (username,passwordVerificationURL) => {
    return {
        body:{
            name: username,
            intro: "You have requested to change you password!",
            action: {
                instructions: 'To reset your password, please click here:',
                button: {
                    color: "#22bc26",
                    text: "Click here to reset",
                    link: passwordVerificationURL
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}


export {emailVerificationMailgenContent, forgetPasswordMailgenContent, sendEmail};