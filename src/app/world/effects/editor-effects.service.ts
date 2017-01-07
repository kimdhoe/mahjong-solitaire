import { Injectable } from '@angular/core'
import { Action }     from '@ngrx/store'
import { Actions
       , Effect
       }              from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'

import { INIT_GAME
       , SAVE_LAYOUT
       }                   from '../constants/action-names'
import { startGame }       from '../actions/game'
import { savedLayout }     from '../actions/editor'
import LayoutService       from '../../core/layout.service'

@Injectable()
class EditorEffects {
  constructor ( private action$: Actions
              , private layout:  LayoutService
              ) {}

  @Effect()
  saveLayout$: Observable<Action> =
    this.action$
      .ofType(SAVE_LAYOUT)
      .map(({ payload: { name, editor } }) => {
        this.layout.saveLayout(name, editor)

        return savedLayout()
      })
      .catch(e => Observable.of(savedLayout(false)))

  @Effect()
  initGame$: Observable<Action> =
    this.action$
      .ofType(INIT_GAME)
      .map(({ payload }) => this.layout.getLayout(payload.layout))
      .map(startGame)
}

export default EditorEffects
