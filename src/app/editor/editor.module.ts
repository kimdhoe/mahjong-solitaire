import { NgModule }     from '@angular/core'

import SharedModule        from '../shared/shared.module'
import EditorRoutingModule from './editor-routing.module'
import Editor              from './editor.component'
import EditorContainer     from './editor.container'

@NgModule(
  { imports:      [ SharedModule
                  , EditorRoutingModule
                  ]
  , declarations: [ Editor
                  , EditorContainer
                  ]
  }
)
class EditorModule {}

export default EditorModule
