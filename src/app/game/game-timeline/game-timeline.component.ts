import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

import { Commit
       , Timeline
       } from '../../world/model'

@Component(
  { selector:        'game-timeline'
  , templateUrl:     './game-timeline.component.html'
  , styleUrls:       [ './game-timeline.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class GameTimeline {
  @Input() timeline: Timeline

  @Output() timeTravel = new EventEmitter<Commit>()

  onTimeTravel (commit: Commit): void {
    this.timeTravel.emit(commit)
  }
}

export default GameTimeline
