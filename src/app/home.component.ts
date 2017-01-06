import { Component
       , Input
       } from '@angular/core'

@Component(
  { selector: 'home'
  , template: `<p>Hello World</p>
               <ul>
                 <li *ngFor="let name of layoutNames">{{name}}</li>
               </ul>
              `
  }
)
class HomeComponent {
  @Input() layoutNames: string[]
}

export default HomeComponent
