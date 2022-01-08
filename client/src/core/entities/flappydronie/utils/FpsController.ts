// https://gafferongames.com/post/fix_your_timestep/
// https://stackoverflow.com/questions/39042859/most-performant-way-to-call-update-loop-of-a-javascript-physics-engine
// https://stackoverflow.com/questions/25612452/html5-canvas-game-loop-delta-time-calculations
// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
// https://jsbin.com/ditad/10/edit?js,output
export class FpsController {
  public config: FpsControllerConfig;
  public fps = 0; // Current 'Frames per Second'

  public isDrawing = false; // Whether the FpsController is current drawing/rendering
  private stop = true;

  private frameDuration = 0; // Fps in ms (-> Frame per Millisecond)
  private then = 0; // Latest draw time
  private elapsed = 0; // Elapsed time to the latest draw time
  private lag: number = 0; // Lag offset

  private updateCallback?: () => void;
  private renderCallback?: (lagOffset: number) => void;
  private readonly performanceCallback?: (performance: Performance) => void;

  constructor(
    fps: number,
    performanceCallback?: (performance: Performance) => void,
  ) {
    this.config = {
      fps,
    };
    this.performanceCallback = performanceCallback;
  }

  public startDrawing(
    updateCallback: () => void,
    renderCallback: (lagOffset: number) => void,
  ) {
    console.log('START DRAWING');
    this.renderCallback = renderCallback;
    this.updateCallback = updateCallback;

    this.stop = false;
    this.isDrawing = true;

    this.frameDuration = 1000 / this.config.fps;
    this.then = window.performance.now();

    this.draw();
  }

  private draw(now: number = window.performance.now()) {
    // Stop drawing
    if (this.stop) return;

    // Request another frame
    requestAnimationFrame((t) => this.draw(t));

    // Calculate elapsed time since last loop
    this.elapsed = now - this.then;
    this.then = now;

    // Add the elapsed time to the lag counter
    this.lag += this.elapsed;

    // Update the frame if the lag counter is greater than or
    // equal to the frame duration
    while (this.lag >= this.frameDuration) {
      // Update the logic
      if (this.updateCallback != null) this.updateCallback();

      // Reduce the lag counter by the frame duration
      this.lag -= this.frameDuration;
    }

    // Calculate the lag offset and use it to render the sprites
    const lagOffset = this.lag / this.frameDuration;
    if (this.renderCallback != null) this.renderCallback(lagOffset);

    // Calculate and apply 'analytics'
    this.fps = Math.floor(1000 / this.elapsed);
    if (this.performanceCallback != null)
      this.performanceCallback({
        fps: this.fps,
        lag: Math.floor(this.lag),
        offset: Math.round(lagOffset * 100) / 100,
        elapsed: Math.floor(this.elapsed),
      });
  }

  public stopDrawing() {
    // Weired check because off 'TypeError: Cannot set properties of null (setting 'stop')' issue
    if (this != null) {
      this.stop = true;
      this.isDrawing = false;
    }
  }
}

type FpsControllerConfig = {
  fps: number;
};

export type Performance = {
  elapsed: number;
  lag: number;
  fps: number;
  offset: number;
};
