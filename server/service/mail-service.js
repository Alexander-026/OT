const nodemailer = require('nodemailer')


class MailService {
   constructor() {
      this.trasporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port:process.env.SMTP_PORT,
         secure:false,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
         }
      })
   }


   async sendActivationMail(to, link) {
      await this.trasporter.sendMail({
         from: process.env.SMTP_USER,
         to,
         subject: 'Activation acount' + process.env.API_URL,
         text:'',
         html:
         `
            <div>
               <h1>To activate follow the link</h1>
               <a href="${link}">${link}</a>
            </div>

         `
      })
   }
}

module.exports = new MailService()