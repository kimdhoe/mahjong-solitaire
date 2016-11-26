import { NgModule }     from '@angular/core'

import SharedModule           from '../shared/shared.module'
import EditorRoutingModule    from './editor-routing.module'
import EditorContainer        from './editor.container'
import EditorComponent        from './editor.component'
import EditorLayerComponent   from './editor-layer/editor-layer.component'
import EditorRowComponent     from './editor-row/editor-row.component'
import EditorSlotComponent    from './editor-slot/editor-slot.component'
import EditorControlComponent from './editor-control/editor-control.component'

@NgModule(
  { imports:      [ SharedModule
                  , EditorRoutingModule
                  ]
  , declarations: [ EditorContainer
                  , EditorComponent
                  , EditorLayerComponent
                  , EditorRowComponent
                  , EditorSlotComponent
                  , EditorControlComponent
                  ]
  }
)
class EditorModule {}

export default EditorModule
