export class Textrandom {
  private isRunning: boolean = false;
  private stepInterval: number = 500;
  private lastStep: number;
  private nextStep: number;
  private raf?: number = 0;

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

  /**
   * Stop the loop
   */
  public stop(): void {
    window.cancelAnimationFrame(this.raf);
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

}

(<any>window).Textrandom = Textrandom;

