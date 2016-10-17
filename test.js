var NodeStl = require('./index.js');
var stl = NodeStl('test/test_data/Pterosaur_FDM.stl');
console.log(stl.volume + 'cm^3');     // 21cm^3
console.log(stl.weight + 'gm');       //  1gm
console.log(stl.boundingBox,'(mm)');  // [60,45,50] (mm)
console.log(stl.area,'(mm^2)');          // 91.26 (m)
