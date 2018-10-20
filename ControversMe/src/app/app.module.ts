import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions, ConnectionBackend, HttpModule } from '@angular/http';
import {SocketIoModule, SocketIoConfig} from 'ng-socket-io';
const config: SocketIoConfig = {url:'http://localhost:8080',options: {}};
import { Main } from '../pages/mainpage/main';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomePage1 } from '../pages/home/home.1';
import { FirstPage } from '../pages/first/first';
import { MainRedirect } from '../pages/redirect/main';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomePage1,
    FirstPage,
    Main,
    MainRedirect
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false }),
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomePage1,
    FirstPage,
    Main,
    MainRedirect
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastController,
    HttpModule,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
