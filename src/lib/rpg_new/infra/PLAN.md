## Plan for the new Architecture
Declarative species definitions as classes using COMPOSITION of CAPABILITIES
A base set of data that ALL species share
- Bars (for values from (min, max))
  - (min, max) can either be static values or calculated from some other data from this species
    - should be of type (number | (instance of this object) => number)
- Stats
  - List of stat values from (0, global max (for the entire app, defined in the base species object))
  - There is a global list of stats to pick from, but each species has to define which are enabled/disabled
- Skills
  - List of skill values with a value of (empty, proficient, expert) and a list of stats that can be used to
  - calculate the modifier from. The modifier calculation is defined as a function of (stat value) => number
  - (global for the entire app, defined in the base species object). the highest value out of all stats is picked
  - to calculate this
  - There is a global list of skills to pick from, but each species has to define which are enabled/disabled
- Inventory
  - all species have an inventory, with a base Carry Weight calculated from each one. There is a global list of
  - slots available and each species defines which ones it will have enabled. They can also define a base set of
  - containers to use.
- Abilities
  - Each species can define a list of custom abilities available. players can choose to enable/disable them.