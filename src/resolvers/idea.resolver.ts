import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateIdeaInput } from "../dtos/input/idea.input";

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {

    private ideaService = new IdeaService()

    @Mutation(() => IdeaModel)
    async createIdea(
        @Arg('data', () => CreateIdeaInput) data: CreateIdeaInput
    ): Promise<IdeaModel> {
        return this.ideaService.createIdea(data)
    }
}