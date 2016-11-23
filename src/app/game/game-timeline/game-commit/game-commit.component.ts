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
  { selector:        'game-commit'
  , templateUrl:     './game-commit.component.html'
  , styleUrls:       [ './game-commit.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class GameCommit {
  @Input() commit:  Commit
  @Input() current: Commit

  @Output() timeTravel = new EventEmitter<Commit>()

  isCurrentPosition (): boolean {
    return this.commit === this.current
  }

  onPointClick (): void {
    if (!this.isCurrentPosition())
      this.timeTravel.emit(this.commit)
  }

  onTimeTravel (commit: Commit): void {
    this.timeTravel.emit(commit)
  }
}

export default GameCommit
