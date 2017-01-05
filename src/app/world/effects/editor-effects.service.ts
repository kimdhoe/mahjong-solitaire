import { Injectable } from '@angular/core'
import { Action }     from '@ngrx/store'
import { Actions
       , Effect
       }              from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'

import { SAVE_LAYOUT }     from '../constants/action-names'
import { serializeEditor } from '../editor-model'
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
}

export default EditorEffects
