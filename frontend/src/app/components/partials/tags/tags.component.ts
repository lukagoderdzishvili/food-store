import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  public tags?: Array<Tag>;
  
  constructor(foodService: FoodService){
    foodService.getAllTags().subscribe((serverTag) => {
      this.tags = serverTag;
    })
  }
}
