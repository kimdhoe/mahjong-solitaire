import { Injectable } from '@angular/core'
import { Action }     from '@ngrx/store'
import { Actions
       , Effect
       }              from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/take'

import { START_GAME }  from './constants/action-names'
import { renderLayer } from './actions'

@Injectable()
class RenderEffects {
  constructor (private action$: Actions) {}

  @Effect()
  startGame$: Observable<Action> = this.action$
    .ofType(START_GAME)
    // Assume there are always 5 layers.
    .mergeMap(() => Observable.timer(0, 300).take(5)
                      .map(() => renderLayer())
             )
}

export default RenderEffects
