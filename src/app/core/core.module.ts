import { NgModule } from '@angular/core'

import DealerService from './dealer.service'
import IdService     from './id.service'

@NgModule(
  { providers: [ DealerService
               , IdService
               ]
  }
)
class CoreModule {}

export default CoreModule
