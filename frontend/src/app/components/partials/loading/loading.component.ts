import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  public isLoading!: boolean;

  constructor(loadingService: LoadingService){
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
