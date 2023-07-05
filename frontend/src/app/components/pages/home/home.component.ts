import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){
        this.foods = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
      }else{
        this.foods = this.foodService.getAll();
      }
    });
  }

}
