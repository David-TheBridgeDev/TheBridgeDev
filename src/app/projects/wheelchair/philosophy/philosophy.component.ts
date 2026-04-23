import { Component } from '@angular/core';

@Component({
  selector: 'app-wheelchair-philosophy',
  standalone: true,
  imports: [],
  template: `
    <div class="philosophy-container">
      <h2 class="title">"BALONCESTO TOTAL"</h2>
      <div class="content">
        <blockquote>
          "Jugar rápido no significa jugar mal. Nuestro objetivo es enseñar a
          los jugadores a elevar su nivel técnico lo suficiente como para que
          puedan tomar decisiones a un ritmo muy alto."
        </blockquote>

        <h3>EL PROCESO DE DECISIÓN</h3>
        <ul class="process-list">
          <li>
            <strong>OBSERVAR:</strong> Comprender la situación del juego rápidamente.
          </li>
          <li>
            <strong>ANALIZAR:</strong> Reducir el tiempo de análisis mediante el dominio técnico.
          </li>
          <li>
            <strong>RESPONDER:</strong> Ejecutar la respuesta correcta de forma eficaz.
          </li>
          <li><strong>EVALUAR:</strong> Aprender del resultado obtenido.</li>
        </ul>

        <h3>PRINCIPIOS DEL JUEGO RÁPIDO</h3>
        <ul>
          <li>
            El juego rápido no es solo correr; es crear desequilibrio defensivo.
          </li>
          <li>
            Cada decisión debe buscar un tiro de alto porcentaje (zona de confort, ventaja).
          </li>
          <li>La cooperación y el pase son claves para abrir el campo.</li>
        </ul>
      </div>
    </div>
  `,
  styles: `
    @use "../../../../styles/variables" as vars;
    .philosophy-container {
      padding: 1rem;
      font-family: 'Courier New', Courier, monospace;
    }
    .title {
      border-bottom: 2px solid vars.$black;
      padding-bottom: 0.5rem;
    }
    blockquote {
      font-style: italic;
      border-left: 4px solid vars.$black;
      padding-left: 1rem;
      margin: 1.5rem 0;
      background-color: #f0f0f0;
      padding: 1rem;
    }
    .process-list {
      list-style: none;
      padding: 0;
    }
    .process-list li {
      margin-bottom: 0.5rem;
      padding-left: 1rem;
      border-left: 2px solid vars.$black;
    }
  `,
})
export class PhilosophyComponent {}
