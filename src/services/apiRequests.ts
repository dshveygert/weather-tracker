import {AxiosError, AxiosResponse} from 'axios';
import {makeAutoObservable} from 'mobx';

type ConstructorProps<RequestType, ResponseType> = {
    apiFunction: (requestData: RequestType) => Promise<AxiosResponse<ResponseType>>
}

export type RequestError = {
    code: string;
    status?: number | string;
}
let instanceCounter = 0;
export default class ApiRequests<RequestType, ResponseType> {
    errors?: RequestError[] = undefined;
    isLoading = false;
    data?: ResponseType = undefined;
    status?: number = undefined;
    private apiFunction: (value: RequestType) => Promise<any>;

    constructor({
                    apiFunction
                }: ConstructorProps<RequestType, ResponseType>) {
        this.apiFunction = apiFunction;
        makeAutoObservable(this);
        instanceCounter++;
        console.log('Instance #', instanceCounter); // Todo Remove it. Just for controlling if the singleton
    };

    setData = (data: ResponseType) => {
        this.data = data;
    };

    clearData = () => {
        this.data = undefined;
    };

    setErrors = (errors: RequestError[]) => {
        this.errors = errors;
    };

    clearErrors = () => {
        this.errors = undefined;
    };

    send = async (requestData: RequestType): Promise<ResponseType> => {
        this.clearErrors();
        this.isLoading = true;
        return this.apiFunction(requestData)
            .then((response) => {
                this.setData(response.data);
                this.status = response.status;
                return response.data;
            })
            .catch((error: AxiosError<RequestError>) => {
                const statusCode = error.response ? error.response.status : null;
                if (statusCode && !!error.response?.data) {
                    this.setErrors([error.response.data]);
                    return;
                } else {
                    console.error('No data: ', error);
                }
            })
            .finally(() => {
                this.isLoading = false;
            });
    };
}
