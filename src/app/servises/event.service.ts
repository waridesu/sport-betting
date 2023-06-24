import { Injectable } from '@angular/core';
import { EventType } from "../interface/event-type";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _data: EventType[] = [
    { id: 1, name: 'Manchester United vs Chelsea', date: '22.06.2023', teams: ['Manchester United', 'Chelsea'], selectedBet: '' },
    { id: 2, name: 'Barcelona vs Real Madrid', date: '23.06.2023', teams: ['Barcelona', 'Real Madrid'], selectedBet: '' },
    { id: 3, name: 'Munich vs Borussia Dortmund', date: '24.06.2023', teams: ['Bayern Munich', 'Borussia Dortmund'], selectedBet: '' },
    { id: 4, name: 'Roma vs Olympique Lyonnais', date: '25.06.2023', teams: ['Paris Saint-Germain', 'Olympique Lyonnais'], selectedBet: '' },
    { id: 5, name: 'Juventus vs Inter Milan', date: '26.06.2023', teams: ['Juventus', 'Inter Milan'], selectedBet: '' },
    { id: 6, name: 'Liverpool vs Manchester City', date: '27.06.2023', teams: ['Liverpool', 'Manchester City'], selectedBet: '' },
    { id: 7, name: 'AC Milan vs Roma', date: '28.06.2023', teams: ['AC Milan', 'Roma'], selectedBet: '' },
    { id: 8, name: 'Atletico Madrid vs Valencia', date: '29.06.2023', teams: ['Atletico Madrid', 'Valencia'], selectedBet: '' },
    { id: 9, name: 'Arsenal vs Tottenham Hotspur', date: '30.06.2023', teams: ['Arsenal', 'Tottenham Hotspur'], selectedBet: '' },
    { id: 10, name: 'Boca Juniors vs River Plate', date: '01.07.2023', teams: ['Boca Juniors', 'River Plate'] , selectedBet: ''},
  ];
  get data() {
    return this._data;
  }
  updateItem(id: number, newSelectedBet: string) {
    const item = this._data.find(item => item.id === id);
    if (item) {
      item.selectedBet = newSelectedBet;
    }
    console.log(this._data);
  }
}
