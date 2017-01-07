import { NgModule } from '@angular/core'

import DealerService      from './dealer.service'
import IdService          from './id.service'
import LayoutService      from './layout.service'

@NgModule(
  { providers: [ DealerService
               , IdService
               , LayoutService
               ]
  }
)
class CoreModule {}

export default CoreModule
