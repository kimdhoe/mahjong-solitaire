import { Injectable } from '@angular/core'

import { Board
       , Template
       } from '../world/model'
import { newBoard
       , newTurtleBoard
       , shuffleBoard
       }         from '../world/dealer'

@Injectable()
class DealerService {
  newBoard (template: Template): Promise<Board> {
    return new Promise((resolve, reject) => {
      try {
        resolve(newBoard(template))
      }
      catch (err) {
        console.error(err)
        reject(err)
      }
    })
  }

  // Produces a promise of a new turtle board.
  newTurtleBoard (): Promise<Board> {
    return new Promise((resolve, reject) => {
      try {
        resolve(newTurtleBoard())
      }
      catch (err) {
        console.error(err)
        reject(err)
      }
    })
  }

  // Given a board, produces a promise of a shuffled board.
  shuffle (board: Board): Promise<Board> {
    return new Promise((resolve, reject) => {
      try {
        resolve(shuffleBoard(board))
      }
      catch (err) {
        console.error(err)
        reject(err)
      }
    })
  }
}

export default DealerService
