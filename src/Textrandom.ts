interface Options {
  selector: string;
  alphabet: string[];
  wordTime: number; // Time to show the word in ms
  letterRefreshTime: number; // Time to change the letter in ms
  words: string[];
}

export class Textrandom {
  private container: HTMLElement;
  private isRunning: boolean = false;
  private stepInterval: number = 500;
  private lastStep: number;
  private nextStep: number;
  private raf?: number = 0;
  private config: Options;
  private spans: HTMLSpanElement[] = [];
  private current: number = 0; // Current word index
  private last: number = -1;

  private static createSpan(attributes?: {[key:string]: any}): HTMLSpanElement {
    let span = document.createElement('span');

    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        span.setAttribute(key, attributes[key]);
      }
    }

    return span;
  }

  constructor(config: Options) {
    const defaults: Options = {
      selector: 'js-textrandom',
      alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'i', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'i', 'u', 'v', 'w', 'x', 'y', 'z', '~', '&',
        '|', '^', 'ç', '@', ']', '[', '{', '}', 'ù', '*', 'µ', '¤', '$', '£', '€', '°', ')',
        '(', '+', '-', '/', '<', '>', '²', '`', 'é', 'è', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', '0'],
      wordTime: 3000,
      letterRefreshTime: 16.5,
      words: ['Hello', 'world']
    };
    this.config = Object.assign({}, defaults, config);
    this.container = document.getElementById(this.config.selector);

    // Create the span inside container before start.
    this.addSpan();
  }

  /**
   * Start the loop (ô_Ô)
   */
  public start(): void {
    this.lastStep = performance.now();
    this.nextStep = this.lastStep + this.stepInterval;
    this.loop(performance.now());

    setTimeout(() => {
      this.stop();
    }, 1000);
  }

  /**
   * Stop the loop
   */
  public stop(): void {
    window.cancelAnimationFrame(this.raf);
  }

  /**
   * Main loop
   * @param t {number}
   */
  private loop(t: number) {
    this.raf = window.requestAnimationFrame(this.loop.bind(this));

    if (t > this.nextStep) {
      this.nextStep = this.lastStep + this.stepInterval;
      this.update(t);
    }

    this.lastStep = performance.now();
  }

  /**
   * Update each stepInterval defined.
   * @param t {number}
   */
  private update(t: number) {
    console.log('Update', t);
  }

  private addSpan() {
    const spans = this.container.querySelectorAll('span');
    const currentWordLength: number = this.config.words[this.current].length;
    const spansLength: number = spans !== null ? spans.length : 0;
    const delta: number = currentWordLength - spansLength;

    if (delta < 0) {
      // Remove n spans
      const count = Math.abs(delta - (spansLength -1));
      this.spans.splice(count);
    } else {
      // Add n spans
      for (let i = 0; i < delta; i++) {
        this.container.appendChild(Textrandom.createSpan());
      }
    }
  }

  private next() {
    this.current++;
    if (this.last < this.current) {
    } else {
      this.current = this.config.words.length;
    }
  }

}

(<any>window).Textrandom = Textrandom;

