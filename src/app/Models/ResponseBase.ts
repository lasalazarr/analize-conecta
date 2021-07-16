
export class ResponseBase<T> {

    public Result: T
    public TargetUrl: string
    public Success: boolean
    public Error: any
    public UnAuthorizedRequest: boolean
    public __abp: boolean
    constructor() {
    }
}
