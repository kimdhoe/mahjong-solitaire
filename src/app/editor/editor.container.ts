import { Component
       , OnInit
       }         from '@angular/core'
import { Action
       , Store
       }         from '@ngrx/store'
import { World } from '../world/model'
@Component(
  { selector: 'editor-container'
  , template: `<editor
               >
               </editor>
              `
  }
)
class EditorContainer {
  constructor (private store: Store<World>) {
  }

}

export default EditorContainer
