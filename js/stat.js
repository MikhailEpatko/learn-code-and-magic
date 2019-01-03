'use strict';

var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 200;
var SHADOW_STEP = 10;
var CONTROL_POINT_X_1 = CLOUD_WIDTH * 2 / 5;
var CONTROL_POINT_X_2 = CLOUD_WIDTH * 3 / 5;
var CONTROL_POINT_Y_1 = CLOUD_HEIGHT * 2 / 5;
var CONTROL_POINT_Y_2 = CLOUD_HEIGHT * 3 / 5;
var BEZIER_STEP = 10;
var MAX_SATURATE = 101;

var cloud = {
  X_COORDINATE: 100,
  Y_COORDINATE: 30,
  COLOR: 'rgb(255, 153, 194)'
};

var shadow = {
  X_COORDINATE: cloud.X_COORDINATE + SHADOW_STEP,
  Y_COORDINATE: cloud.Y_COORDINATE + SHADOW_STEP,
  COLOR: 'rgb(0, 255, 0)'
};

var text = {
  FONT: '12px Arial',
  GAP: 10,
  COLOR: 'rgb(0, 89, 179)'
};

var bar = {
  INITIAL_X: 200,
  INITIAL_Y: CLOUD_HEIGHT - BEZIER_STEP,
  WIDTH: 40,
  OFFSET: 90,
  MAX_HEIGHT: 130
};

var renderCloud = function name(ctx, cloud) {
  ctx.beginPath();
  ctx.moveTo(cloud.X_COORDINATE, cloud.Y_COORDINATE);

  ctx.bezierCurveTo(cloud.X_COORDINATE + CONTROL_POINT_X_1, cloud.Y_COORDINATE + BEZIER_STEP, 
                    cloud.X_COORDINATE + CONTROL_POINT_X_2, cloud.Y_COORDINATE  + BEZIER_STEP,
                    cloud.X_COORDINATE + CLOUD_WIDTH, cloud.Y_COORDINATE);

  ctx.bezierCurveTo(cloud.X_COORDINATE + CLOUD_WIDTH - BEZIER_STEP, cloud.Y_COORDINATE + CONTROL_POINT_Y_1, 
                    cloud.X_COORDINATE + CLOUD_WIDTH - BEZIER_STEP, cloud.Y_COORDINATE + CONTROL_POINT_Y_2,
                    cloud.X_COORDINATE + CLOUD_WIDTH, cloud.Y_COORDINATE + CLOUD_HEIGHT);  
                  
  ctx.bezierCurveTo(cloud.X_COORDINATE + CLOUD_WIDTH - CONTROL_POINT_X_2, cloud.Y_COORDINATE + CLOUD_HEIGHT - BEZIER_STEP, 
                    cloud.X_COORDINATE + CLOUD_WIDTH - CONTROL_POINT_X_1, cloud.Y_COORDINATE + CLOUD_HEIGHT - BEZIER_STEP,
                    cloud.X_COORDINATE, cloud.Y_COORDINATE + CLOUD_HEIGHT);
                    
  ctx.bezierCurveTo(cloud.X_COORDINATE + BEZIER_STEP, cloud.Y_COORDINATE + CLOUD_HEIGHT - CONTROL_POINT_Y_2, 
                    cloud.X_COORDINATE + BEZIER_STEP, cloud.Y_COORDINATE + CLOUD_HEIGHT - CONTROL_POINT_Y_1,
                    cloud.X_COORDINATE, cloud.Y_COORDINATE); 

  ctx.closePath();
  ctx.fillStyle = cloud.COLOR;
  ctx.fill();
  ctx.stroke();
};

var findMaxTime = function(times) {
  var max = 0;
  for (let i = 0; i < times.length; i++) {
    max = times[i] > max ? times[i] : max;    
  }
  return max;
};

var renderBar = function(ctx, players, times) {
  var maxTime = findMaxTime(times);
  for (var i = 0; i < players.length; i++) {
    var time = Math.round(times[i]);
    var barHeight = time / maxTime * bar.MAX_HEIGHT;
    var barColor = 'hsl(240, ' + Math.random() * MAX_SATURATE + '%, 50%)';
    var barX = bar.INITIAL_X + bar.OFFSET * i;
    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : barColor;
    ctx.fillRect(barX, bar.INITIAL_Y, bar.WIDTH, -barHeight);

    var namesOptions = {
      text: players[i],
      x: barX,
      y: bar.INITIAL_Y + text.GAP
    };

    var timesOptions = {
      text: time,
      x: barX,
      y: bar.INITIAL_Y - barHeight - text.GAP / 2
    };

    renderText(ctx, timesOptions);
    renderText(ctx, namesOptions);
  }
};

var renderText = function(ctx, options) {
  ctx.fillStyle = text.COLOR;
  ctx.font = text.FONT;
  ctx.fillText(options.text, options.x, options.y);
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, shadow);
  renderCloud(ctx, cloud);
  renderBar(ctx, players, times);
};