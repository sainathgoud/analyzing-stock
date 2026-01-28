import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../../constants/app.constant';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderInterceptorService implements HttpInterceptor{

  constructor(private local_storag : LocalStorageService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(" HttpHeaderInterceptorService added headers====="+this.local_storag.getItem(AppConstant.FILE_UPLOAD));
    if(this.local_storag.getItem(AppConstant.FILE_UPLOAD) !== null){
      //request = request.clone({ headers : request.headers.set('Content-Type', 'multipart/form-data; boundary=PlaceOurCustomBoundaryValueHere')});
     // request = request.clone({ headers : request.headers.set('Content-Type', 'multipart/form-data')});

      //  request = request.clone({ headers: request.headers.set('Accept', 'multipart/form-data') });

    }else{
      request = request.clone({ headers : request.headers.set('Content-Type', 'application/json')});

    }
    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'OPTIONS,GET, POST, PATCH, PUT, DELETE') });
    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', '*') });
    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Credentials', 'true') });
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer asfiahfjafaohfdijajfda')});

    console.log(" HttpHeaderInterceptorService added headers====="+JSON.stringify(request));

return next.handle(request)
  }
}
