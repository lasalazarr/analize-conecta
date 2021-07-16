import { AfterContentInit, Component, ContentChildren, ElementRef, HostBinding, QueryList, Renderer2, ViewEncapsulation, NgZone } from '@angular/core';
import { FuseWidgetToggleDirective } from './widget-toggle.directive';
import _ from 'lodash';

@Component({
  selector: 'fuse-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FuseWidgetComponent implements AfterContentInit {
  @HostBinding('class.flipped') flipped = false;
  @ContentChildren(FuseWidgetToggleDirective, { descendants: true }) toggleButtons: QueryList<FuseWidgetToggleDirective>;

  constructor(private el: ElementRef, private renderer: Renderer2, private ngZone: NgZone) {
  }

  ngAfterContentInit() {
    setTimeout(() => {

      this.toggleButtons.forEach(flipButton => {
        this.renderer.listen(flipButton.el.nativeElement, 'click', (event) => {
          this.ngZone.run(() => {
            event.preventDefault();
            event.stopPropagation();
            this.toggle(event);
          })

        });
      });
    });
  }

  toggle(event) {
    this.flipped = !this.flipped;
    if (!_.isNil(event.target)) {
      setTimeout(() => {
        event.target.offsetParent.offsetParent.click()
      }, 200);
    }

  }

}
