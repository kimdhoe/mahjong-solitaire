import { Component
       , Input
       } from '@angular/core'

@Component(
  { selector:    'home'
  , templateUrl: './home.component.html'
  , styleUrls:   [ './home.component.css' ]
  }
)
class HomeComponent {
  @Input() layoutNames: string[]
}

export default HomeComponent
