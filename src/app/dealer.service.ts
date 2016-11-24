import { Injectable } from '@angular/core'

import { Board } from './world/model'
import { newTurtleBoard
       , shuffleBoard
       }         from './world/dealer'

@Injectable()
class DealerService {
  newTurtleBoard (): Promise<Board> {
    return Promise.resolve(newTurtleBoard())
  }

  shuffle (board: Board): Promise<Board> {
    return Promise.resolve(shuffleBoard(board))
  }
}

export default DealerService
