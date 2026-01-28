export interface ServerResponse {

    data: any;
    message: string;
    code: number;
    errorMessage : string;
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
    
}
