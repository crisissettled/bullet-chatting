import BChat from "./bchat";
import { isArray, isObject } from "./utils";

function BChatVideo(video, canvas, options) {
  if (this instanceof BChatVideo == false) {
    throw new Error("please use new to create instance!");
  }

  if (!video || !canvas || !options || !isObject(options)) return;
  if (!options.bChatData || !isArray(options.bChatData)) return;

  this.video = video;
  this.canvas = canvas;
  this.canvasCtx = canvas.getContext("2d");
  this.canvas.width = video.offsetWidth;
  this.canvas.height = video.offsetHeight;
  this.bChatPaused = true;
  //apply options
  Object.assign(
    this,
    {
      speed: 2,
      runTime: 0,
      color: "#fff",
    },
    options
  );

  this.bChatPool = this.createBChatPool();
}

BChatVideo.prototype.createBChatPool = function () {
  return this.bChatData.map((data) => new BChat(data, this));
};

BChatVideo.prototype.render = function () {
  this.clearRect();
  this.drawBChat();
  !this.bChatPaused && requestAnimationFrame(this.render.bind(this));
};

BChatVideo.prototype.clearRect = function () {
  this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

BChatVideo.prototype.drawBChat = function () {
  let currentTime = this.video.currentTime;
  this.bChatPool.map((bChat) => {
    if (!bChat.stopDrawing && currentTime >= bChat.runTime) {
      if (!bChat.isInitialized) {
        bChat.init();
        bChat.isInitialized = true;
      }

      bChat.X -= bChat.speed;
      bChat.draw();
      if (bChat.X <= bChat.width * -1) {
        bChat.stopDrawing = true;
      }
    }
  });
};

export default BChatVideo;
