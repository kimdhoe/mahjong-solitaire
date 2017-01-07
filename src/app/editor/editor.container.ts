import { Component
       , OnInit
       }              from '@angular/core'
import { Action
       , Store
       }              from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { World } from '../world/model'
import { EditorBoard
       , SlotAddress
       }         from '../world/editor-model'
import * as act  from '../world/actions/editor'

@Component(
  { selector: 'editor-container'
  , template: `<editor
                 [editor]="editor$ | async"
                 [isAdding]="isAdding$ | async"
                 [numberOfAdded]="numberOfAdded$ | async"
                 [hasChanged]="hasChanged$ | async"

                 (addTile)="onAddTile($event)"
                 (removeTile)="onRemoveTile($event)"
                 (toggleMode)="onToggleMode()"
                 (resetEditor)="onResetEditor()"
                 (saveLayout)="onSaveLayout($event)"
               >
               </editor>
              `
  }
)
class EditorContainer implements OnInit {
  editor$:        Observable<EditorBoard>
  isAdding$:      Observable<boolean>
  numberOfAdded$: Observable<number>
  hasChanged$:    Observable<boolean>

  constructor (private store: Store<World>) {
    this.editor$        = store.select('editor')
    this.isAdding$      = store.select('isAdding')
    this.numberOfAdded$ = store.select('numberOfAdded')
    this.hasChanged$    = store.select('hasChanged')
  }

  ngOnInit (): void {
    this.store.dispatch(act.initEditor())
  }

  onAddTile (address: SlotAddress): void {
    this.store.dispatch(act.addTile(address))
  }

  onRemoveTile (address: SlotAddress): void {
    this.store.dispatch(act.removeTile(address))
  }

  onToggleMode (): void {
    this.store.dispatch(act.toggleMode())
  }

  onResetEditor (): void {
    this.store.dispatch(act.resetEditor())
  }

  // Saves a user-created layout to the Local Storage.
  onSaveLayout ({ name, editor}: { name: string, editor: EditorBoard }): void {
    this.store.dispatch(act.saveLayout(name, editor))
  }
}

export default EditorContainer
