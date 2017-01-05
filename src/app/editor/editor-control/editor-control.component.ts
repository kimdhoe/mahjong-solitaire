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
  @Output() saveLayout = new EventEmitter<string>()

  constructor (private id: IdService) {}

  onToggleClick (): void {
    this.toggleMode.emit()
  }

  onResetClick (): void {
    console.log('Reset plz..')
  }

  onSaveClick (): void {
    let name = this.layoutName.trim()

    if (!name) {
      this.layoutName = this.id.generate()
      name = this.layoutName
    }

    console.log('Save layout. NAME: ' + name)

    this.saveLayout.emit(this.layoutName)
  }
}

export default EditorControlComponent
