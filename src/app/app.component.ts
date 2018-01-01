import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MandalArt } from '../data/index';
import { MandalArtService } from './mandal-art.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public mandalArts: MandalArt[];
  public selectedMandalArt: MandalArt;
  
  @ViewChild('selecElf')
  private selecElf: ElementRef;

  private subs: Subscription[] = [];

  constructor(private route: Router,
              private mandalArtService: MandalArtService) { }

  public ngOnInit(): void {
    this.getMandalArts();
    this.subs.push(
      this.mandalArtService
      .getSelectedChangeEmitter()
      .subscribe(
        (mandalArt: MandalArt) => {
          this.selectedMandalArt = mandalArt;

          let isSelected: boolean = false;
          const options: HTMLOptionElement[] = this.selecElf.nativeElement.querySelectorAll('option');
          options.forEach((option: HTMLOptionElement) => {
            if (option.value !== mandalArt.id.toString()) {
              return;
            }
            option.selected = true;
            isSelected = true;
          });

          if (!isSelected) {
            options[0].selected = true;
          }
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
  
  public selectMandalArt(selectedValue: string): void {
    const id: number = parseInt(selectedValue, 10);

    if (Number.isNaN(id)) {
      return;
    }

    this.route.navigate([`mandal-art/${id}`]);
  }
  
  private getMandalArts(): void {
    this.mandalArtService.getMandalArts().subscribe(
      (mandalArts: MandalArt[]) => this.mandalArts = mandalArts
    );
  }
}
