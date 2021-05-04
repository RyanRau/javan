import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(
    protected http: HttpClient,
  ) { }

  get<T>(relativeUrl: string, params?: object): Observable<T> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (Array.isArray(params[key])) {
          params[key].forEach(paramValue => {
            httpParams = httpParams.append(key, paramValue);
          });
        } else {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    }

    return this.http.get<T>(this.getUrl(relativeUrl), { params: httpParams });
  }

  post<T>(relativeUrl: string, body: any): Observable<T> {
    return this.http.post<T>(this.getUrl(relativeUrl), body);
  }



  buildPath(...parts: string[]) {
    if (parts && parts.length) {
      let path = parts.join('/');

      // Ensure path starts with a forward slash
      if (path.length && path[0] !== '/') {
        path = '/' + path;
      }

      return path;
    }

    return '';
  }

  protected getUrl(relativeUrl: string) {
    return "http://127.0.0.1:8000/" + relativeUrl;
  }
}