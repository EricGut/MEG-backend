const User = require('../../models/User');

const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generate-token');

const { UserInputError } = require('apollo-server');
const { validateRegisterUser, validateLoginUser } = require('../../utils/validators');


module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users
            } catch (err) {
                throw new Error(err)
            }
        }
    },

    Mutation: {
        async register(_, { registerUser: { name, lastName, username, email, password, repeatPassword } }) {
            const { errors, valid } = validateRegisterUser(name, lastName, username, email, password, repeatPassword);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('this is user already exists', {
                    errors: {
                        username: 'this is user already exists'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                name,
                lastName,
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }

        },
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginUser(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                throw new UserInputError('User not found', {
                    errors: {
                        username: 'User not found'
                    }
                })
            }

            const comparePsw = await bcrypt.compare(password, user.password);

            if (!comparePsw) {
                throw new UserInputError('Wrong password or username', {
                    errors: {
                        username: 'Wrong password or username'
                    }
                })
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}