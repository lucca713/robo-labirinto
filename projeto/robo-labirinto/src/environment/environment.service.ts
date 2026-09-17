import { Injectable } from '@nestjs/common';


export enum Cell {
  FREE = 0, // caminho livre, o robô pode andar aqui
  WALL = 1, // parede, o robô não pode entrar
  START = 2, // posição inicial do robô
  GOAL = 3, // objetivo, onde o robô quer chegar
  ROBO = 4
}

@Injectable()
export class EnvironmentService {

  private aux: Cell

  private readonly maze: Cell[][] = [
    [Cell.START, Cell.FREE, Cell.WALL, Cell.FREE, Cell.FREE],
    [Cell.FREE, Cell.WALL, Cell.FREE, Cell.FREE, Cell.WALL],
    [Cell.FREE, Cell.WALL, Cell.FREE, Cell.WALL, Cell.FREE],
    [Cell.FREE, Cell.FREE, Cell.FREE, Cell.WALL, Cell.FREE],
    [Cell.WALL, Cell.FREE, Cell.WALL, Cell.FREE, Cell.GOAL],
  ];

  reset(): { linha: number, coluna: number } {
    for (let i = 0; i < this.maze.length; i++) {
      for (let j = 0; j < this.maze.length; j++) {
        if (this.maze[i][j] === Cell.START) {
          this.aux = this.maze[i][j]
          this.maze[i][j] = Cell.ROBO;

          return { linha: i, coluna: j };
        }
      }
    }
  }

  IrParaCima(linhaAtual: number, colunaAtual: number): { recompensa: Number, novaLinha: Number, novaColuna: Number, chegou: boolean } {
    //quer dizer que tem linha de cima
    //guardar o estado da colun que ele esta indo para quando ele sair voltar o valroque ela era
    if (linhaAtual > 0) {
      if (this.maze[linhaAtual - 1][colunaAtual] != Cell.WALL) {

        if (this.maze[linhaAtual - 1][colunaAtual] === Cell.GOAL) {

          this.aux = [linhaAtual - 1][colunaAtual]
          this.maze[linhaAtual - 1][colunaAtual] = Cell.ROBO

          return { recompensa: 100, novaLinha: linhaAtual - 1, novaColuna: colunaAtual, chegou: true }

        }

        //colocar o robo na nova posicao
        this.aux = [linhaAtual - 1][colunaAtual]
        this.maze[linhaAtual - 1][colunaAtual] = Cell.ROBO

        return {
          recompensa: -1,
          novaLinha: linhaAtual - 1, novaColuna: colunaAtual, chegou: false
        }
      } else {
        this.maze[linhaAtual][colunaAtual] = Cell.ROBO
        return { recompensa: -10, novaLinha: linhaAtual, novaColuna: colunaAtual, chegou: false }
      }

    }

    const resetar = this.reset()
    return { recompensa: -10, novaLinha: resetar.linha, novaColuna: resetar.coluna, chegou: false }
  }

  irParaBaixo(linhaAtual: number, colunaAtual: number): { recompensa: Number, novaLinha: Number, novaColuna: Number, chegou: boolean } {
    if (linhaAtual < 4) {
      if (this.maze[linhaAtual + 1][colunaAtual] != Cell.WALL) {

        if (this.maze[linhaAtual + 1][colunaAtual] === Cell.GOAL) {

          this.aux = [linhaAtual + 1][colunaAtual]
          this.maze[linhaAtual + 1][colunaAtual] = Cell.ROBO

          return { recompensa: 100, novaLinha: linhaAtual + 1, novaColuna: colunaAtual, chegou: true }

        }

        //colocar o robo na nova posicao
        this.aux = [linhaAtual + 1][colunaAtual]
        this.maze[linhaAtual + 1][colunaAtual] = Cell.ROBO

        return {
          recompensa: -1,
          novaLinha: linhaAtual + 1, novaColuna: colunaAtual, chegou: false
        }
      } else {
        this.maze[linhaAtual][colunaAtual] = Cell.ROBO

        //robo for para a parede mantem na mesma posicao
        return { recompensa: -10, novaLinha: linhaAtual, novaColuna: colunaAtual, chegou: false }
      }
    }

    const resetar = this.reset()
    return { recompensa: -10, novaLinha: resetar.linha, novaColuna: resetar.coluna, chegou: false }
  }

  irParaDireita(linhaAtual: number, colunaAtual: number): { recompensa: Number, novaLinha: Number, novaColuna: Number, chegou: boolean } {
    if (colunaAtual < 4) {
      if (this.maze[linhaAtual][colunaAtual + 1] != Cell.WALL) {
        if (this.maze[linhaAtual][colunaAtual + 1] === Cell.GOAL) {

          this.aux = [linhaAtual][colunaAtual + 1]
          this.maze[linhaAtual][colunaAtual + 1] = Cell.ROBO

          return { recompensa: 100, novaLinha: linhaAtual, novaColuna: colunaAtual + 1, chegou: true }

        }
        //colocar o robo na nova posicao
        this.aux = [linhaAtual][colunaAtual + 1]
        this.maze[linhaAtual][colunaAtual + 1] = Cell.ROBO

        return {
          recompensa: -1,
          novaLinha: linhaAtual, novaColuna: colunaAtual + 1, chegou: false
        }
      } else {
        this.maze[linhaAtual][colunaAtual] = Cell.ROBO

        //robo for para a parede mantem na mesma posicao
        return { recompensa: -10, novaLinha: linhaAtual, novaColuna: colunaAtual, chegou: false }
      }
    }
    //resetra por que caiu
    const resetar = this.reset()
    return { recompensa: -10, novaLinha: resetar.linha, novaColuna: resetar.coluna, chegou: false }
  }

  irParaEsquerda(linhaAtual: number, colunaAtual: number): { recompensa: Number, novaLinha: Number, novaColuna: Number, chegou: boolean } {
    if (colunaAtual > 0) {
      if (this.maze[linhaAtual][colunaAtual - 1] != Cell.WALL) {
        if (this.maze[linhaAtual][colunaAtual - 1] === Cell.GOAL) {

          this.aux = [linhaAtual][colunaAtual - 1]
          this.maze[linhaAtual][colunaAtual - 1] = Cell.ROBO

          return { recompensa: 100, novaLinha: linhaAtual, novaColuna: colunaAtual - 1, chegou: true }

        }
        //colocar o robo na nova posicao
        this.aux = [linhaAtual][colunaAtual - 1]
        this.maze[linhaAtual][colunaAtual - 1] = Cell.ROBO

        return {
          recompensa: -1,
          novaLinha: linhaAtual, novaColuna: colunaAtual - 1, chegou: false
        }
      } else {
        this.maze[linhaAtual][colunaAtual] = Cell.ROBO

        //robo for para a parede mantem na mesma posicao
        return { recompensa: -10, novaLinha: linhaAtual, novaColuna: colunaAtual, chegou: false }
      }
    }
    //resetra por que caiu
    const resetar = this.reset()
    return { recompensa: -10, novaLinha: resetar.linha, novaColuna: resetar.coluna, chegou: false }
  }

  pegarposicaoRobo(): { linha: number, coluna: number } {
    for (let i = 0; i < this.maze.length; i++) {
      for (let j = 0; j < this.maze.length; j++) {
        if (this.maze[i][j] === Cell.ROBO)
          return { linha: i, coluna: j }
      }
    }
  }

  step(action: number) {
    const posicaoRobo = this.pegarposicaoRobo()

    if (action === 0) {
      this.IrParaCima(posicaoRobo.linha, posicaoRobo.coluna)
    } else if (action === 1) {
      this.irParaBaixo(posicaoRobo.linha, posicaoRobo.coluna)
    } else if (action === 2) {
      this.irParaDireita(posicaoRobo.linha, posicaoRobo.coluna)
    } else if (action === 3) {
      this.irParaEsquerda(posicaoRobo.linha, posicaoRobo.coluna)
    }
  }

}
