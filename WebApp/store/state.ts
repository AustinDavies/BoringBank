import { RootState } from './index';

export const state: () => RootState = () => ({
  dark: false,
  transactions: [],
  balance: 0
});
export default state;
