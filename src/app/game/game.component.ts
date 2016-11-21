import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       }              from '@angular/core'
import { Action
       , Store
       }              from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'

import { Board
       , Table
       , Tile
       , World
       , YesOrNo
       } from '../world/model'
import { markTile
       , startGame
       , redo
       , undo
       } from '../world/actions'

@Component(
  { selector:        'game'
  , templateUrl:     './game.component.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class Game {
  @Input() board:         Board
  @Input() marked:        Tile[]
  @Input() shouldAnimate: YesOrNo
  @Input() visibleLayers: number

  @Output() mark            = new EventEmitter<Tile>()
  @Output() redo            = new EventEmitter()
  @Output() undo            = new EventEmitter()
  @Output() shuffle         = new EventEmitter<Board>()
  @Output() shuffleAtOnce   = new EventEmitter<Board>()
  @Output() toggleAnimation = new EventEmitter()

  onMark (tile: Tile): void {
    this.mark.emit(tile) }

  onRedo (): void {
    this.redo.emit()
  }

  onUndo (): void {
    this.undo.emit()
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
}

export default Game
