import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , OnInit
       , Output
       } from '@angular/core'

import IdService from '../../core/id.service'

@Component(
  { selector:        'editor-control'
  , templateUrl:     './editor-control.component.html'
  , styleUrls:       [ './editor-control.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class EditorControlComponent {
  layoutName: string = ''

  @Input() isAdding:      boolean
  @Input() numberOfAdded: number

  @Output() toggleMode = new EventEmitter()

  constructor (private id: IdService) {}

  onToggleClick (): void {
    this.toggleMode.emit()
  }

  onResetClick (): void {
    console.log('Reset plz..')
  }

  onSaveClick (): void {
    const name = this.layoutName.trim() || this.id.generate()

    console.log(name, 'Save plz..')
  }
}

export default EditorControlComponent
