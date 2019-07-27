import { namespace as VuexClassNamespaceHelper } from 'vuex-class';
import {
  CreateUserCommand,
  UserCreatedResponse,
  AuthenticateUserCommand,
  UserAuthenticationResponse
} from '~/.types/api/boringbank-api';

export const IdentityNamespace = 'identity';
export const IdentityVuexModule = VuexClassNamespaceHelper(IdentityNamespace);

export interface UserProfile {
  username: string;
}
export interface SetUserMutationPayload {
  accessToken: string;
  profile: UserProfile;
}
export interface SetUserActionPayload {
  accessToken: string;
  username: string;
}

export interface IdentityState {
  profile: UserProfile;
  accessToken: string;
}

export module Actions {
  export module Login {
    export const Name = 'login';
    export type Type = (
      authenticationCommand: AuthenticateUserCommand
    ) => Promise<UserAuthenticationResponse>;
  }
  export module Logout {
    export const Name = 'logout';
    export type Type = (redirectToLogin?: boolean) => Promise<void>;
  }
  export module SetUser {
    export const Name = 'setUser';
    export type Type = (accessToken: string, username: string) => void;
  }
  export module CreateUserWithUsernameAndPassword {
    export const Name = 'createUserWithUsernameAndPassword';
    export type Type = (
      createUserCommand: CreateUserCommand
    ) => Promise<UserCreatedResponse>;
  }
}

export module Getters {
  export module IsAuthenticated {
    export const Name = 'isAuthenticated';
    export type Type = boolean;
  }
  export module Profile {
    export const Name = 'getProfile';
    export type Type = UserProfile;
  }
  export module GetAccessToken {
    export const Name = 'getAccessToken';
    export type Type = string;
  }
}

export module Mutations {
  export module SetUser {
    export const Name = 'setUser';
    export type Type = (accessToken: string, profile: UserProfile) => void;
  }
}

export {
  Actions as IdentityActions,
  Mutations as IdentityMutations,
  Getters as IdentityGetters
};
