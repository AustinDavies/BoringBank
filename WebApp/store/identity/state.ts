import { IdentityState } from '.';

export const state: () => IdentityState = () => ({
  accessToken: null,
  profile: null
});
export default state;
