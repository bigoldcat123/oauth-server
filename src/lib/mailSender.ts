import nodemail from 'nodemailer'
const transport = nodemail.createTransport({
  host: 'smtp.163.com',
  // port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.EMAIL_PASSWORD as string
  }
})

const sendMail = async (to: string, subject: string, text: string) => {
  try {
    const res = await transport.sendMail({
      from: `"Dalomy 👻" <${process.env.EMAIL}`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      // html: "<b>Hello world?</b>", // html body
    })
  } catch (error) {
    console.log(error);
    return false
  }
  return true
}
export default async function sendCode (code: string, to: string) {
  const subject = 'verify code'
  const text = `your code is -> [ ${code} ] <- please do not share it`
  const res = await sendMail(to, subject, text)
  return res

}