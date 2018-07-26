import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import * as yup from "yup";
require("dotenv").config({ path: "variables.env" });

const schema = yup.object().shape({
    username: yup.string().required().min(4),
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
});

const createToken = (_id) => {
    return jwt.sign({ userId: _id }, process.env.JWT_SECRET);
}
export default {
    Mutation: {
        register: async (_, { input }, ctx) => {
            const { username, password, email } = input;

            try {
                await schema.validate(input, {
                    abortEarly: false
                });
            } catch (error) {
                throw new Error(error);
            }
            const user = await ctx.models.User.findOne({ $or: [{ email }, { username }] });

            if (user) {
                throw new Error("username/email already exists");
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = await ctx.models.User.create({
                username,
                password: hashPassword,
                email
            })
            return {
                token: createToken(newUser._id)
            }
        },
        login: async (_, { username, password }, ctx) => {
            const user = await ctx.models.User.findOne({ username });

            if (!user) {
                throw new Error("username doesn't exists");
            }
            const hasValidPasssword = await bcrypt.compare(password, user.password);
            if (!hasValidPasssword) {
                throw new Error("invalid password");

            }
            return {
                token: createToken(user._id)
            }
        }
    }
}