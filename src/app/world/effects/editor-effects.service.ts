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
import TURTLE              from '../constants/templates/turtle'
import { serializeEditor } from '../editor-model'
import { startGame }       from '../actions/game'
import { savedLayout }     from '../actions/editor'

@Injectable()
class EditorEffects {
  constructor (private action$: Actions) {}

  @Effect()
  saveLayout$: Observable<Action> =
    this.action$
      .ofType(SAVE_LAYOUT)
      .map(({ payload: { name, editor } }) => {
        const templates = JSON.parse(localStorage.getItem('templates')) || {}
        templates[name] = serializeEditor(editor)
        localStorage.setItem('templates', JSON.stringify(templates))

        return savedLayout()
      })
      .catch(e => Observable.of(savedLayout(false)))

  @Effect()
  initGame$: Observable<Action> =
    this.action$
      .ofType(INIT_GAME)
      .map(({ payload: { layout } }) => {
        const templates = JSON.parse(localStorage.getItem('templates')) || {}

        if (templates[layout])
          return { name:     layout
                 , template: templates[layout]
                 }

        return { name:     'turtle'
               , template: TURTLE
               }
      })
      .map(startGame)
}

export default EditorEffects
