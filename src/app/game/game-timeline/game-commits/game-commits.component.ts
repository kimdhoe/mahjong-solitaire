import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

import { Timeline
       , Commit
       } from '../../../world/model'
const random = (n: number): number =>
  Math.floor(Math.random() * (n + 1))

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
  @Input() bgcolor: string

  @Output() timeTravel = new EventEmitter<Commit>()

  onTimeTravel (commit: Commit): void {
    this.timeTravel.emit(commit)
  }

  randomColor (): string {
    const digits = '0123456789ABCDEF'
    let color = ''

    for (let i = 0; i < 6; i++) {
      color += digits[Math.floor(Math.random() * 16)]
    }

    return '#' + color
  }

  commitId (i: number, commit: Commit): string {
    return commit.id
  }
}

export default GameCommits
