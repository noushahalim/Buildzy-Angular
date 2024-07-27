import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shared-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges{
  @Input() rating: number = 0;
  fullStars: any[] = [];
  emptyStars: any[] = [];
  hasHalfStar: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating']) {
      this.updateStars();
    }
  }

  private updateStars() {
    this.fullStars = Array(Math.floor(this.rating)).fill(0);
    this.hasHalfStar = (this.rating % 1) !== 0;
    this.emptyStars = Array(5 - this.fullStars.length - (this.hasHalfStar ? 1 : 0)).fill(0);
  }
}
