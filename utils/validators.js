module.exports.validateRegisterUser = (name, lastName, username, email, password, repeatPassword) => {
    const errors = {};
    if (name.trim() === '') {
        errors.name = 'name field must be not empty'
    }
    if (lastName.trim() === '') {
        errors.name = 'lastName field must be not empty'
    }
    if (username.trim() === '') {
        errors.name = 'username field must be not empty'
    }
    if (email.trim() === '') {
        errors.name = 'email field must be not empty'
    } else {
        const valMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(valMail)) {
            errors.email = 'email must be a real email :('
        }
    }
    if (password.trim() === '') {
        errors.name = 'password field must be not empty'
    } else if (password !== repeatPassword) {
        errors.repeatPassword = 'passwords must be the same in both fields'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginUser = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'username field must be not empty'
    }
    if (password.trim() === '') {
        errors.password = 'password field must be not empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}