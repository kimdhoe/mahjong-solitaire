import { NgModule } from '@angular/core'

import DealerService from './dealer.service'

@NgModule(
  { providers: [ DealerService ] }
)
class CoreModule {}

export default CoreModule
