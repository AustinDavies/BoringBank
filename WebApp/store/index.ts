import {
  CreateTransactionCommand,
  TransactionLookupViewModel
} from '~/.types/api/boringbank-api';

export interface RootState {
  dark: boolean;
  transactions: TransactionLookupViewModel[];
  balance: number;
}

export module Getters {
  export module CurrentYear {
    export const Name = 'currentYear';
    export type Type = string;
  }
  export module Dark {
    export const Name = 'dark';
    export type Type = boolean;
  }
  export module GetTransactions {
    export const Name = 'getTransactions';
    export type Type = TransactionLookupViewModel[];
  }
  export module GetBalance {
    export const Name = 'getBalance';
    export type Type = number;
  }
  export module GetMostRecentTransaction {
    export const Name = 'getMostRecentTransaction';
    export type Type = TransactionLookupViewModel;
  }
}

export module Actions {
  export module CreateTransaction {
    export const Name = 'createTransaction';
    export type Type = (command: CreateTransactionCommand) => Promise<void>;
  }
  export module GetTransactions {
    export const Name = 'getTransactions';
    export type Type = () => Promise<void>;
  }
  export module GetBalance {
    export const Name = 'getBalance';
    export type Type = () => Promise<void>;
  }
}

export module Mutations {
  export module Logout {
    export const Name = 'logout';
    export type Type = void;
  }
  export module SetDark {
    export const Name = 'setDark';
    export type Type = (isDark: boolean) => void;
  }
  export module SetTransactions {
    export const Name = 'setTransactions';
    export type Type = (transactions: TransactionLookupViewModel[]) => void;
  }
  export module SetBalance {
    export const Name = 'setBalance';
    export type Type = (balance: number) => void;
  }
  export module AddTransaction {
    export const Name = 'addTransaction';
    export type Type = (transaction: TransactionLookupViewModel) => void;
  }
}

export {
  Actions as RootActions,
  Mutations as RootMutations,
  Getters as RootGetters
};
