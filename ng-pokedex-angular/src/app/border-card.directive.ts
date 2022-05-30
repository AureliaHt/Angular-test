import { Directive, ElementRef, HostListener} from '@angular/core';
// import HostListener  => pattern dir Decorator => sert à attacher dynamiquement des responsabilités supplémentaires à un objet 

@Directive({
  selector: '[pokemonBorderCard]' // préfixe "pokemon" en remplacement du préfixe "app" pour mieux définir l'élément concerné
})
export class BorderCardDirective {

  private initialColor: string = '#ffffff';
  private defaultColor: string = '#CBD081';
  private defaultHeight: number = 220;

// élément nommé cardElement dont le type est ElementRef (import d'Angular). nativeElement =>car ElementRef est le container d'un élément natif au sein d'une view
// ElementRef => référence vers un élément du DOM sur lequel on veut appliquer une directive
// paramètre "private" => type TypeScript -> private, protected et public = propriété pour modifier les accès au sien d'une même classe
  constructor(private cardElement: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
   }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  private setHeight( height: number ) {
    this.cardElement.nativeElement.style.height = height + 'px';
  }

  private setBorder( color: string ) {
    let border = 'solid 3px ' + color;
    this.cardElement.nativeElement.style.border = border;
  }
}
