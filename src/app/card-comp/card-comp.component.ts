import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-comp',
  templateUrl: './card-comp.component.html',
  styleUrls: ['./card-comp.component.css']
})
export class CardCompComponent {
  @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef>;
  tinderCardsArray: Array<ElementRef>;
  @Output() choiceMade = new EventEmitter();

  moveOutWidth: number;
  shiftRequired: boolean;
  transitionInProgress: boolean;
  heartVisible: boolean;
  crossVisible: boolean;
  cards = [
    {
      img: 'https://placeimg.com/300/300/people',
      title: 'John Deo',
      description: '27yrs, 5"6, Yadav, 6-7 Lakhs, Chennai, Tamil Nadu.',
    },
    {
      img: 'https://placeimg.com/300/300/animals',
      title: 'Ricky Hunt',
      description: '27yrs, 5"6, Yadav, 6-7 Lakhs, Chennai, Tamil Nadu.',
    },
    {
      img: 'https://placeimg.com/300/300/nature',
      title: 'Anne Clarc',
      description: '27yrs, 5"6, Yadav, 6-7 Lakhs, Chennai, Tamil Nadu.',
    },
    {
      img: 'https://placeimg.com/300/300/tech',
      title: 'Carles Puyol',
      description: '27yrs, 5"6, Yadav, 6-7 Lakhs, Chennai, Tamil Nadu.',
    },
    {
      img: 'https://placeimg.com/300/300/arch',
      title: 'Kristaps',
      description: '27yrs, 5"6, Yadav, 6-7 Lakhs, Chennai, Tamil Nadu.',
    },
    {
      img: 'https://placeimg.com/300/300/people',
      title: 'Jessie Clarcson',
      description: '27yrs, 5"6, Yadav, 6-7 Lakhs, Chennai, Tamil Nadu.',
    },
    {
      img: 'https://placeimg.com/300/300/animals',
      title: 'Natali Trump',
      description: '27yrs, 5"6, Yadav, 6-7 Lakhs, Chennai, Tamil Nadu.',
    },
    {
      img: 'https://placeimg.com/300/300/nature',
      title: 'Brad Simmons',
      description: '27yrs, 5"6, Yadav, 6-7 Lakhs, Chennai, Tamil Nadu.',
    }
  ];

  constructor(private renderer: Renderer2, private modalService: NgbModal) { }

  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.cards.length) return false;
    if (heart) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)'
      );
      this.toggleChoiceIndicator(false, true);
      this.emitChoice(heart, this.cards[0]);
    } else {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)'
      );
      this.toggleChoiceIndicator(true, false);
      this.emitChoice(heart, this.cards[0]);
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;
  }

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  }

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.cards.shift();
    }
  }

  emitChoice(heart, card) {
    this.choiceMade.emit({
      choice: heart,
      payload: card,
    });
  }

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => { });
  }

  openProfile(profile) {
    this.modalService.open(profile, { size: 'sm', centered: true }).result.then((result) => {
    }, (reason) => { });
  }
}
