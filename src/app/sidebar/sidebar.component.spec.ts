<div class="sidebar">
  <div class="player-list">
    <div class="player-box"
         *ngFor="let player of players"
         [class.correct]="player.correct === true"
         [class.incorrect]="player.correct === false">

      <div class="player-info">
        <!-- Top row: Name, Bet box, Answer box -->
        <div class="player-top-row">
          <div class="player-name">{{ player.name }}</div>
          <div class="player-bet-box">
            <!-- If player.stake is defined, show it; else empty -->
            <span *ngIf="player.stake !== undefined">{{ player.stake }}%</span>
          </div>
          <div class="player-answer-box">
            <!-- If player.answer is defined, show it; else empty -->
            <span *ngIf="player.answer">{{ player.answer }}</span>
          </div>
        </div>

        <!-- Bottom row: Score oval below the name, aligned right -->
        <div class="player-bottom-row">
          <div class="player-score-oval">
            <span>{{ player.score }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
