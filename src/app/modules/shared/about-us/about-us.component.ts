import { Component } from '@angular/core';

@Component({
  selector: 'shared-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  toggleReadMore(){
    const moreContent = document.getElementById('moreContent');
    const readMoreBtn = document.getElementById('readMoreBtn');
    if (moreContent!.classList.contains('hidden')) {
      moreContent!.classList.remove('hidden');
      readMoreBtn!.textContent = 'READ LESS';
    } else {
      moreContent!.classList.add('hidden');
      readMoreBtn!.textContent = 'READ MORE';
    }
  }
}
