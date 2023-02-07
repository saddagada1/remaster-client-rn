/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}": types.ChangeEmailDocument,
    "mutation ChangeForgotPassword($changeForgotPasswordOptions: ChangeForgotPasswordInput!) {\n  changeForgotPassword(changeForgotPasswordOptions: $changeForgotPasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}": types.ChangeForgotPasswordDocument,
    "mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}": types.ChangeUsernameDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}": types.LoginDocument,
    "mutation LoginWithGoogle($accessToken: String!) {\n  loginWithGoogle(accessToken: $accessToken) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}": types.LoginWithGoogleDocument,
    "mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}": types.RegisterDocument,
    "mutation RegisterWithGoogle($registerWithGoogleOptions: RegisterWithGoogleInput!) {\n  registerWithGoogle(registerWithGoogleOptions: $registerWithGoogleOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}": types.RegisterWithGoogleDocument,
    "mutation SendVerifyEmail {\n  sendVerifyEmail\n}": types.SendVerifyEmailDocument,
    "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}": types.VerifyEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeForgotPassword($changeForgotPasswordOptions: ChangeForgotPasswordInput!) {\n  changeForgotPassword(changeForgotPasswordOptions: $changeForgotPasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation ChangeForgotPassword($changeForgotPasswordOptions: ChangeForgotPasswordInput!) {\n  changeForgotPassword(changeForgotPasswordOptions: $changeForgotPasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LoginWithGoogle($accessToken: String!) {\n  loginWithGoogle(accessToken: $accessToken) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation LoginWithGoogle($accessToken: String!) {\n  loginWithGoogle(accessToken: $accessToken) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterWithGoogle($registerWithGoogleOptions: RegisterWithGoogleInput!) {\n  registerWithGoogle(registerWithGoogleOptions: $registerWithGoogleOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation RegisterWithGoogle($registerWithGoogleOptions: RegisterWithGoogleInput!) {\n  registerWithGoogle(registerWithGoogleOptions: $registerWithGoogleOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendVerifyEmail {\n  sendVerifyEmail\n}"): (typeof documents)["mutation SendVerifyEmail {\n  sendVerifyEmail\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      verified\n      email\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;