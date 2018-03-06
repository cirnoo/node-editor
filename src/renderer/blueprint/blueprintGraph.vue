<template>
  <div>
    <canvas ref="renderCanvas"></canvas>
  </div>
</template>


<script>
import { Config } from "../config";
import { drawQuad, isRightClick, isLeftClick } from "../utils";

export default {
  data() {
    return {
      app: null,
      mainContainer: null,
      gridSpritee: null,
      dragging: false,
      draggingLeft: false,
      dragLeftStartPoint: { x: 0, y: 0 },
      eventData: null
    };
  },
  mounted() {
    this.app = new this.$pixi.PIXI.Application(
      document.body.parentNode.clientWidth,
      window.innerHeight,
      {
        view: this.$refs.renderCanvas,
        antialias: true
      }
    );

    let gridThickness = 1;
    let fullCellSize = 8 * Config.CELL_SIZE;

    let gridContainer = new this.$pixi.PIXI.Container();
    let gridBackground = new this.$pixi.PIXI.Graphics();
    let grid = new this.$pixi.PIXI.Graphics();
    let renderTexture = this.$pixi.PIXI.RenderTexture.create(
      fullCellSize + 1,
      fullCellSize + 1
    );

    this.mainContainer = new this.$pixi.PIXI.Container();
    this.gridSprite = new this.$pixi.PIXI.extras.TilingSprite(
      renderTexture,
      this.app.renderer.width,
      this.app.renderer.height
    );

    drawQuad({ grid, fullCellSize, gridThickness });

    gridBackground.beginFill(0x2a2a2a);
    gridBackground.drawRect(0, 0, fullCellSize, fullCellSize);
    gridContainer.addChild(gridBackground);
    gridContainer.addChild(grid);

    this.app.renderer.render(gridContainer, renderTexture, false);
    this.app.stage.addChild(this.gridSprite);
    this.app.stage.addChild(this.mainContainer);

    this.app.renderer.plugins.interaction
      .on("pointerdown", this.onDragStart)
      .on("pointerup", this.onDragEnd)
      .on("pointerupoutside", this.onDragEnd)
      .on("pointermove", this.onDragMove);
  },
  methods: {
    onDragStart: function(e) {
      if (isRightClick(e.data.originalEvent)) {
        this.dragging = true;
        this.eventData = e.data;
      } else if (isLeftClick(e.data.originalEvent)) {
        this.draggingLeft = true;
        this.dragLeftStartPoint = {
          x: e.data.global.x,
          y: e.data.global.y
        };
      }
    },
    onDragEnd: function(e) {
      if (isRightClick(e.data.originalEvent)) {
        this.dragging = false;
        this.eventData = null;
      } else if (isLeftClick(e.data.originalEvent)) {
        this.draggingLeft = false;
        this.dragLeftStartPoint = null;
      }
    },
    onDragMove: function(e) {
      if (this.dragging) {
        let mx = e.data.originalEvent.movementX;
        let my = e.data.originalEvent.movementY;
        this.mainContainer.x += mx;
        this.mainContainer.y += my;

        this.gridSprite.tilePosition.x += mx;
        this.gridSprite.tilePosition.y += my;
      }
    }
  }
};
</script>

<style>

</style>
