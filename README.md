node-stl
========

Parse *STL* files with Node.js and get volume, weight,surface area and the bounding box.
用Node解析.stl文件，获取体积，重量，表面积和占用空间等数据。可以运行test.js快速开始。

## example

```javascript
var stl = NodeStl(__dirname + '/myCool.stl');
console.log(stl.volume + 'cm^3');     // 21cm^3
console.log(stl.weight + 'gm');       //  1gm
console.log(stl.boundingBox,'(mm)');  // [60,45,50] (mm)
console.log(stl.area,'(m)');          // 91.26 (m)
```
node-stl recognizes by itself whether it is dealing with an ASCII STL or a binary STL file

## install

use [npm](https://npmjs.org):

```shell
$ npm install node-stl
```

## license

MIT

## Version

`0.1.0`
