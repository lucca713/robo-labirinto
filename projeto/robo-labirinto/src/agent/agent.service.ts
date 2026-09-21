import { Injectable } from "@nestjs/common";


@Injectable()
export class AgenteService {
    private Qtable: Map<number, number[]> = new Map()

    private CriandoAQtable(): number[] {
        //somente cria a Qtable e comeca o primeiro estado como zero
        this.Qtable.set(0, [0, 0, 0, 0])

        return [0, 0, 0, 0]
    }
    private PreencherQtable(estado: number, acao: number, recompensa: number): void {
        const acoesDoEstado = this.Qtable.get(estado);

        acoesDoEstado[acao] = recompensa;

        this.Qtable.set(estado, acoesDoEstado)
    }

    private getQValues(estado: number): number[] {
        const valores = this.Qtable.get(estado)

        if (!valores) return this.CriandoAQtable()

        return valores
    }



}

