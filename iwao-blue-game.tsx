import React, { useState, useEffect } from 'react';

const IWAO_BLUE = '#336699';
const GAME_TITLE = '小林巌生「青って200色あんねん。」イワオブルーを探せ！#336699ゲーム';

const ColorButton = ({ color, onClick, size = '50px' }) => (
  <button
    onClick={() => onClick(color)}
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      margin: '5px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
    aria-label={`色: ${color}`}
  />
);

const generateRandomBlue = (level) => {
  const baseR = 51, baseG = 102, baseB = 153; // IWAO_BLUE components
  const maxDiff = Math.max(70 - level * 10, 10); // Decrease max difference as level increases

  const r = Math.max(0, Math.min(255, baseR + (Math.random() * 2 - 1) * maxDiff));
  const g = Math.max(0, Math.min(255, baseG + (Math.random() * 2 - 1) * maxDiff));
  const b = Math.max(0, Math.min(255, baseB + (Math.random() * 2 - 1) * maxDiff));

  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
};

const generateColors = (count, level) => {
  const colors = [IWAO_BLUE];
  while (colors.length < count) {
    const newColor = generateRandomBlue(level);
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  }
  return colors.sort(() => Math.random() - 0.5);
};

const Game = () => {
  const [gameState, setGameState] = useState('start');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (gameState === 'playing') {
      setColors(generateColors(currentLevel + 1, currentLevel));
    }
  }, [gameState, currentLevel]);

  const handleColorClick = (color) => {
    if (color === IWAO_BLUE) {
      if (currentLevel >= 6) {
        setGameState('won');
      } else {
        setCurrentLevel(prevLevel => prevLevel + 1);
      }
    } else {
      setGameState('lost');
    }
  };

  const resetGame = () => {
    setGameState('start');
    setCurrentLevel(1);
    setColors([]);
  };

  const renderStartScreen = () => (
    <div>
      <h1>{GAME_TITLE}</h1>
      <p>イワオブルー（#336699）をよく覚えてください：</p>
      <div style={{ width: '100px', height: '100px', backgroundColor: IWAO_BLUE, margin: '10px auto' }} />
      <button onClick={() => setGameState('playing')}>ゲームスタート</button>
    </div>
  );

  const renderPlayingScreen = () => (
    <div>
      <h2>レベル {currentLevel}</h2>
      <p>イワオブルーはどれ？</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {colors.map((color, index) => (
          <ColorButton key={index} color={color} onClick={handleColorClick} />
        ))}
      </div>
    </div>
  );

  const renderWonScreen = () => (
    <div>
      <h2>おめでとうございます！</h2>
      <p>あなたはイワオブルーマスターです！</p>
      <button onClick={resetGame}>もう一度プレイ</button>
    </div>
  );

  const renderLostScreen = () => (
    <div>
      <h2>残念！</h2>
      <p>イワオブルーの識別に失敗しました。もう一度挑戦してみましょう！</p>
      <button onClick={resetGame}>もう一度プレイ</button>
    </div>
  );

  const renderGame = () => {
    switch (gameState) {
      case 'start':
        return renderStartScreen();
      case 'playing':
        return renderPlayingScreen();
      case 'won':
        return renderWonScreen();
      case 'lost':
        return renderLostScreen();
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {renderGame()}
    </div>
  );
};

export default Game;
