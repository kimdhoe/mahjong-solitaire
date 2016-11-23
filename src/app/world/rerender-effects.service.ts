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

import { SHUFFLE }      from './constants/action-names'
import { setBoard
       , removeLayer
       , renderLayer
       }                from './actions'
import { shuffleBoard } from './dealer'

@Injectable()
class RerenderEffects {
  constructor (private action$: Actions) {}

  @Effect()
  shuffle$: Observable<Action> =
    this.action$.ofType(SHUFFLE)
      .mergeMap(({ payload: { board } }) =>
        Observable.concat(
          Observable.timer(0, 200).take(5)
            .map(() => removeLayer())
        , Observable.of(setBoard(shuffleBoard(board)))
        , Observable.interval(300).take(5)
            .map(() => renderLayer())
        )
      )
}

export default RerenderEffects
