import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  public getAll(): Array<Food>{
    return sample_foods;
  }

  public getAllFoodBySearchTerm(searchTerm: string): Array<Food>{
    return this.getAll().filter(food => food.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }
}
