import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialog } from './components/playlist-dialog/playlist-dialog.component';
import { MediaService } from './app.service';

export interface Playlists {
  title: string;
  media?: Media[];
}

export interface Media {
  src: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public playlists: Playlists[] = [];
  public media: Media[] = [];

  constructor(
    public dialog: MatDialog,
    public API: MediaService,
  ) { }

  ngOnInit() {
    this.API.postFolders().subscribe(res => {
      // for (let i = 0; i < res.length; i++) {
      //   this.media.push({ src: res[i] });
      // }
    });
  }

  newPlaylist() {
    const dialogRef = this.dialog.open(PlaylistDialog, {
      data: { title: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.playlists.push({
        title: result.title,
      })
    });
  }
}
