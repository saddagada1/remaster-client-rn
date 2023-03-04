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
    "mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}": types.ChangeEmailDocument,
    "mutation ChangeForgotPassword($changeForgotPasswordOptions: ChangeForgotPasswordInput!) {\n  changeForgotPassword(changeForgotPasswordOptions: $changeForgotPasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}": types.ChangeForgotPasswordDocument,
    "mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}": types.ChangeUsernameDocument,
    "mutation CreateRemaster($remasterInput: CreateRemasterInput!) {\n  createRemaster(remasterInput: $remasterInput) {\n    id\n    name\n    artist_id\n    video_id\n    duration\n    key {\n      id\n      note\n      colour\n    }\n    tuning {\n      id\n      name\n      notes\n    }\n    loops {\n      id\n      name\n      key {\n        id\n        note\n        colour\n      }\n      type\n      start\n      end\n      chord {\n        title\n        fingers\n        barres {\n          fromString\n          toString\n          fret\n        }\n        position\n      }\n      tab\n    }\n    likes\n    creator_id\n    created_at\n    updated_at\n  }\n}": types.CreateRemasterDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}": types.LoginDocument,
    "mutation LoginWithGoogle {\n  loginWithGoogle {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}": types.LoginWithGoogleDocument,
    "mutation LoginWithGuestAccess {\n  loginWithGuestAccess {\n    spotify_access_token\n    spotify_expires_in\n  }\n}": types.LoginWithGuestAccessDocument,
    "mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}": types.RegisterDocument,
    "mutation RegisterWithGoogle($username: String!) {\n  registerWithGoogle(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}": types.RegisterWithGoogleDocument,
    "mutation SendVerifyEmail {\n  sendVerifyEmail\n}": types.SendVerifyEmailDocument,
    "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}": types.VerifyEmailDocument,
    "query UserRemasters {\n  userRemasters {\n    id\n    name\n    artist_id\n    artist {\n      id\n      name\n      created_at\n      updated_at\n    }\n    video_id\n    duration\n    key {\n      id\n      note\n      colour\n    }\n    tuning {\n      id\n      name\n      notes\n    }\n    loops {\n      id\n      name\n      key {\n        id\n        note\n        colour\n      }\n      type\n      start\n      end\n      chord {\n        title\n        fingers\n        barres {\n          fromString\n          toString\n          fret\n        }\n        position\n      }\n      tab\n    }\n    likes\n    creator_id\n    created_at\n    updated_at\n  }\n}": types.UserRemastersDocument,
    "query Users {\n  users {\n    id\n    verified\n    email\n    username\n    created_at\n    updated_at\n  }\n}": types.UsersDocument,
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
export function graphql(source: "mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}"): (typeof documents)["mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeForgotPassword($changeForgotPasswordOptions: ChangeForgotPasswordInput!) {\n  changeForgotPassword(changeForgotPasswordOptions: $changeForgotPasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"): (typeof documents)["mutation ChangeForgotPassword($changeForgotPasswordOptions: ChangeForgotPasswordInput!) {\n  changeForgotPassword(changeForgotPasswordOptions: $changeForgotPasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}"): (typeof documents)["mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateRemaster($remasterInput: CreateRemasterInput!) {\n  createRemaster(remasterInput: $remasterInput) {\n    id\n    name\n    artist_id\n    video_id\n    duration\n    key {\n      id\n      note\n      colour\n    }\n    tuning {\n      id\n      name\n      notes\n    }\n    loops {\n      id\n      name\n      key {\n        id\n        note\n        colour\n      }\n      type\n      start\n      end\n      chord {\n        title\n        fingers\n        barres {\n          fromString\n          toString\n          fret\n        }\n        position\n      }\n      tab\n    }\n    likes\n    creator_id\n    created_at\n    updated_at\n  }\n}"): (typeof documents)["mutation CreateRemaster($remasterInput: CreateRemasterInput!) {\n  createRemaster(remasterInput: $remasterInput) {\n    id\n    name\n    artist_id\n    video_id\n    duration\n    key {\n      id\n      note\n      colour\n    }\n    tuning {\n      id\n      name\n      notes\n    }\n    loops {\n      id\n      name\n      key {\n        id\n        note\n        colour\n      }\n      type\n      start\n      end\n      chord {\n        title\n        fingers\n        barres {\n          fromString\n          toString\n          fret\n        }\n        position\n      }\n      tab\n    }\n    likes\n    creator_id\n    created_at\n    updated_at\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"): (typeof documents)["mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LoginWithGoogle {\n  loginWithGoogle {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"): (typeof documents)["mutation LoginWithGoogle {\n  loginWithGoogle {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LoginWithGuestAccess {\n  loginWithGuestAccess {\n    spotify_access_token\n    spotify_expires_in\n  }\n}"): (typeof documents)["mutation LoginWithGuestAccess {\n  loginWithGuestAccess {\n    spotify_access_token\n    spotify_expires_in\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"): (typeof documents)["mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterWithGoogle($username: String!) {\n  registerWithGoogle(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"): (typeof documents)["mutation RegisterWithGoogle($username: String!) {\n  registerWithGoogle(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      refresh_token\n      expires_in\n    }\n    spotify_auth {\n      spotify_access_token\n      spotify_expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendVerifyEmail {\n  sendVerifyEmail\n}"): (typeof documents)["mutation SendVerifyEmail {\n  sendVerifyEmail\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}"): (typeof documents)["mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserRemasters {\n  userRemasters {\n    id\n    name\n    artist_id\n    artist {\n      id\n      name\n      created_at\n      updated_at\n    }\n    video_id\n    duration\n    key {\n      id\n      note\n      colour\n    }\n    tuning {\n      id\n      name\n      notes\n    }\n    loops {\n      id\n      name\n      key {\n        id\n        note\n        colour\n      }\n      type\n      start\n      end\n      chord {\n        title\n        fingers\n        barres {\n          fromString\n          toString\n          fret\n        }\n        position\n      }\n      tab\n    }\n    likes\n    creator_id\n    created_at\n    updated_at\n  }\n}"): (typeof documents)["query UserRemasters {\n  userRemasters {\n    id\n    name\n    artist_id\n    artist {\n      id\n      name\n      created_at\n      updated_at\n    }\n    video_id\n    duration\n    key {\n      id\n      note\n      colour\n    }\n    tuning {\n      id\n      name\n      notes\n    }\n    loops {\n      id\n      name\n      key {\n        id\n        note\n        colour\n      }\n      type\n      start\n      end\n      chord {\n        title\n        fingers\n        barres {\n          fromString\n          toString\n          fret\n        }\n        position\n      }\n      tab\n    }\n    likes\n    creator_id\n    created_at\n    updated_at\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Users {\n  users {\n    id\n    verified\n    email\n    username\n    created_at\n    updated_at\n  }\n}"): (typeof documents)["query Users {\n  users {\n    id\n    verified\n    email\n    username\n    created_at\n    updated_at\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;