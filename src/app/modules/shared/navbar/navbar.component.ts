import { Component } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  style1:string='pl-2 pr-2 h-8 text-sm text-[#303771] hover:text-white hover:bg-[#303771] duration-300 md:text-base lg:text-lg xl:text-xl'
  style2:string='rounded pl-4 pr-4 h-10 text-sm bg-green-900 text-white hover:text-green-900 hover:bg-white hover:border duration-300 md:text-base lg:text-lg xl:text-xl'
  style3:string='shadow-xl w-full pl-2 pr-2 h-8 text-sm text-[#303771] hover:text-white hover:bg-[#303771] duration-300'
  style4:string='w-full rounded pl-2 pr-2 h-6 text-sm bg-green-900 text-white hover:text-green-900 hover:bg-white hover:border duration-300 '
  menu:string='hidden'
  menuClicked(){
    if(this.menu=='hidden'){
      this.menu='block'
    }
    else{
      this.menu='hidden'
    }
  }
  logined:boolean=false
}
