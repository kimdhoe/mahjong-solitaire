import { Injectable } from '@angular/core'
import { Action }     from '@ngrx/store'
import { Actions
       , Effect
       }              from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/concat'
import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/take'

import { START_GAME
       , SHUFFLE
       , START_OVER
       }             from '../constants/action-names'
import { setBoards
       , removeLayer
       , renderLayer
       }             from '../actions/game'
import DealerService from '../../core/dealer.service'

@Injectable()
class RenderEffects {
  constructor ( private action$: Actions
              , private dealer:  DealerService
              ) {}

  @Effect()
  startGame$: Observable<Action> =
    this.action$
      .ofType(START_GAME)
      .mergeMap(() =>
        Observable.timer(0, 300)
          .take(5)  // Assume there are always 5 layers.
          .map(() => renderLayer())
      )

  @Effect()
  shuffle$: Observable<Action> =
    this.action$
      .ofType(SHUFFLE)
      .mergeMap(({ payload: { board } }) =>
        Observable.of(this.dealer.shuffle(board))
          .mergeMap(promise =>
            Observable.concat(
              Observable.timer(0, 200)
                .take(5)
                .map(removeLayer)
            , promise.then(setBoards)
            , Observable.interval(300)
                .take(5)
                .map(renderLayer)
            )
          )
      )

  @Effect()
  startOver$: Observable<Action> =
    this.action$
      .ofType(START_OVER)
      .mergeMap(({ payload: { layout } }) =>
        Observable.of(this.dealer.newBoard(layout.template))
          .mergeMap(promise =>
            Observable.concat(
              Observable.timer(0, 200)
                .take(5)
                .map(removeLayer)
            , promise.then(setBoards)
            , Observable.timer(0, 300)
                .take(5)
                .map(renderLayer)
            )
          )
      )
}

export default RenderEffects
