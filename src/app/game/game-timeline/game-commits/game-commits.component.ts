import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

import { Timeline
       , Commit
       } from '../../../world/model'

@Component(
  { selector:        'game-commits'
  , templateUrl:     './game-commits.component.html'
  , styleUrls:       [ './game-commits.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class GameCommits {
  @Input() commits: Commit[]
  @Input() current: Commit

  @Output() timeTravel = new EventEmitter<Commit>()

  // Emits a timeTravel event loaded with a given commit.
  onTimeTravel (commit: Commit): void {
    this.timeTravel.emit(commit)
  }

  // Returns id of a given commit.
  commitId (i: number, commit: Commit): string {
    return commit.id
  }
}

export default GameCommits
