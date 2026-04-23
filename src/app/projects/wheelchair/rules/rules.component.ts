import { Component } from '@angular/core';

@Component({
  selector: 'app-wheelchair-rules',
  standalone: true,
  imports: [],
  template: `
    <div class="rules-container">
      <h2 class="title">NORMAS DE COMPETICIÓN BSR</h2>
      <div class="content">
        <h3>CLASIFICACIONES FUNCIONALES</h3>
        <p>
          La clasificación funcional se basa en la capacidad del jugador para realizar 
          movimientos específicos de baloncesto: empujar, pivotar, driblear, tirar y rebotear.
        </p>

        <div class="grid-table">
          <div class="header">Puntos</div>
          <div class="header">Descripción</div>

          <div class="cell">1.0</div>
          <div class="cell">
            Sin movimiento de tronco activo. Limitaciones significativas de equilibrio.
          </div>

          <div class="cell">2.0</div>
          <div class="cell">
            Movimiento activo del tronco superior pero sin control del tronco inferior.
          </div>

          <div class="cell">3.0</div>
          <div class="cell">Movimiento activo del tronco inferior y buen equilibrio.</div>

          <div class="cell">4.0 / 4.5</div>
          <div class="cell">
            Movimiento total del tronco y excelente equilibrio en todas las direcciones.
          </div>
        </div>

        <h3>LÍMITE DE PUNTOS EN PISTA</h3>
        <p>
          El total de puntos de los cinco jugadores en pista no puede exceder los 14.5 
          puntos en la mayoría de las competiciones oficiales.
        </p>
      </div>
    </div>
  `,
  styles: `
    @use "../../../../styles/variables" as vars;
    .rules-container {
      padding: 1rem;
    }
    .title {
      border-bottom: 2px solid vars.$black;
      padding-bottom: 0.5rem;
    }
    .grid-table {
      display: grid;
      grid-template-columns: 100px 1fr;
      border: 2px solid vars.$black;
      margin: 1rem 0;
    }
    .header {
      background-color: vars.$black;
      color: vars.$white;
      padding: 0.5rem;
      font-weight: bold;
    }
    .cell {
      padding: 0.5rem;
      border: 1px solid #ccc;
    }
  `,
})
export class RulesComponent {}
