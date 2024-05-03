import { AxiosError } from "axios";


type TErrorData = {
    objectName: string,
    defaultMessage: string
}
type TApiError = {
    errors: TErrorData[]
}
export class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}
export class ApiError {
    private error: AxiosError | null;
    public defaultMessage;
    public message;
    private statusCode;
    private _globallyHandled: boolean = false;
    constructor(error: AxiosError) {
        this.error = error;
        this.statusCode = error.response? error.response.status : null;
        const errorData: TApiError | null = error.response? error.response.data as TApiError : null;
        if (errorData) {
            const { objectName, defaultMessage } = errorData.errors[0];
            this.defaultMessage = `${objectName} due to ${defaultMessage}`;
            this.message = defaultMessage;
        } else {
            switch (this.statusCode) {
                case 404:
                    this.message = "Resource not found";
                    this.defaultMessage = this.message;
                    break;
                case 403:
                    this.message = "Resource forbidden";
                    this.defaultMessage = this.message;
                    break;
                case 401:
                    this.message = "Please login to acces to this resource";
                    this.defaultMessage = this.message;
                    break;
                case 409:
                    this.message = "Resource conflict";
                    this.defaultMessage = this.message;
                    break;
                case 406:
                    this.message = "Token expired";
                    this.defaultMessage = this.message;
                    break;
                default:
                    this.message = "An exception ocurred while making the request"
                    this.defaultMessage = this.message;
            }
        }
    }
    public getMessage(): string {
        return this.message;
    }
    public getDefaultMessage(): string {
        return this.defaultMessage;
    }
    public getError(): AxiosError | null {
        return this.error;
    }
    public getStatusCode(): number | null {
        return this.statusCode;
    }
    public handleGlobally(): void {
        if (this._globallyHandled) {return};
        this._globallyHandled = true;
        console.log(this.error + "\n - - -   - - -   - - - \n" + this.message + "\n - - -    - - -    - - -\n");
        
    }
}

//Global error handler
export function errorHandler(error: AxiosError) : string {
    const apiError = new ApiError(error);
    apiError.handleGlobally()
    return apiError.getMessage();
}