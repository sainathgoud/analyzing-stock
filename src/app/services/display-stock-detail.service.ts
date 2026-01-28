import { Injectable } from '@angular/core';
import { CommonUtilService } from './common-util.service';
import { ApiService } from '../authentication/services/api.service';
import { LocalStorageService } from './local-storage.service';
import { FetchIndDetailsReq } from '../models/fetch-ind-details-req';
import { AppUrlConstant } from '../constants/app-url.constant';
import { map, Observable } from 'rxjs';
import { ServerResponse } from '../authentication/services/server-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DisplayStockDetailService {

  constructor(private router: Router, private local_storag : LocalStorageService, private apiService :ApiService,
      private commonutil : CommonUtilService) { }


      fetchStocktoDisplay(fetchIndDetailsReq : FetchIndDetailsReq) : Observable<ServerResponse>{
            
          console.log("Request obj==="+JSON.stringify(fetchIndDetailsReq));
          return this.apiService.post(AppUrlConstant.DISPLAY_STOCK_DETAILS,fetchIndDetailsReq).pipe(map(resp=>{
            console.log("got response="+resp)
            return resp;
           }), err=>{
            return err;
           }
          );
      
        }
}
