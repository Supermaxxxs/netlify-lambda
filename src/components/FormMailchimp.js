import React, { Component } from 'react'

export default class FormMailchimp extends Component {

    state = {
        email: "",
        msg: "",
        loading: false
    }

    handleChange = e => {
        const email = e.target.value;
        this.setState({ email })
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({ loading: true })

        const email = this.state.email

        const mailchimp = await fetch('/.netlify/functions/mailchimp', {
            method: "POST",
            body: JSON.stringify({ email })
        })

        const res = await mailchimp.json()
        const msg = res.msg
        this.setState({
            msg,
            loading: false,
            email: ""
        })

    }

    render() {
        const { email, msg, loading } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" value={email} onChange={this.handleChange} />
                <button type="submit">GO</button>
                <p>{loading ? "Traitement en cours..." : msg}</p>
            </form>
        )
    }
}
