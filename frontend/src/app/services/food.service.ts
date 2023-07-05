import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';

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

  public getAllTags(): Array<Tag>{
    return sample_tags;
  }

  public getAllFoodsByTag(tag: string): Array<Food>{
    return tag === 'All'?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag));
  }

  public getFoodById(foodId: string): Food{
    return this.getAll().find(food => food.id === foodId) ?? new Food();
  }
}
