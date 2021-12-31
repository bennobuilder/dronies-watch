// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
export class FpsController {
  public config: FpsControllerConfig;
  public fps: number = 0;
  public isDrawing = false;
  public drawCallback: () => void;

  private fpsInterval: number = 0;
  private now: number = 0;
  private then: number = 0;
  private elapsed: number = 0;
  private stop = true;
  private calculateFpsInterval: NodeJS.Timeout | null = null;

  constructor(fps: number) {
    this.config = {
      fps,
    };
    this.drawCallback = () => {
      console.log('No draw callback set!');
    };
  }

  public startDrawing(drawCallback: () => void) {
    console.log('START DRAWING');
    this.drawCallback = drawCallback;

    this.stop = false;
    this.isDrawing = true;

    this.fpsInterval = 1000 / this.config.fps;
    this.then = window.performance.now();
    this.draw();
    this.startCalculatingCurrentFps();
  }

  public stopDrawing() {
    this.stop = true;
    this.isDrawing = false;

    // Clear 'calculateFps' interval
    if (this.calculateFpsInterval != null)
      clearInterval(this.calculateFpsInterval);
  }

  private draw(newTime: number = window.performance.now()) {
    // Stop drawing
    if (this.stop) return;

    // Request another frame
    requestAnimationFrame((t) => this.draw(t));

    // Calculate elapsed time since last loop
    this.now = newTime;
    this.elapsed = this.now - this.then;

    // If enough time has elapsed, draw the next frame
    if (this.elapsed > this.fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      this.then = this.now - (this.elapsed % this.fpsInterval);

      // Call draw method
      this.fps++;
      this.drawCallback();
    }
  }

  // Calculate FPS
  private startCalculatingCurrentFps() {
    this.calculateFpsInterval = setInterval(() => {
      this.fps = 0;
    }, 1000);
  }
}

type FpsControllerConfig = {
  fps: number;
};
