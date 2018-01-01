import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  MandalArt,
  mandalArts,
  MandalArtViewGoal,
  MandalArtType,
  MandalArtSubGoal,
  MandalArtGoalDetail,
} from '../../data';
import { MandalArtService } from '../mandal-art.service';

@Component({
  selector: 'app-mandal-art',
  templateUrl: './mandal-art.component.html',
  styleUrls: ['./mandal-art.component.scss']
})
export class MandalArtComponent implements OnInit, OnDestroy {

  public mandalArt: MandalArt;
  public mandalArtViewGoals: MandalArtViewGoal[] = [];

  private subs: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private mandalArtService: MandalArtService) { }

  public ngOnInit(): void {
    this.subs.push(
      this.route.params.subscribe(() => {
        this.getMandalArt();
      })
    );
  }

  public ngOnDestroy(): void {
    this.mandalArtService.clearSelection();
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private getMandalArt(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subs.push(
      this.mandalArtService.getMandalArt(id).subscribe(
        (mandalArt: MandalArt) => {
          this.mandalArtService.selectMandalArt(mandalArt);
          this.initMandalArt(mandalArt)
        }
      )
    );
  }

  private initMandalArt(mandalArt: MandalArt): void {
    this.mandalArt = mandalArt;

    let subIdx = 0;
    for (let idx=0;idx < 9;idx++) {
      if (idx === 4) {
        this.mandalArtViewGoals[idx] = this.getMandalArtViewMainGoal(mandalArt);
        continue;
      }

      this.mandalArtViewGoals[idx] = this.getMandalArtViewMainSub(mandalArt, subIdx);
      subIdx++;
    }
  };

  private getMandalArtViewMainGoal(mandalArt: MandalArt): MandalArtViewGoal {
    return {
      title: mandalArt.goal.main.title,
      description: mandalArt.goal.main.description,
      detail: mandalArt.goal.sub.map((sub: MandalArtSubGoal) => {
        return {
          title: sub.title,
          description: sub.description
        } as MandalArtGoalDetail;
      }),
      class: MandalArtType.MAIN
    } as MandalArtViewGoal;
  }

  private getMandalArtViewMainSub(mandalArt: MandalArt, index: number): MandalArtViewGoal {
    const sub: MandalArtSubGoal = this.mandalArt.goal.sub[index];
    return {
      title: sub.title,
      description: sub.description,
      detail: sub.detail,
      class: MandalArtType.SUB
    } as MandalArtViewGoal;
  }
}
