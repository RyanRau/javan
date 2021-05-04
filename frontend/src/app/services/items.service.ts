import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private api: ApiService) { }

  getAll(): Observable<Item[]> {
    // return this.http.get<T>(this.getUrl(relativeUrl), { params: httpParams });

    return this.api.get<Item[]>('api/items/');
  }

  // get(id: number): Observable<ItemDTO>{
  //   return this.api.get<ItemDTO>(ItemsService.APIPATHPREFIX + id);
  // }
}