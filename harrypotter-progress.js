import { beforeNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import template from './harrypotter-progress-template.js';
class HarryPotterProgress extends PolymerElement {
  static get template() {
    return template;
  }

  static get is() {
    return 'harrypotter-progress';
  }

  static get properties() {
    return {
      // If true, loader is active. If false, loader stays still.
      active: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      // If true, hide the loader
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: "_disabledChange"
      },
      /* Set the default size to be 1X, if
      set to 0.5 then it will be 0.5x the default size, which is 140 x 120 */
      size: {
        type: Number,
        value: 1
      },
      // The speed of the animation TODO: Write a default speed
      speed: {
        type: Number,
        value: 1
      }
    }
  }

  static get observers() {
    return [
      "_inputChanged(size, active, speed)"
    ];
  }

  connectedCallback () {
    super.connectedCallback();
    beforeNextRender(this, () => {
      this._addLoaderComponent("leftCircle", "circle");
      this._addLoaderComponent("rightCircle", "circle");
      this._addLoaderComponent("bridge", "bridge");
      this._addLoaderComponent("lightning", "lightning");
    });
  }

  // Observer method for disabled property
  _disabledChange(disabled) {
    if (!disabled) {
      this.removeAttribute('aria-hidden');
    } else {
      setTimeout(function() {
        this.setAttribute('aria-hidden', 'true');
      }.bind(this), 500);
    }
  }

  _inputChanged(size, active, speed) {
    // Get svg node from shadow DOM
    var svg = this.$.svg;

    // Set svg height and width
    svg.style.width = 140*size + "px";
    svg.style.height = 120*size + "px";
    // Set svg viewBox
    svg.setAttributeNS(null, "viewBox", "197 143 140 120");
    // Log to console
    console.log(size, active, speed);

    // Set animation for the loader
    if (active) {
      this.$.leftCircle.classList.add('left-cirlce-animation');
      this.$.rightCircle.classList.add('right-circle-animation');
      this.$.bridge.classList.add('bridge-animation');
      this.$.lightning.classList.add('lightning-animation');
    } else {
      this.$.leftCircle.classList.remove('left-cirlce-animation');
      this.$.rightCircle.classList.remove('right-circle-animation');
      this.$.bridge.classList.remove('bridge-animation');
      this.$.lightning.classList.remove('lightning-animation');
    }
  }

  // A function to create and attach <use> to render the loader
  _addLoaderComponent(href, className) {
    var xmlns = "http://www.w3.org/2000/svg";
    var xlinkns = "http://www.w3.org/1999/xlink";
    var use = document.createElementNS(xmlns, "use");
    use.setAttributeNS(null, "class", className);
    use.setAttributeNS(xlinkns, "xlink:href", "#" + href);
    this.$.useGroup.appendChild(use);
  }
}
// Register custom element definition using standard platform API
customElements.define(HarryPotterProgress.is, HarryPotterProgress);
