import { Injectable } from "@nestjs/common";


@Injectable()
export class AgenteService {
    private Qtable: Map<number, number[]> = new Map()

    private CriandoAQtable(): number[] {
        //somente cria a Qtable e comeca o primeiro estado como zero
        this.Qtable.set(0, [0, 0, 0, 0])

        return [0, 0, 0, 0]
    }

    private getQValues(estado: number): number[] {
        const valores = this.Qtable.get(estado)

        if (!valores) return this.CriandoAQtable()

        return valores

    }
}

