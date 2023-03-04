import React, { useEffect, useState } from "react";
import Svg, { G, Line, Text, Circle, Rect } from "react-native-svg";
import { Chord as ChordType } from "../../generated/graphql";

interface ChordProps {
  chord: ChordType;
  colour: string;
  numFrets: number;
  numStrings: number;
  setStrokeWidth?: number;
  setNutMultiplier?: number;
}

const Chord: React.FC<ChordProps> = ({
  colour,
  chord,
  numFrets,
  numStrings,
  setStrokeWidth,
  setNutMultiplier,
}) => {
  const tuning = ["E", "A", "D", "G", "B", "E"];
  const strokeWidth = !setStrokeWidth ? 2 : setStrokeWidth;
  const nutMultiplier = !setNutMultiplier ? 3 : setNutMultiplier;
  const [layout, setLayout] = useState<{ width: number; height: number } | null>(null);
  const [diagram, setDiagram] = useState<{ width: number; height: number } | null>(null);
  const [diagramPosition, setDiagramPosition] = useState<{
    startX: number;
    endX: number;
    startY: number;
    endY: number;
  } | null>(null);
  const [diagramPadding, setDiagramPadding] = useState<{
    paddingX: number;
    paddingY: number;
  } | null>(null);
  const [stringYPositions, setStringYPositions] = useState<number[] | null>(null);
  const [fretXPositions, setFretXPositions] = useState<number[] | null>(null);
  const [itemWidth, setItemWidth] = useState<number | null>(null);

  useEffect(() => {
    if (layout && diagram && diagramPosition) {
      const stringSpacing = (diagram.height - strokeWidth) / (numStrings - 1);
      const fretSpacing = (diagram.width - strokeWidth) / numFrets;
      setItemWidth(fretSpacing / 4);
      setStringYPositions(
        Array(numStrings)
          .fill(null)
          .map((_, index) => index * stringSpacing + strokeWidth / 2 + diagramPosition.startY)
      );
      setFretXPositions(
        Array(numFrets + 1)
          .fill(null)
          .map(
            (_, index) =>
              index * fretSpacing +
              strokeWidth / 2 +
              diagramPosition.startX +
              (chord.position === 1 ? (strokeWidth * nutMultiplier) / 2 : 0)
          )
      );
    }
  }, [layout, diagram, diagramPosition]);
  return (
    <Svg
      onLayout={({ nativeEvent }) => {
        const width = nativeEvent.layout.width;
        setLayout({
          width: width,
          height: width / 1.5,
        });
        setDiagram({
          width:
            width -
            (width / (numFrets + 2)) * 2 -
            (chord.position === 1 ? (strokeWidth * nutMultiplier) / 2 : 0),
          height: width / 2.5,
        });
        setDiagramPosition({
          startX:
            width / (numFrets + 2) + (chord.position === 1 ? (strokeWidth * nutMultiplier) / 4 : 0),
          endX:
            width / (numFrets + 2) +
            width -
            (width / (numFrets + 2)) * 2 +
            (chord.position === 1 ? (strokeWidth * nutMultiplier) / 4 : 0),
          startY: (width / 1.5 - width / 2.5) / 2,
          endY: width / 2.5 + (width / 1.5 - width / 2.5) / 2,
        });
        setDiagramPadding({
          paddingX:
            width / (numFrets + 2) + (chord.position === 1 ? (strokeWidth * nutMultiplier) / 4 : 0),
          paddingY: (width / 1.5 - width / 2.5) / 2,
        });
      }}
      width={layout ? layout.width : "100%"}
      height={layout ? layout.height : "100%"}
    >
      {layout &&
        diagram &&
        diagramPosition &&
        diagramPadding &&
        itemWidth &&
        stringYPositions &&
        fretXPositions && (
          <>
            {stringYPositions.map((y, index) => (
              <Line
                key={index}
                x1={diagramPosition.startX}
                y1={y}
                x2={diagramPosition.endX}
                y2={y}
                stroke={colour}
                strokeWidth={strokeWidth}
              />
            ))}
            {fretXPositions.map((x, index) => (
              <Line
                key={index}
                x1={chord.position === 1 && index === 0 ? x - (strokeWidth * nutMultiplier) / 4 : x}
                y1={diagramPosition.startY}
                x2={chord.position === 1 && index === 0 ? x - (strokeWidth * nutMultiplier) / 4 : x}
                y2={diagramPosition.endY}
                stroke={colour}
                strokeWidth={
                  chord.position === 1 && index === 0 ? strokeWidth * nutMultiplier : strokeWidth
                }
              />
            ))}
            {tuning.reverse().map((note, index) => (
              <Text
                key={index}
                fill={colour}
                x={
                  diagramPosition.endX +
                  diagramPadding.paddingX / 2 -
                  (chord.position === 1 ? 0 : strokeWidth / 2)
                }
                y={stringYPositions[index] + strokeWidth}
                textAnchor="middle"
                fontSize={itemWidth * 2}
                fontWeight="bold"
                alignmentBaseline="middle"
              >
                {note}
              </Text>
            ))}
            {chord.fingers.map((finger, index) =>
              finger[1] !== 0 && finger[1] !== -1 ? (
                <Circle
                  key={index}
                  r={itemWidth}
                  cy={stringYPositions[finger[0] - 1]}
                  cx={
                    fretXPositions[finger[1]] -
                    diagramPadding.paddingX / 2 +
                    (chord.position === 1 ? strokeWidth / 2 : 0)
                  }
                  fill={colour}
                  stroke={colour}
                  strokeWidth={strokeWidth}
                />
              ) : null
            )}
            {chord.fingers.map((finger, index) =>
              finger[1] === 0 ? (
                <Circle
                  key={index}
                  r={itemWidth}
                  cy={stringYPositions[finger[0] - 1]}
                  cx={
                    diagramPosition.startX -
                    diagramPadding.paddingX / 2 +
                    (chord.position === 1 ? strokeWidth / 2 : 0)
                  }
                  stroke={colour}
                  strokeWidth={strokeWidth}
                />
              ) : null
            )}
            {chord.fingers.map((finger, index) =>
              finger[1] === -1 ? (
                <G key={index}>
                  <Line
                    x1={diagramPadding.paddingX * 0.25}
                    y1={stringYPositions[finger[0] - 1] - itemWidth}
                    x2={diagramPadding.paddingX * 0.75}
                    y2={stringYPositions[finger[0] - 1] + itemWidth}
                    stroke={colour}
                    strokeWidth={strokeWidth}
                  />
                  <Line
                    x1={diagramPadding.paddingX * 0.25}
                    y1={stringYPositions[finger[0] - 1] + itemWidth}
                    x2={diagramPadding.paddingX * 0.75}
                    y2={stringYPositions[finger[0] - 1] - itemWidth}
                    stroke={colour}
                    strokeWidth={strokeWidth}
                  />
                </G>
              ) : null
            )}
            {chord.barres.map((barre, index) => (
              <Rect
                key={index}
                x={
                  fretXPositions[barre.fret] -
                  diagramPadding.paddingX * 0.75 +
                  (chord.position === 1 ? strokeWidth / 2 : 0)
                }
                y={stringYPositions[barre.toString - 1] - itemWidth}
                width={itemWidth * 2}
                height={
                  stringYPositions[barre.fromString - 1] -
                  stringYPositions[barre.toString - 1] +
                  itemWidth * 2
                }
                fill={colour}
                rx={itemWidth * 0.25}
                ry={itemWidth * 0.25}
              />
            ))}
            {chord.position !== 1 ? (
              <Text
                fill={colour}
                x={diagramPosition.startX}
                y={stringYPositions[0]}
                textAnchor="start"
                fontSize={itemWidth * 2}
                fontWeight="bold"
                alignmentBaseline="text-bottom"
              >
                {`${chord.position}fr`}
              </Text>
            ) : null}
          </>
        )}
    </Svg>
  );
};
export default Chord;
