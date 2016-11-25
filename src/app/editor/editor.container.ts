import { Component
       , OnInit
       }              from '@angular/core'
import { Action
       , Store
       }              from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { World }  from '../world/model'
import { EditorBoard
       , SlotAddress
       } from '../world/editor-model'
import * as act from '../world/actions/editor'

@Component(
  { selector: 'editor-container'
  , template: `<editor
                 [editor]="editor$ | async"

                 (toggle)="onToggle($event)"
               >
               </editor>
              `
  }
)
class EditorContainer {
  editor$: Observable<EditorBoard>

  constructor (private store: Store<World>) {
    const editor$ = store.select('editor')

    this.editor$ = editor$

    editor$.subscribe(x => console.log(x))
  }

  onToggle (address: SlotAddress): void {
    this.store.dispatch(act.toggleSlot(address))
  }

}

export default EditorContainer
