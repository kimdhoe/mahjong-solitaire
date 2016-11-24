import { NgModule }     from '@angular/core'
import { CommonModule } from '@angular/common'

@NgModule(
  { imports: [ CommonModule ]
  , exports: [ CommonModule ]
  }
)
class SharedModule {}

export default SharedModule
