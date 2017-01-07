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
  @Input() hasChanged:    boolean

  @Output() toggleMode  = new EventEmitter()
  @Output() resetEditor = new EventEmitter()
  @Output() saveLayout  = new EventEmitter<string>()

  constructor (private id: IdService) {}

  onToggleClick (): void {
    this.toggleMode.emit()
  }

  onResetClick (): void {
    this.resetEditor.emit()
  }

  onSaveClick (): void {
    let name = this.layoutName.trim()

    if (!name) {
      this.layoutName = this.id.generate()
      name = this.layoutName
    }

    this.saveLayout.emit(this.layoutName)
  }
}

export default EditorControlComponent
