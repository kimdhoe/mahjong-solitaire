import { Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

@Component(
  { selector:    'home'
  , templateUrl: './home.component.html'
  , styleUrls:   [ './home.component.css' ]
  }
)
class HomeComponent {
  @Input() layoutNames: string[]

  @Output() deleteLayout = new EventEmitter<string>()

  onDeleteClick (name: string): void {
    this.deleteLayout.emit(name)
    console.log('foo')
  }
}

export default HomeComponent
