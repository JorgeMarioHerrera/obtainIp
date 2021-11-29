import { OAuth } from './OAuth';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import publicIp from 'public-ip';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  }),
  observe: 'response' as 'body'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'obtainIp';

  ip: string;




  constructor( private http: HttpClient) {
    // this.getIPAddress();
  }

 oAuth: OAuth =  {
    "ipClient": "",
    "deviceBrowser": "Mozilla Firefox",
    "userAgent": "agent1",
    "deviceOS": "Mac OS X",
    "device": "Macbook Pro 13 inch",
    "code": "12345"
}


  async ngOnInit(): Promise<void> {
    console.log(await publicIp.v4());
    this.ip = await publicIp.v4();
    this.oAuth.ipClient = this.ip;
    this.http.post('http://localhost:8080/asociacion-tarjeta-debito/validaciones-api/changeAuthCode', this.oAuth, httpOptions).subscribe(res => {
      console.log('respuesta del servicio: '+res);
    })
  }

  getIPAddress() {
    /*
    this.http.get("https://api.ipify.org/?format=json", {headers: // https://geolocation-db.com/json/  https://api.ipify.org/?format=json
    {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'}}).subscribe((res:any)=>{
     // console.log(res);

    }, error => {
      // console.log('chúpelo');
    });

    */
  }

  changeOAuthCode(userIp) {
   const oAuth: OAuth =  {
      "ipClient": this.ip,
      "deviceBrowser": "Mozilla Firefox",
      "userAgent": "agent1",
      "deviceOS": "Mac OS X",
      "device": "Macbook Pro 13 inch",
      "code": "12345"
  }
    this.http.post('http://localhost:8080/asociacion-tarjeta-debito/validacionesApi/changeAuthCode', oAuth, httpOptions).subscribe(
      (data: any) => {
        console.log(data);
      }
      , (error: HttpErrorResponse) => {
      console.log("eorror");
      }
    );
  }
}
