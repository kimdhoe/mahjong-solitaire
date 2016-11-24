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

import 'rxjs/add/operator/distinctUntilChanged'

import { Board
       , Commit
       , Table
       , Tile
       , World
       , YesOrNo
       , Timeline
       }                from '../world/model'
import { shuffleBoard } from '../world/dealer'
import * as act         from '../world/actions'

@Component(
  { selector: 'game-container'
  , template: `<game
                 [board]="board$ | async"
                 [marked]="marked$ | async"
                 [shouldAnimate]="shouldAnimate$ | async"
                 [visibleLayers]="visibleLayers$ | async"
                 [timeline]="timeline$ | async"

                 (mark)="onMark($event)"
                 (shuffle)="onShuffle($event)"
                 (shuffleAtOnce)="onShuffleAtOnce()"
                 (toggleAnimation)="onToggleAnimation()"
                 (timeTravel)="onTimeTravel($event)"
                 (startOver)="onStartOver()"
                 (startOverAtOnce)="onStartOverAtOnce()"
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

  timeline$: Observable<Timeline>

  constructor (private store: Store<World>) {
    const table$: Observable<Table> = store.select('table')

    this.board$         = table$.map(table => table.board)
    this.marked$        = table$.map(table => table.marked)
    this.timeline$      = table$.map(table => table.timeline)
    this.shouldAnimate$ = store.select('shouldAnimate')
    this.visibleLayers$ = store.select('visibleLayers')

    store.subscribe(x => console.log(x))
  }

  ngOnInit (): void {
    this.store.dispatch(act.startGame())

    // !!!
    // Local storage?
    // Save board and timeline state.
    // Seems to be sufficient to listen for timeline changes and nothing else.
    this.timeline$
      .distinctUntilChanged()
      .subscribe(x => {
        console.log('Save board and timeline state.')
      })
  }

  onStartOver (): void {
    this.store.dispatch(act.startOver())
  }

  onStartOverAtOnce (): void {
    this.store.dispatch(act.startGame())
  }

  onMark ({ tile, marked }): void {
    this.store.dispatch(act.markTile(tile, marked))
  }

  onShuffle (board: Board): void {
    this.store.dispatch(act.shuffle(board))
  }

  onShuffleAtOnce (): void {
    this.store.dispatch(act.shuffleAtOnce())
  }

  onToggleAnimation (): void {
    this.store.dispatch(act.toggleAnimation())
  }

  onTimeTravel (commit: Commit): void {
    this.store.dispatch(act.timeTravel(commit))
  }
}

export default GameContainer
