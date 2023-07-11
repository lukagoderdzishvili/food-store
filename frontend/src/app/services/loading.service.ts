import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public showLoading(): void{
    this.isLoadingSubject.next(true);
  }

  public hideLoading(): void{
    this.isLoadingSubject.next(false);
  }

  public get isLoading(): Observable<boolean>{
    return this.isLoadingSubject.asObservable();
  }
}
