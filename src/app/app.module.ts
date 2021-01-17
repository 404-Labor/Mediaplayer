import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialComponentsModule } from './material-components.module';
import { environment } from '../environments/environment';
import { PlayerComponent } from './components/player/player.component';
import { PlaylistDialog } from './components/playlist-dialog/playlist-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MediaService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlaylistDialog,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'playwithme' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MaterialComponentsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    MediaService,
  ],
  entryComponents: [
    PlaylistDialog,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
