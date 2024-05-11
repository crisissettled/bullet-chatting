import { getTextWidth, getTextPosition } from "./utils";

function BChat(data, ctx) {
  this.content = data.content;
  this.runTime = data.runTime;
  this.data = data;
  this.ctx = ctx;

  this.init();
}

BChat.prototype.init = function () {
  this.color = this.data.color || this.ctx.color;
  this.speed = this.data.speed || this.ctx.speed;
  this.fontSize = 30;
  this.width = getTextWidth(this.content, this.fontSize);

  getTextPosition(this.ctx.canvas, this.fontSize, this);
};

BChat.prototype.draw = function () {
  console.log(`${this.fontSize}px Arial`);
  this.ctx.canvasCtx.font = `${this.fontSize}px Arial Courier New sans-serif`;
  this.ctx.canvasCtx.fillStyle = this.color;
  this.ctx.canvasCtx.fillText(this.content, this.X, this.Y);
};

export default BChat;
