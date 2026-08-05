import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { LoginOutput, RegisterOutput } from "../dtos/output/auth.output";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";


@Resolver()
export class AuthResolver {

    private authService = new AuthService()
    private userService = new UserService()


    @Mutation(() => LoginOutput)
    async login(
        @Arg('data', () => LoginInput) data: LoginInput
    ): Promise<LoginOutput> {
        return this.authService.login(data)
    }

    @Mutation(() => RegisterOutput)
    async signup(
        @Arg('data', () => RegisterInput) data: RegisterInput
    ): Promise<RegisterOutput> {
        return this.authService.signup(data)
    }
}