import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public mediaRuntime: number = 0;
  public mediaCurrentTime: string = "0:00";
  public mediaDuration: string = "0:00";
  public mediaRun: boolean = false;

  public volume: number = 100;
  public latestVolume: number = 100;
  public mute: boolean = false;
  public loop: boolean = false;
  public canReplay: boolean = false;
  public canForward: boolean = false;

  @ViewChild('player')
  mplayer: ElementRef;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.mediaDuration = this.calcMediaTime(this.mplayer.nativeElement.duration);
      this.mediaCurrentTime = this.calcMediaTime(this.mplayer.nativeElement.currentTime);
      this.mediaRuntime = 100 / this.mplayer.nativeElement.duration * this.mplayer.nativeElement.currentTime;

      if (this.mediaDuration === this.mediaCurrentTime && !this.mplayer.nativeElement.loop) {
        this.mediaRun = false;
      }

      if (this.mplayer.nativeElement.currentTime < 10) {
        this.canReplay = true;
      } else {
        this.canReplay = false;
      }

      if (this.mplayer.nativeElement.currentTime >= this.mplayer.nativeElement.duration - 10) {
        this.canForward = true;
      } else {
        this.canForward = false;
      }

    }, 100);
  }

  calcMediaTime(time: string) {
    var sec_num = parseInt(time, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (seconds < 10) {
      return minutes + ':0' + seconds;
    } else {
      return minutes + ':' + seconds;
    }
  }

  play() {
    this.mediaRun = true;
    this.mplayer.nativeElement.play();
  }

  pause() {
    this.mediaRun = false;
    this.mplayer.nativeElement.pause();
  }

  muteMedia() {
    this.volume = 0;
    this.mute = true;
    this.mplayer.nativeElement.muted = true;
  }

  unmuteMedia() {
    this.volume = this.latestVolume;
    this.mute = false;
    this.mplayer.nativeElement.muted = false;
  }

  changeVolume() {
    this.latestVolume = this.volume;
    this.mplayer.nativeElement.volume = this.volume / 100;
  }

  mediaLoop() {
    this.loop = true;
    this.mplayer.nativeElement.loop = true;
  }

  mediaUnloop() {
    this.loop = false;
    this.mplayer.nativeElement.loop = false;
  }

  changePlayTime() {
    this.mplayer.nativeElement.currentTime = this.mplayer.nativeElement.duration / 100 * this.mediaRuntime;
  }

  replay() {
    this.mplayer.nativeElement.currentTime = this.mplayer.nativeElement.currentTime - 10;
  }

  forward() {
    this.mplayer.nativeElement.currentTime = this.mplayer.nativeElement.currentTime + 10;
  }

}
