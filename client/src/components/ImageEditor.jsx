import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';

const BackgroundImage = ({ imageUrl, width, height }) => {
  const [img] = useImage(imageUrl);
  
  return (
    <Image
      image={img}
      x={0}
      y={0}
      width={width}
      height={height}
    />
  );
};

const EditableText = ({ text, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        ref={shapeRef}
        text={text.text}
        x={text.x}
        y={text.y}
        fontSize={text.fontSize}
        fontFamily={text.fontFamily}
        fill={text.fill}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...text,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...text,
            x: node.x(),
            y: node.y(),
            fontSize: Math.max(12, text.fontSize * scaleX),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const ImageEditor = ({ imageUrl, onSave, onClose }) => {
  const stageRef = useRef();
  const [stageSize, setStageSize] = useState({ width: 1024, height: 1024 });
  const [texts, setTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');

  useEffect(() => {
    // Set stage size based on container
    const updateSize = () => {
      const container = stageRef.current?.getContainer()?.parentElement;
      if (container) {
        const maxWidth = Math.min(1024, container.clientWidth - 32);
        setStageSize({ width: maxWidth, height: maxWidth });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleStageClick = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const addText = () => {
    if (!textInput.trim()) return;

    const newText = {
      id: Date.now().toString(),
      text: textInput,
      x: 50,
      y: 50,
      fontSize,
      fill: textColor,
      fontFamily,
    };
    setTexts([...texts, newText]);
    setTextInput('');
    setSelectedId(newText.id);
  };

  const deleteSelected = () => {
    if (selectedId) {
      setTexts(texts.filter((t) => t.id !== selectedId));
      setSelectedId(null);
    }
  };

  const exportImage = () => {
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({ pixelRatio: 2 });
    onSave(dataURL);
  };

  const selectedText = texts.find((t) => t.id === selectedId);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Image Editor
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-4 overflow-auto">
            <div className="bg-gray-100 rounded-lg p-4 inline-block">
              <Stage
                width={stageSize.width}
                height={stageSize.height}
                ref={stageRef}
                onClick={handleStageClick}
                onTap={handleStageClick}
                className="bg-white shadow-lg rounded-lg"
              >
                <Layer>
                  {imageUrl && (
                    <BackgroundImage
                      imageUrl={imageUrl}
                      width={stageSize.width}
                      height={stageSize.height}
                    />
                  )}
                  {texts.map((text) => (
                    <EditableText
                      key={text.id}
                      text={text}
                      isSelected={text.id === selectedId}
                      onSelect={() => setSelectedId(text.id)}
                      onChange={(newAttrs) => {
                        const newTexts = texts.map((t) =>
                          t.id === text.id ? newAttrs : t
                        );
                        setTexts(newTexts);
                      }}
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>

          <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Text
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter text..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addText()}
                  />
                  <button
                    onClick={addText}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {selectedText && (
                <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-700">Edit Selected Text</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size: {selectedText.fontSize}
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="100"
                      value={selectedText.fontSize}
                      onChange={(e) => {
                        const newTexts = texts.map((t) =>
                          t.id === selectedId
                            ? { ...t, fontSize: parseInt(e.target.value) }
                            : t
                        );
                        setTexts(newTexts);
                      }}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <input
                      type="color"
                      value={selectedText.fill}
                      onChange={(e) => {
                        const newTexts = texts.map((t) =>
                          t.id === selectedId ? { ...t, fill: e.target.value } : t
                        );
                        setTexts(newTexts);
                      }}
                      className="w-full h-10 rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Family
                    </label>
                    <select
                      value={selectedText.fontFamily}
                      onChange={(e) => {
                        const newTexts = texts.map((t) =>
                          t.id === selectedId
                            ? { ...t, fontFamily: e.target.value }
                            : t
                        );
                        setTexts(newTexts);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Comic Sans MS">Comic Sans MS</option>
                    </select>
                  </div>

                  <button
                    onClick={deleteSelected}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete Text
                  </button>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={exportImage}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all font-semibold"
                >
                  Export Image
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;

