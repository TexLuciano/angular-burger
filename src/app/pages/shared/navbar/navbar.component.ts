import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit{


  ngOnInit(): void {

  }

  constructor(private authService:AuthService){

  }

  logOut(){
    this.authService.logOut()
   
  }

}
