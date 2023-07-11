import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-playvoice',
  templateUrl: './playvoice.component.html',
  styleUrls: ['./playvoice.component.css']
})
export class PlayvoiceComponent {

  constructor(private http: HttpClient) {}
  playAudio() {
    const url = 'http://localhost:3000/api/audio';

    this.http.get(url, { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'audio/wav' }) }).subscribe(response => {
      const audioData = response;
      const audioBlob = new Blob([audioData], { type: 'audio/wav' });
      const audioURL = URL.createObjectURL(audioBlob);

      const audio = new Audio();
      audio.src = audioURL;
      audio.play();
    });
  }
}
