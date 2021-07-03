import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //verify valid email
        const user = await usersRepositories.findOne({
            email
        });

        if (!user){
            throw new Error("Email/Password incorrect")
        }

        // verify valid password
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        //generate token
        
        const token = sign({
            email: user.email
        }, "97afc8c88c9881d7292cd02262093558", {
            subject : user.id,
            expiresIn : "1d"
        });
        return token;
    }
}

export { AuthenticateUserService };