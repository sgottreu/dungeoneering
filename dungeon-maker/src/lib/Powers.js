class Powers {};

Powers.powerTemplate = {
  name: '',
  type: false,
  _type: "power",
  action: false,
  recharge: false,
  class: false,
  reach: 1,
  attack: { for: false, against: 'armorClass', modifier: 0},
  damage: {
    modifier: 0,
    die: 'd6',
    num: 1
  },
  defense: false,
  weapon: false,
  weapon_modifier: 0,
  ability_modifier: false
};

Powers.powerType = [
  { name: 'Melee', class: 'melee', attack: {for: 'strength', against: 'armorClass', modifier: 0}, defense: {} },
  { name: 'Ranged', class: 'ranged', attack: {for: 'dexterity', against: 'armorClass', modifier: 0}, defense: {} },
  { name: 'Close', class: 'blast_affect', attack: {for: 'wisdom', against: 'armorClass', modifier: 0}, defense: {} },
  { name: 'Area', class: 'area_affect', attack: {for: 'charisma', against: 'armorClass', modifier: 0}, defense: {} },
];

Powers.powerAction = [
  'Standard',
  'Move',
  'Minor',
  'Free'
];

Powers.powerRecharge = [
  'At-Will',
  'Encounter',
  'Daily',
  'Recharge'
];

export {Powers};