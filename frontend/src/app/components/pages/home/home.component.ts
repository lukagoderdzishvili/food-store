import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public foods: Array<Food> = [];
  
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute){
    let foodsObservable: Observable<Array<Food>>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){
        foodsObservable = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
      } else if(params.tag){
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      } else{
        foodsObservable = this.foodService.getAll();
      }

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

}
