import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from "type-graphql";
import { Role } from "@prisma/client";

registerEnumType(Role, {
    name: 'Role',
    description: 'User role in the system',
});

export { Role };


@ObjectType()
export class UserModel {

    @Field(() => ID)
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => String, { nullable: true })
    password!: string | null

    @Field(() => Role, { nullable: true })
    role?: Role

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date

}