// export function getProfStat(skill: keyof Proficiencies) {
//   switch (skill) {
//     // VIT
//     // AGL
//     case "Acrobatics":
//     case "Stealth":
//     case "Flying":
//         return `AGL`;
//     // STR
//     case "Athletics":
//     case "Climb":
//     case "Grapple":
//         return `STR`;
//     // DEX
//     case "Craft":
//     case "Firearms":
//         return `DEX`;
//     // STR+DEX
//     case "Melee":
//         return `STR+DEX`;
//     // CHA
//     case "Disguise":
//     case "Persuasion":
//     case "Intimidation":
//         return `CHA`;
//     // PER
//     case "Animal Handling":
//     case "Investigation":
//         return `PER`;
//     // INT
//     case "Knowledge":
//     case "Technology":
//     case "Religion":
//     case "Nature":
//         return `INT`;

//     // INT+DEX,
//     case "Explosives":
//     case "Medicine":
//     case "Mechanics":
//         return `INT+DEX`;

//     // STR+CHA+INT
//     case "Willpower":
//         return `STR+CHA+INT`;
//   }
// }


// export function getProfStat(skill: keyof Proficiencies, character: Character) {
//   switch (skill) {
//     // VIT
//     // AGL
//     case "Acrobatics":
//     case "Stealth":
//     case "Flying":
//         return `AGL(${getStatString(character.stats.Agility)})`;
//     // STR
//     case "Athletics":
//     case "Climb":
//     case "Grapple":
//         return `STR(${getStatString(character.stats.Strength)})`;
//     // DEX
//     case "Craft":
//     case "Firearms":
//         return `DEX(${getStatString(character.stats.Dexterity)})`;
//     // STR+DEX
//     case "Melee":
//         return `STR(${getStatString(character.stats.Strength)})+DEX(${getStatString(character.stats.Dexterity)})`;
//     // CHA
//     case "Disguise":
//     case "Persuasion":
//     case "Intimidation":
//         return `CHA(${getStatString(character.stats.Charisma)})`;
//     // PER
//     case "Animal Handling":
//     case "Investigation":
//         return `PER(${getStatString(character.stats.Perception)})`;
//     // INT
//     case "Knowledge":
//     case "Technology":
//     case "Religion":
//     case "Nature":
//         return `INT(${getStatString(character.stats.Intelligence)})`;

//     // INT+DEX,
//     case "Explosives":
//     case "Medicine":
//     case "Mechanics":
//         return `INT(${getStatString(character.stats.Intelligence)})+DEX(${getStatString(character.stats.Dexterity)})`;

//     // STR+CHA+INT
//     case "Willpower":
//         return `STR(${getStatString(character.stats.Strength)})/CHA(${getStatString(character.stats.Charisma)})/INT(${getStatString(character.stats.Intelligence)})`;
//   }
// }