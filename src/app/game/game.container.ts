import { Component
       , OnInit
       }              from '@angular/core'
import { Action
       , Store
       }              from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/last'
import 'rxjs/add/operator/map'

import { Board
       , Table
       , Tile
       , World
       , YesOrNo
       }                from '../world/model'
import { shuffleBoard } from '../world/dealer'
import { markTile
       , shuffle
       , shuffleAtOnce
       , startGame
       , redo
       , toggleAnimation
       , undo
       }                from '../world/actions'

@Component(
  { selector: 'game-container'
  , template: `<game
                 [board]="board$ | async"
                 [marked]="marked$ | async"
                 [shouldAnimate]="shouldAnimate$ | async"
                 [visibleLayers]="visibleLayers$ | async"

                 (mark)="onMark($event)"
                 (redo)="onRedo()"
                 (undo)="onUndo()"
                 (shuffle)="onShuffle($event)"
                 (shuffleAtOnce)="onShuffleAtOnce()"
                 (toggleAnimation)="onToggleAnimation()"
               >
               </game>
              `
  }
)
class GameContainer implements OnInit {
  board$:         Observable<Board>
  marked$:        Observable<Tile[]>
  shouldAnimate$: Observable<YesOrNo>
  visibleLayers$: Observable<number>

  constructor (private store: Store<World>) {
    const table$: Observable<Table> = store.select('table')

    this.board$         = table$.map(table => table.board)
    this.marked$        = table$.map(table => table.marked)
    this.shouldAnimate$ = store.select('shouldAnimate')
    this.visibleLayers$ = store.select('visibleLayers')

    store.subscribe(x => console.log(x))
  }

  ngOnInit (): void {
    this.store.dispatch(startGame())
  }

  // Dispatches MARK_TILE action.
  onMark (tile: Tile): void {
    this.store.dispatch(markTile(tile))
  }

  // Dispatches REDO action.
  onRedo (): void {
    this.store.dispatch(redo())
  }

  // Dispatches UNDO action.
  onUndo (): void {
    this.store.dispatch(undo())
  }

  // Dispatches SHUFFLE action.
  onShuffle (board: Board): void {
    this.store.dispatch(shuffle(board))
  }

  // Dispatches SHUFFLE_AT_ONCE action.
  onShuffleAtOnce (): void {
    this.store.dispatch(shuffleAtOnce())
  }

  // Dispatches TOGGLE_ANIMATION action.
  onToggleAnimation (): void {
    this.store.dispatch(toggleAnimation())
  }
}

export default GameContainer
