
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//environment
import { environment } from './../../environments/environment';

//interface
import { ConcerModifyRequest, ConcertRequest } from '../models/concerts-request';
import { ConcertSearchResponse, CreateConcertResponse, ManageConcertResponse, ModifyConcertResponse, SearchSaleConcertResponse } from '../models/concerts-response';

@Injectable({
  providedIn: 'root'
})
export class ConcertsService {
  constructor(
    private http: HttpClient) { }

  private CreateConcert_API_URL = `${environment.API_URL}/concert/create`;
  private ManageConcert_API_URL = `${environment.API_URL}/concert/manage`;
  private SearchConcert_API_URL = `${environment.API_URL}/concert`;
  private ModifyConcert_API_URL = `${environment.API_URL}/concert/modify`;
  private DeleteConcert_API_URL = `${environment.API_URL}/concert/delete`;
  private SaleConcert_API_URL = `${environment.API_URL}/concert/search`;
  private KeySearch_API_URL = `${environment.API_URL}/concert/searchKey`;


  //建立可監聽是否有刪除活動
  private deleteSource = new Subject<boolean>();
  deleteConcert$ = this.deleteSource.asObservable();
  deleteAction(go: boolean) {
    this.deleteSource.next(go);
  }


  /**POST:創建節目 */
  addConcert(addConcertData: ConcertRequest) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    return this.http.post<CreateConcertResponse>(this.CreateConcert_API_URL, addConcertData, { headers })
  }



  /**PUT:修改節目 */
  modifyConcert(concertData: ConcerModifyRequest) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    return this.http.put<ModifyConcertResponse>(this.ModifyConcert_API_URL, concertData, { headers })
  }

  /**GET:查詢可管控節目 */
  manageConcert(page: number, size: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ManageConcertResponse>(this.ManageConcert_API_URL, {
      params, headers
    })
  }

  /**GET:查詢單一節目 */
  searchConcert(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.get<ConcertSearchResponse>(this.SearchConcert_API_URL, {
      params,
      headers
    })
  }

  /**GET:關鍵字查詢銷售中的節目 */
  keySearchSaleConcert(key: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set('keyword', key);
    return this.http.get<SearchSaleConcertResponse>(this.KeySearch_API_URL, {
      params,
      headers
    })
  }

  /**GET:查詢銷售中的節目 */
  searchSaleConcert() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<SearchSaleConcertResponse>(this.SaleConcert_API_URL, {
      headers
    })
  }


  /**DELETE:刪除節目 */
  deleteConcert(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}` // Note the space after 'Bearer'
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<ModifyConcertResponse>(this.DeleteConcert_API_URL, {
      params,
      headers
    })
  }

}
