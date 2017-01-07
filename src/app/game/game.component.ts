import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       }              from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { Board
       , LayoutData
       , Tile
       , YesOrNo
       , Commit
       , Timeline
       } from '../world/model'

@Component(
  { selector:        'game'
  , templateUrl:     './game.component.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class Game {
  @Input() layout:        LayoutData
  @Input() board:         Board
  @Input() marked:        Tile[]
  @Input() shouldAnimate: YesOrNo
  @Input() visibleLayers: number

  @Input() timeline: Timeline

  @Output() mark            = new EventEmitter()
  @Output() startOver       = new EventEmitter()
  @Output() startOverAtOnce = new EventEmitter()
  @Output() shuffle         = new EventEmitter<Board>()
  @Output() shuffleAtOnce   = new EventEmitter<Board>()
  @Output() toggleAnimation = new EventEmitter()
  @Output() timeTravel      = new EventEmitter<Commit>()

  onMark (tile: Tile): void {
    this.mark.emit({ tile, marked: this.marked })
  }

  onStartOver (): void {
    if (this.shouldAnimate === 'yes')
      this.startOver.emit(this.layout)
    else
      this.startOverAtOnce.emit()
  }

  onShuffle (): void {
    if (this.shouldAnimate === 'yes')
      this.shuffle.emit(this.board)
    else
      this.shuffleAtOnce.emit()
  }

  onToggleAnimation (): void {
    this.toggleAnimation.emit()
  }

  onTimeTravel (commit: Commit): void {
    this.timeTravel.emit(commit)
  }
}

export default Game
