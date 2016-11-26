import { Injectable } from '@angular/core'
import { generate }   from 'shortid'

@Injectable()
class IdService {
  generate (): string {
    return generate()
  }
}

export default IdService
