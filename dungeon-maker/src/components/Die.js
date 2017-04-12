export var Die = [
  { label : 'd4', num: 4},
  { label : 'd6', num: 6},
  { label : 'd8', num: 8},
  { label : 'd10', num: 10},
  { label : 'd12', num: 12},
  { label : 'd20', num: 20}
];

export var DieRoll = (uBound) => {
  return (Math.floor(Math.random() * (uBound - 1)) + 1);
}