import { NgModule } from '@angular/core'
import { RouterModule
       , Routes
       } from '@angular/router'

import EditorContainer from './editor.container'

const editorRoutes: Routes =
   [ { path: 'editor', component: EditorContainer } ]

@NgModule(
  { imports: [ RouterModule.forChild(editorRoutes) ]
  , exports: [ RouterModule ]
  }
)
class EditorRoutingModule {}

export default EditorRoutingModule
