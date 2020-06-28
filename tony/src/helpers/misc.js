export function getRandomColor() {
  const colors = [
    '#170740',
    '#061754',
    '#075406',
    '#540640',
    '#542306',
    '#54061c',
    '#440654',
    '#535406',
    '#542e06',
    '#065454',
    '#540606',
    '#540638',
    '#06542c',
    '#2b5406',
    '#541106',
    '#543c06',
    '#3a0654',
    '#2b0654',
    '#065410',
    '#543c06',
    '#063e54',
    '#260659',
  ];
  const randomNumber = Math.floor(Math.random() * (colors.length - 1));
  return colors[randomNumber];
}

export function reduceColor(color, percent);
