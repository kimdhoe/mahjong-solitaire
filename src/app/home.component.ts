import { Component
       , Input
       } from '@angular/core'

@Component(
  { selector:    'home'
  , templateUrl: './home.component.html'
  }
)
class HomeComponent {
  @Input() layoutNames: string[]
}

export default HomeComponent
