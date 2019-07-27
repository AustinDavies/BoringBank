﻿/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.0.4.0 (NJsonSchema v10.0.21.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ITransactionsHttpClient {
    getTransactions(): Promise<GetTransactionListResponse>;
    createTransaction(createTransactionCommand: CreateTransactionCommand): Promise<TransactionCreatedResponse>;
}

export class TransactionsHttpClient implements ITransactionsHttpClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getTransactions(): Promise<GetTransactionListResponse> {
        let url_ = this.baseUrl + "/v1/transactions";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.instance.request(options_).then((_response: AxiosResponse) => {
            return this.processGetTransactions(_response);
        });
    }

    protected processGetTransactions(response: AxiosResponse): Promise<GetTransactionListResponse> {
        const status = response.status;
        let _headers: any = {}; 
        if (response.headers && response.headers.forEach) { 
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = GetTransactionListResponse.fromJS(resultData200);
            return result200;
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<GetTransactionListResponse>(<any>null);
    }

    createTransaction(createTransactionCommand: CreateTransactionCommand): Promise<TransactionCreatedResponse> {
        let url_ = this.baseUrl + "/v1/transactions";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(createTransactionCommand);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.instance.request(options_).then((_response: AxiosResponse) => {
            return this.processCreateTransaction(_response);
        });
    }

    protected processCreateTransaction(response: AxiosResponse): Promise<TransactionCreatedResponse> {
        const status = response.status;
        let _headers: any = {}; 
        if (response.headers && response.headers.forEach) { 
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 201) {
            const _responseText = response.data;
            let result201: any = null;
            let resultData201  = _responseText;
            result201 = TransactionCreatedResponse.fromJS(resultData201);
            return result201;
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<TransactionCreatedResponse>(<any>null);
    }
}

export interface IUsersHttpClient {
    createUser(createUserCommand: CreateUserCommand): Promise<UserCreatedResponse>;
    getBalance(): Promise<GetAccountBalanceResponse>;
    authenticate(authenticateUserCommand: AuthenticateUserCommand): Promise<UserAuthenticationResponse>;
}

export class UsersHttpClient implements IUsersHttpClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    createUser(createUserCommand: CreateUserCommand): Promise<UserCreatedResponse> {
        let url_ = this.baseUrl + "/v1/users";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(createUserCommand);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.instance.request(options_).then((_response: AxiosResponse) => {
            return this.processCreateUser(_response);
        });
    }

    protected processCreateUser(response: AxiosResponse): Promise<UserCreatedResponse> {
        const status = response.status;
        let _headers: any = {}; 
        if (response.headers && response.headers.forEach) { 
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 201) {
            const _responseText = response.data;
            let result201: any = null;
            let resultData201  = _responseText;
            result201 = UserCreatedResponse.fromJS(resultData201);
            return result201;
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserCreatedResponse>(<any>null);
    }

    getBalance(): Promise<GetAccountBalanceResponse> {
        let url_ = this.baseUrl + "/v1/users/balance";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.instance.request(options_).then((_response: AxiosResponse) => {
            return this.processGetBalance(_response);
        });
    }

    protected processGetBalance(response: AxiosResponse): Promise<GetAccountBalanceResponse> {
        const status = response.status;
        let _headers: any = {}; 
        if (response.headers && response.headers.forEach) { 
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = GetAccountBalanceResponse.fromJS(resultData200);
            return result200;
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<GetAccountBalanceResponse>(<any>null);
    }

    authenticate(authenticateUserCommand: AuthenticateUserCommand): Promise<UserAuthenticationResponse> {
        let url_ = this.baseUrl + "/v1/users/authenticate";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(authenticateUserCommand);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.instance.request(options_).then((_response: AxiosResponse) => {
            return this.processAuthenticate(_response);
        });
    }

    protected processAuthenticate(response: AxiosResponse): Promise<UserAuthenticationResponse> {
        const status = response.status;
        let _headers: any = {}; 
        if (response.headers && response.headers.forEach) { 
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = UserAuthenticationResponse.fromJS(resultData200);
            return result200;
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserAuthenticationResponse>(<any>null);
    }
}

export class GetTransactionListResponse implements IGetTransactionListResponse {
    bankAccountId!: number;
    transactions?: TransactionLookupViewModel[] | undefined;

    constructor(data?: IGetTransactionListResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.bankAccountId = data["bankAccountId"];
            if (Array.isArray(data["transactions"])) {
                this.transactions = [] as any;
                for (let item of data["transactions"])
                    this.transactions!.push(TransactionLookupViewModel.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetTransactionListResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetTransactionListResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["bankAccountId"] = this.bankAccountId;
        if (Array.isArray(this.transactions)) {
            data["transactions"] = [];
            for (let item of this.transactions)
                data["transactions"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IGetTransactionListResponse {
    bankAccountId: number;
    transactions?: TransactionLookupViewModel[] | undefined;
}

export class TransactionLookupViewModel implements ITransactionLookupViewModel {
    transactionId!: number;
    type!: TransactionType;
    amount!: number;
    resultingBalance!: number;
    timestamp!: Date;

    constructor(data?: ITransactionLookupViewModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.transactionId = data["transactionId"];
            this.type = data["type"];
            this.amount = data["amount"];
            this.resultingBalance = data["resultingBalance"];
            this.timestamp = data["timestamp"] ? new Date(data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): TransactionLookupViewModel {
        data = typeof data === 'object' ? data : {};
        let result = new TransactionLookupViewModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["transactionId"] = this.transactionId;
        data["type"] = this.type;
        data["amount"] = this.amount;
        data["resultingBalance"] = this.resultingBalance;
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data; 
    }
}

export interface ITransactionLookupViewModel {
    transactionId: number;
    type: TransactionType;
    amount: number;
    resultingBalance: number;
    timestamp: Date;
}

export enum TransactionType {
    Withdrawal = 1,
    Deposit = 2,
}

export class TransactionCreatedResponse implements ITransactionCreatedResponse {
    transactionId!: number;
    amount!: number;
    type!: TransactionType;
    timestamp!: Date;
    newBalance!: number;

    constructor(data?: ITransactionCreatedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.transactionId = data["transactionId"];
            this.amount = data["amount"];
            this.type = data["type"];
            this.timestamp = data["timestamp"] ? new Date(data["timestamp"].toString()) : <any>undefined;
            this.newBalance = data["newBalance"];
        }
    }

    static fromJS(data: any): TransactionCreatedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TransactionCreatedResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["transactionId"] = this.transactionId;
        data["amount"] = this.amount;
        data["type"] = this.type;
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        data["newBalance"] = this.newBalance;
        return data; 
    }
}

export interface ITransactionCreatedResponse {
    transactionId: number;
    amount: number;
    type: TransactionType;
    timestamp: Date;
    newBalance: number;
}

export class CreateTransactionCommand implements ICreateTransactionCommand {
    type!: TransactionType;
    amount!: number;

    constructor(data?: ICreateTransactionCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.type = data["type"];
            this.amount = data["amount"];
        }
    }

    static fromJS(data: any): CreateTransactionCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateTransactionCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["amount"] = this.amount;
        return data; 
    }
}

export interface ICreateTransactionCommand {
    type: TransactionType;
    amount: number;
}

export class UserCreatedResponse implements IUserCreatedResponse {
    userId!: number;
    bankAccountId!: number;
    accessToken?: string | undefined;

    constructor(data?: IUserCreatedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.userId = data["userId"];
            this.bankAccountId = data["bankAccountId"];
            this.accessToken = data["accessToken"];
        }
    }

    static fromJS(data: any): UserCreatedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UserCreatedResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["bankAccountId"] = this.bankAccountId;
        data["accessToken"] = this.accessToken;
        return data; 
    }
}

export interface IUserCreatedResponse {
    userId: number;
    bankAccountId: number;
    accessToken?: string | undefined;
}

export class CreateUserCommand implements ICreateUserCommand {
    username?: string | undefined;
    password?: string | undefined;

    constructor(data?: ICreateUserCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.username = data["username"];
            this.password = data["password"];
        }
    }

    static fromJS(data: any): CreateUserCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateUserCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        data["password"] = this.password;
        return data; 
    }
}

export interface ICreateUserCommand {
    username?: string | undefined;
    password?: string | undefined;
}

export class GetAccountBalanceResponse implements IGetAccountBalanceResponse {
    bankAccountId!: number;
    balance!: number;

    constructor(data?: IGetAccountBalanceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.bankAccountId = data["bankAccountId"];
            this.balance = data["balance"];
        }
    }

    static fromJS(data: any): GetAccountBalanceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetAccountBalanceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["bankAccountId"] = this.bankAccountId;
        data["balance"] = this.balance;
        return data; 
    }
}

export interface IGetAccountBalanceResponse {
    bankAccountId: number;
    balance: number;
}

export class UserAuthenticationResponse implements IUserAuthenticationResponse {
    accessToken?: string | undefined;

    constructor(data?: IUserAuthenticationResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.accessToken = data["accessToken"];
        }
    }

    static fromJS(data: any): UserAuthenticationResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UserAuthenticationResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        return data; 
    }
}

export interface IUserAuthenticationResponse {
    accessToken?: string | undefined;
}

export class AuthenticateUserCommand implements IAuthenticateUserCommand {
    username?: string | undefined;
    password?: string | undefined;

    constructor(data?: IAuthenticateUserCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.username = data["username"];
            this.password = data["password"];
        }
    }

    static fromJS(data: any): AuthenticateUserCommand {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateUserCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        data["password"] = this.password;
        return data; 
    }
}

export interface IAuthenticateUserCommand {
    username?: string | undefined;
    password?: string | undefined;
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if(result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}