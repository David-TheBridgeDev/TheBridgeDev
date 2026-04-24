import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wheelchair-rules',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  template: `
    <div class="rules-dialog-container">
      <div class="dialog-header">
        <h2 class="title">NORMAS DE COMPETICIÓN BSR</h2>
        <button class="close-btn" (click)="close()">X</button>
      </div>
      <div class="content">
        <div class="intro-alert">
          <p>El Baloncesto en Silla de Ruedas (BSR) es uno de los deportes más dinámicos y técnicos del mundo paralímpico. ¡Conoce las reglas que definen el juego!</p>
        </div>

        <section class="rules-section">
          <h3>CLASIFICACIONES FUNCIONALES</h3>
          <p>
            Para garantizar la igualdad, cada jugador recibe una puntuación basada en su <strong>movilidad funcional</strong>. No se evalúa la discapacidad, sino la capacidad para ejecutar movimientos clave:
          </p>

          <div class="grid-table">
            <div class="header">CLASE</div>
            <div class="header">PERFIL TÉCNICO</div>

            <div class="cell highlight">1.0</div>
            <div class="cell">
              <strong>Estabilidad Base:</strong> Sin movimiento de tronco activo. El equilibrio se mantiene mediante el uso de los brazos o el respaldo.
            </div>

            <div class="cell highlight">2.0</div>
            <div class="cell">
              <strong>Rotación Parcial:</strong> Movimiento activo del tronco superior. Capacidad de rotación pero con limitaciones en el plano hacia adelante.
            </div>

            <div class="cell highlight">3.0</div>
            <div class="cell">
              <strong>Movimiento Frontal:</strong> Control total del tronco hacia adelante y rotación completa. Gran capacidad de reacción.
            </div>

            <div class="cell highlight">4.0 - 4.5</div>
            <div class="cell">
              <strong>Máxima Movilidad:</strong> Movimiento total del tronco en todos los planos y excelente estabilidad lateral para rebotes.
            </div>
          </div>
        </section>

        <section class="rules-section">
          <h3>LÍMITE DE PUNTOS (REGLA DE LOS 14.5)</h3>
          <div class="info-card">
            <p>
              El equilibrio competitivo se mantiene mediante una suma máxima de puntos en pista. Los 5 jugadores activos no pueden exceder un total de <strong>14.5 puntos</strong>.
            </p>
            <div class="strategy-note">
              <strong>Estrategia:</strong> Los entrenadores deben combinar jugadores de alta y baja puntuación ("line-ups") para maximizar el talento en pista.
            </div>
          </div>
        </section>

        <section class="rules-section">
          <h3><span class="icon">🏀</span> REGLAS DE ORO</h3>
          <ul class="simple-list">
            <li><strong>Dribling:</strong> Se permiten dos impulsos a las ruedas por cada bote o recepción del balón.</li>
            <li><strong>Faltas:</strong> La silla se considera parte del cuerpo del jugador. Cualquier choque ilegal es falta personal.</li>
            <li><strong>Fuera:</strong> Si cualquier parte de la silla toca la línea de banda, el jugador está fuera.</li>
          </ul>
        </section>
      </div>
    </div>
  `,
  styles: `
    @use "../../../../styles/variables" as vars;

    .rules-dialog-container {
      padding: 0;
      background-color: #fff;
      border: 6px solid #000;
      box-shadow: 12px 12px 0px #000;
      max-height: 85vh;
      overflow-y: auto;
      font-family: vars.$font-family-sans;
      color: #000;
    }

    .dialog-header {
      background-color: vars.$main-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 6px solid #000;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .title {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 900;
      font-family: vars.$font-family-mono;
      text-transform: uppercase;
      letter-spacing: -1px;
    }

    .close-btn {
      background: #000;
      color: #fff;
      border: 4px solid #000;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-weight: 900;
      font-family: vars.$font-family-mono;
      transition: all 0.1s;
      &:hover {
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px 0px #000;
        background: vars.$main-color;
        color: #000;
      }
      &:active {
        transform: translate(0, 0);
        box-shadow: none;
      }
    }

    .content {
      padding: 2rem;
    }

    .intro-alert {
      background: #fff;
      border: 4px solid #000;
      padding: 1.5rem;
      margin-bottom: 2.5rem;
      display: flex;
      gap: 1.5rem;
      align-items: center;
      box-shadow: 8px 8px 0px #000;
      
      p { 
        margin: 0; 
        font-size: 1.1rem; 
        line-height: 1.2;
        font-weight: 600;
      }
      .icon { font-size: 2.5rem; }
    }

    .rules-section {
      margin-bottom: 2.5rem;
      
      h3 {
        display: inline-block;
        background: #000;
        color: #fff;
        padding: 0.4rem 0.8rem;
        font-size: 1.3rem;
        font-weight: 900;
        margin-bottom: 1.2rem;
        text-transform: uppercase;
        transform: rotate(-0.5deg);
      }

      p {
        font-size: 1.05rem;
        line-height: 1.25;
        margin-bottom: 1.2rem;
      }
    }

    .grid-table {
      display: grid;
      grid-template-columns: 100px 1fr;
      border: 4px solid #000;
      margin: 1.2rem 0;
      background: #000;
      gap: 4px;
      box-shadow: 8px 8px 0px vars.$main-color;
    }

    .header {
      background-color: #000;
      color: #fff;
      padding: 0.6rem;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 1px;
    }

    .cell {
      background: #fff;
      padding: 0.8rem;
      display: flex;
      align-items: center;
      line-height: 1.2;
    }

    .cell.highlight {
      font-weight: 900;
      font-size: 1.5rem;
      background-color: vars.$main-color;
      justify-content: center;
      font-family: vars.$font-family-mono;
    }

    .info-card {
      background: #fff;
      color: #000;
      padding: 1.2rem;
      border: 4px solid #000;
      box-shadow: 8px 8px 0px #000;
      
      p {
        margin: 0;
        font-weight: 700;
        font-size: 1.2rem;
        line-height: 1.2;
      }

      .strategy-note {
        margin-top: 0.8rem;
        font-size: 0.95rem;
        color: #444;
        border-top: 2px solid #000;
        padding-top: 0.8rem;
        font-style: italic;
        line-height: 1.2;
      }
    }

    .simple-list {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 0.8rem;
      
      li {
        padding: 0.8rem;
        border: 3px solid #000;
        background: #fff;
        font-weight: 600;
        display: flex;
        align-items: center;
        line-height: 1.2;
        
        &::before {
          content: "→";
          margin-right: 1rem;
          font-weight: 900;
          font-size: 1.2rem;
        }

        strong {
          text-transform: uppercase;
          margin-right: 0.5rem;
          background: vars.$main-color;
          padding: 0 4px;
        }
      }
    }

    @media (max-width: 480px) {
      .title { font-size: 1.3rem; }
      .grid-table {
        grid-template-columns: 70px 1fr;
        font-size: 0.85rem;
      }
      .cell.highlight { font-size: 1.2rem; }
      .rules-section h3 { font-size: 1.1rem; }
    }
  `,
})
export class RulesComponent {
  constructor(private dialogRef: MatDialogRef<RulesComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
