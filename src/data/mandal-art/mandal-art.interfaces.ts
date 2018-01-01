import { MandalArtType } from "../";

export interface MandalArt {
  id: number;
  title: string;
  description?: string;
  goal: MandalArtGoal;
}

export interface MandalArtGoal {
  main: MandalArtMainGoal;
  sub: MandalArtSubGoal[];
}

export interface MandalArtMainGoal {
  title: string;
  description?: string;
}

export interface MandalArtSubGoal {
  title: string;
  description?: string;
  detail: MandalArtGoalDetail[];
}

export interface MandalArtGoalDetail {
  title: string;
  description?: string;
}

export interface MandalArtViewGoal {
  title: string;
  description: string;
  detail: MandalArtGoalDetail[];
  class: MandalArtType;
}
