import Mailchimp from "mailchimp-api-v3"
import md5 from "md5"
import validateEmail from "../helpers/validateEmail"

require("dotenv").config()

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API)

export async function handler(event, context, callback) {
    const data = JSON.parse(event.body)
    const email = data.email
    const emailHash = md5(email)

    let msg = `Le mail : ${email} a bien été ajouté !`

    if (!validateEmail(email)) {
        msg = `Le mail : ${email} n'est pas valide !`
    } else {
        await mailchimp.put(`/lists/98fbb96135/members/${emailHash}`, {
            email_address: email,
            status: "subscribed"
        }).catch(err => {
            console.log(err)
            msg = `Une erreur est survenue`
        })
    }

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg })
    })
}
