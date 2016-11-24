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

import DealerService    from '../core/dealer.service'
import { SHUFFLE
       , START_OVER
       }                from './constants/action-names'
import { setBoard
       , removeLayer
       , renderLayer
       }                from './actions'
import { shuffleBoard } from './dealer'

@Injectable()
class RerenderEffects {
  constructor ( private action$: Actions
              , private dealer:  DealerService
              ) {}

  @Effect()
  shuffle$: Observable<Action> =
    this.action$
      .ofType(SHUFFLE)
      .mergeMap(({ payload: { board } }) =>
        Observable.of(this.dealer.shuffle(board))
          .mergeMap(p =>
            Observable.concat(
              Observable.timer(0, 200)
                .take(5)
                .map(() => removeLayer())
            , p.then(setBoard)
            , Observable.interval(300)
                .take(5)
                .map(() => renderLayer())
            )
          )
      )

  @Effect()
  startOver$: Observable<Action> =
    this.action$
      .ofType(START_OVER)
      .mergeMap(() =>
        Observable.of(this.dealer.newTurtleBoard())
          .mergeMap(p =>
            Observable.concat(
              Observable.timer(0, 200)
                .take(5)
                .map(() => removeLayer())
            , p.then(setBoard)
            , Observable.timer(0, 300)
                .take(5)
                .map(() => renderLayer())
            )
          )
      )
}

export default RerenderEffects
