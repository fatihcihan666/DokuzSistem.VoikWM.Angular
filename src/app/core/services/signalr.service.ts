import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private logHubConnection!: HubConnection;
    private distHubConnection!: HubConnection;
    logInserted: EventEmitter<any> = new EventEmitter();
    distributorStatus: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpService, private hubConnectionBuilder: HubConnectionBuilder, private jwtService: JwtService) {
    }

    connectLogHub() {
        const token = this.jwtService.getToken();
        if (token && !this.logHubConnection) {
            this.logHubConnection = this.hubConnectionBuilder
                .withUrl(`${environment.apiEndPoint + '/logHub'}`, { accessTokenFactory: () => token })
                .build();

            this.logHubConnection.on('logHub', (log) => {
                if (!log) {
                    return;
                }
                
                this.logInserted.next(log);
            });

            this.logHubConnection.start().then(() => {
                this.logHubConnection.invoke('Connected').then(() => environment.isHubConnected = true).catch()
            }).catch(function (err) {
                return console.error(err.toString());
            });

            this.logHubConnection.onclose(() => {
                this.logHubConnection.invoke('Disconnect').catch(err => {
                    environment.isHubConnected = false;
                    let intervalId = setInterval(() => {
                        this.logHubConnection.start().then(() => {
                            this.logHubConnection.invoke('Connected').then(() => {
                                clearInterval(intervalId);
                                environment.isHubConnected = true;
                            })
                        })
                    }, 10000, this);
                })
            })
        }
    }

    connectDistributorStatusHub() {
        const token = this.jwtService.getToken();
        if (token && !this.distHubConnection) {            
            this.distHubConnection = this.hubConnectionBuilder
                .withUrl(`${environment.apiEndPoint + '/distHub'}`, { accessTokenFactory: () => token })
                .build();

            this.distHubConnection.on('distHub', (log) => {
                if (!log) {
                    return;
                }
                
                this.distributorStatus.next(log);
            });

            this.distHubConnection.start().then(() => {
                this.distHubConnection.invoke('Connected').then(() => environment.isHubConnected = true).catch()
            }).catch(function (err) {
                return console.error(err.toString());
            });

            this.distHubConnection.onclose(() => {
                this.distHubConnection.invoke('Disconnect').catch(err => {
                    environment.isHubConnected = false;
                    let intervalId = setInterval(() => {
                        this.distHubConnection.start().then(() => {
                            this.distHubConnection.invoke('Connected').then(() => {
                                clearInterval(intervalId);
                                environment.isHubConnected = true;
                            })
                        })
                    }, 10000, this);
                })
            })
        }
    }
}
