import { FilledTile, EmptyTile } from "./Tile";

export default function Puzzle({ shuffledArray, dragOver, dragStart, dropped }) {
  return (
    <div className="grid grid-cols-4 gap-8 mt-6 px-6 rounded">
      {shuffledArray.map((value, index) => {
        // Render an EmptyTile if value is empty string ""
        if (value === "") {
          return (
            <EmptyTile
              key={index} // Add a key for each tile
              dragOver={dragOver}
              dropped={dropped}
              index={index}
            />
          );
        } else {
          // Render a FilledTile if value is a number
          return (
            <FilledTile
              key={index} // Add a key for each tile
              index={index}
              value={value}
              dragStart={dragStart}
            />
          );
        }
      })}
    </div>
  );
}