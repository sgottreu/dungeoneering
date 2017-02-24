let slots = [];

for(var x=0;x<200;x++){
  slots[x] = {id: x+1, overlays: { doors : [], entity: false }, entrance: false, exit: false, occupied: false };
}

let Slots = slots;

export default Slots;
