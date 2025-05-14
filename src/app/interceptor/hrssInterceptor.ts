import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import {
  map,
} from "rxjs/operators";
import { GatekeeperService } from "../services/gatekeep.service";

@Injectable()
export class HrssInterceptor implements HttpInterceptor {
  constructor(
    private gateSrv: GatekeeperService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    console.log(this.gateSrv.token)
    if (this.gateSrv.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.gateSrv.token}`,
        },
        withCredentials: true,
      });
    }
    
    return next.handle(req).pipe(
      map((event) => {
        if (
          event instanceof HttpResponse
        ) {}
        return event;
      }),
     
    );
  }
}
