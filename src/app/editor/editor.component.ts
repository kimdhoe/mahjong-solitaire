import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       }              from '@angular/core'
import { Action
       , Store
       }              from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'

import { } from '../world/model'
import { } from '../world/actions'

@Component(
  { selector:        'editor'
  , templateUrl:     './editor.component.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class Editor {
}

export default Editor
