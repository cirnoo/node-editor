import { Config } from "./config";

export const drawQuad = ({ grid, fullCellSize, gridThickness }) => {
  for (let i = 0; i < fullCellSize; i += Config.CELL_SIZE) {
    grid
      .lineStyle(gridThickness, 0x353535)
      .moveTo(i, 0)
      .lineTo(i, fullCellSize);
  }

  for (let i = 0; i < fullCellSize; i += Config.CELL_SIZE) {
    grid
      .lineStyle(gridThickness, 0x353535)
      .moveTo(0, i)
      .lineTo(fullCellSize, i);
  }

  grid
    .lineStyle(gridThickness, 0x1c1c1c)
    .moveTo(0, 0)
    .lineTo(0, fullCellSize + 1);

  grid
    .lineStyle(gridThickness, 0x1c1c1c)
    .moveTo(fullCellSize + 1, 0)
    .lineTo(fullCellSize + 1, fullCellSize + 1);

  grid
    .lineStyle(gridThickness, 0x1c1c1c)
    .moveTo(0, 0)
    .lineTo(fullCellSize + 1, 0);

  grid
    .lineStyle(gridThickness, 0x1c1c1c)
    .moveTo(0, fullCellSize + 1)
    .lineTo(fullCellSize + 1, fullCellSize + 1);
};

export const isRightClick = e => {
  return e.which == 3;
};

export const isLeftClick = e => {
  return e.which == 1;
};
