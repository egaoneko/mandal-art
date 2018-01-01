import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { MandalArtService } from '../mandal-art.service';
import { MandalArt } from '../../data/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public mandalArts: MandalArt[];

  private subs: Subscription[] = [];
  
  constructor(private mandalArtService: MandalArtService) { }

  public ngOnInit(): void {
    this.getMandalArts();
  }

  public ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private getMandalArts(): void {
    this.subs.push(
      this.mandalArtService.getMandalArts().subscribe(
        (mandalArts: MandalArt[]) => this.mandalArts = mandalArts
      )
    );
  }
}
