import { Component
       , OnInit
       }              from '@angular/core'
import { ActivatedRoute
       , Params
       }              from '@angular/router'
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
       , LayoutData
       , Table
       , Tile
       , World
       , YesOrNo
       , Timeline
       }                from '../world/model'
import { shuffleBoard } from '../world/dealer'
import * as act         from '../world/actions/game'

@Component(
  { selector: 'game-container'
  , template: `<game
                 [layout]="layout$ | async"
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
                 (startOver)="onStartOver($event)"
                 (startOverAtOnce)="onStartOverAtOnce()"
               >
               </game>
              `
  }
)
class GameContainer implements OnInit {
  layout$:        Observable<LayoutData>
  board$:         Observable<Board>
  marked$:        Observable<Tile[]>
  shouldAnimate$: Observable<YesOrNo>
  visibleLayers$: Observable<number>
  timeline$:      Observable<Timeline>

  constructor ( private store: Store<World>
              , private route: ActivatedRoute
              ) {
    const table$: Observable<Table> = store.select('table')

    this.layout$        = table$.map(t => t.layout)
    this.board$         = table$.map(t => t.board)
    this.marked$        = table$.map(t => t.marked)
    this.timeline$      = table$.map(t => t.timeline)
    this.shouldAnimate$ = store.select('shouldAnimate')
    this.visibleLayers$ = store.select('visibleLayers')

    // store.subscribe(x => console.log(x))
  }

  ngOnInit (): void {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(act.initGame(params['name']))
    })

    // !!! Save game status?
    // Save board and timeline state.
    // Seems to be sufficient to listen for timeline changes and nothing else.
    // this.timeline$
    //   .distinctUntilChanged()
    //   .subscribe(x => {
    //     console.log('Save board and timeline state.')
    //   })
  }

  onStartOver (layout: LayoutData): void {
    this.store.dispatch(act.startOver(layout))
  }

  onStartOverAtOnce (): void {
    this.store.dispatch(act.startOverAtOnce())
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
