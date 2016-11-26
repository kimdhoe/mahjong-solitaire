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

                 (addTile)="onAddTile($event)"
                 (removeTile)="onRemoveTile($event)"
                 (toggleMode)="onToggleMode()"
                 (saveLayout)="onSaveLayout($event)"
               >
               </editor>
              `
  }
)
class EditorContainer {
  editor$:        Observable<EditorBoard>
  isAdding$:      Observable<boolean>
  numberOfAdded$: Observable<number>

  constructor (private store: Store<World>) {
    this.editor$        = store.select('editor')
    this.isAdding$      = store.select('isAdding')
    this.numberOfAdded$ = store.select('numberOfAdded')

    this.editor$.subscribe(x => console.log(x))
    this.isAdding$.subscribe(x => console.log(x))
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

  // Saves a user-created layout to local storage.
  onSaveLayout ({ name: string, layout: EditorBoard }): void {
    console.log('*** Save layout to Local Storage. ***')
    // this.store.dispatch(act.saveLayout(name, layout))
  }
}

export default EditorContainer
