import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MediaService {
  constructor(private http: HttpClient) { }

  postFolders() {
    return this.http.get("http://localhost:4201/");
  }
}
