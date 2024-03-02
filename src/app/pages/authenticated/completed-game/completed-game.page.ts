import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GraphComponent } from 'src/app/componenents/graph/graph.component';
import { RankedPlayer, UserResponse } from 'src/app/model/ranked-player.model';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-completed-game',
  templateUrl: './completed-game.page.html',
  styleUrls: ['./completed-game.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, GraphComponent]
})
export class CompletedGamePage implements OnInit {
  players: RankedPlayer[];

  constructor(private sessionService: SessionService) { 
    this.players = [];
  }

  ngOnInit() {
  }

  rankPlayers() {
    this.sessionService.getAllUserResponses().subscribe(data => {
      const groupedResponses = this.groupUserResponsesByUserID(data);
      const userScores = this.calculateScore(groupedResponses);
      this.createRankedPlayers(userScores);
    })
  }

  groupUserResponsesByUserID(responses: UserResponse[]): { [userID: string]: UserResponse[] } {
    return responses.reduce((acc: { [userID: string]: UserResponse[] }, response: UserResponse) => {
      if (!acc[response.userID]) {
        acc[response.userID] = [];
      }
      acc[response.userID].push(response);
      return acc;
    }, {});
  }

  calculateScore(groupedResponses: { [userID: string]: UserResponse[] }): { [userID: string]: number } {
    const scores: { [userID: string]: number } = {};
    for (const userID in groupedResponses) {
      scores[userID] = 0;
      groupedResponses[userID].forEach(response => {
        if (response.isCorrect) {
          scores[userID] += 3;
        }
      });
    }
    return scores;
  }

  createRankedPlayers(scores: { [userID: string]: number }){
    const players = Object.keys(scores).map(userId => ({ userId, points: scores[userId] }));

    players.sort((a, b) => b.points! - a.points!);
    let rankedPlayers: RankedPlayer[];
    this.sessionService.getSessionUsersByUids(Object.keys(scores)).subscribe(users => {

       this.players = players.map((player, index) => {
        let user = users.find(u => u.uid === player.userId);
        return {
          position: index + 1,
          points: player.points,
          name: user?.name + ' ' + user?.surname,
          photoUrl: user?.profileImageUrl
        }
    });
    });
}

}
