import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<Food>>{
    return this.http.get<Array<Food>>(FOODS_URL);
  }

  public getAllFoodBySearchTerm(searchTerm: string): Observable<Array<Food>>{
    return this.http.get<Array<Food>>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  public getAllTags(): Observable<Array<Tag>>{
    return this.http.get<Array<Tag>>(FOODS_TAGS_URL);
  }

  public getAllFoodsByTag(tag: string): Observable<Array<Food>>{
    return tag === 'All'?
    this.getAll():
    this.http.get<Array<Food>>(FOODS_BY_TAG_URL + tag);
  }

  public getFoodById(foodId: string): Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }
}
