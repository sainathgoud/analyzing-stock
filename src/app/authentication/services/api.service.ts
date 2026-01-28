import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

 get(url : string, params: any): Observable<any> {
  console.log("api  get value=="+environment.SERVER_URL+url+"   paen=="+JSON.stringify(params));
  
  return this._http.get(environment.SERVER_URL+url+this.prepareParams(params)).pipe(
    map(resp=>{
        return resp; 
    },
  ),
      //this.extractData),
    catchError(this.handleError));
}
 
getwithParams(url:string, params: HttpParams): Observable<any> {
  console.log("api  get value=="+environment.SERVER_URL+url+"   paen=="+JSON.stringify(params));
  
 // return this.http.get(environment.SERVER_URL+url+this.prepareParams(params)).pipe(
    return this._http.get(environment.SERVER_URL+url, {params: params}).pipe(
    map(resp=>{
        return resp; 
    },
  ),
      //this.extractData),
    catchError(this.handleError));
}

getwithUrl(url :string): Observable<any> {
  console.log("api  get value=="+environment.SERVER_URL+url);
  return this._http.get(environment.SERVER_URL+url).pipe(
    map(resp=>{
        return resp; 
    },
  ),
      //this.extractData),
    catchError(this.handleError));
}



post(url: string, data: any): Observable<any> {
  return this._http.post(environment.SERVER_URL+ url, data)
    .pipe(map(resp=>{
     return resp;
    }
  ),
      //this.extractData),
      catchError(this.handleError)
    );
}



private handleError(error: HttpErrorResponse) {
 // console.log("msge of invalid="+JSON.stringify(error));
  let errorMessage = 'An unknown error occurred!';

      
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('client side An error occurred:', error.error);
    //return throwError(error.error);

    errorMessage = `Client-side error: ${error.error.message}`;

  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    //return throwError(error.error.errorMessage);
    //return throwError(error.error);
    console.error('Server-side err:', error.status, "-", error.message);

    errorMessage = error.error.message;

    // console.error(
    //   `Backend returned code ${error.status}, ` +
    //   `body was: ${error.error}`);
    //   return throwError(error.error.message);
    //
   }
   return throwError(() => new Error(errorMessage));

  // return an observable with a user-facing error message
 
}

prepareParams(params: Object) {
  let ret = [];
  let ques: String = "";
  for (let d in params){
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(d));
  }
  (ret.length > 0)? (ques = "?"): '';
  return ques + ret.join('&');
}


}
