var readline = require('readline');
var fs = require('fs');
var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://192.168.0.250:27017/nginx_log');
// 链接错误
db.on('error', function(error) {
    console.log(error);
});

// Schema 结构
var mongooseSchema = new mongoose.Schema({
    ip : {type : String},
    identity    : {type : String},
    userid  : {type : String},
    time     : {type : String},
    req      : {type : String},
    code      : {type : String},
    port      : {type : String},
    referer      : {type : String},
    ua      : {type : String}

});

// model
var mongooseModel = db.model('nginxLog', mongooseSchema);

function saveModel(ip,identity,userid,time,req,code,port,referer,ua) {
    // 增加记录 基于model操作
    var doc = {ip : ip, identity : identity, userid : userid, time : time, req : req, code : code, port : port, referer : referer, ua : ua};
    mongooseModel.create(doc, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('save ok');
        }
        db.close();
    });

}

function  parseLog(str) {
    var str1 = str.match(/([0-9.]+)\s/);
    str = str.replace(str1[0],"");
    var str2 = str.match(/([\w.-]+)\s/);
    str = str.replace(str2,"");
    var str3 = str.match(/([\w.-]+)\s/);
    str = str.replace(str3,"");
    var str4 = str.match(/(\[[^\[\]]+\])\s/);
    str = str.replace(str4[0],"");
    var str5 = str.match(/\"([^\"]*)\"/g);
    str = str.replace(str5[0],"");
    var str6 = str.match(/(\d{3})\s/);
    str = str.replace(str6[0],"");
    var str7 = str.match(/(\d+|-)\s/);
    str = str.replace(str7[0],"");
    var str8 = str.match(/\"([^\"]*)\"/g);
    str = str.replace(str8[0],"");
    var str9 = str.match(/"((?:[^"]|\")+)"/);
    str = str.replace(str9[0],"");
    //var strs = str.match(/^([0-9.]+)\s([\w.-]+)\s([\w.-]+)\s(\[[^\[\]]+\])\s"((?:[^"]|\")+)"\s(\d{3})\s(\d+|-)\s"((?:[^"]|\")+)"\s"((?:[^"]|\")+)"$/g);
    saveModel(str1[0],str2,str3,str4[0],str5[0],str6[0],str7,str8,str9[0]);
    //console.log("str1:"+str1[0] + " str2:"+str2 + " str3:"+str3 + " str4:"+str4[0] + " str5:"+str5[0] + " str6:"+str6[0] + " str7:"+str7 + " str8:"+str8 + " str9:"+str9[0]);
}
/*
var strPath = "test/test_data/access.log";
var buf = fs.readFileSync('test/test_data/access.log');
var str = fs.createReadStream('test/test_data/access.log').pipe(process.stdout);
*/
var rl = readline.createInterface({
    input: fs.createReadStream('test/test_data/access.log')
});

//noinspection BadExpressionStatementJS
rl.on('line', (line) => {
    parseLog(line)
    //setInterval(parseLog(line), 10);
    //console.log('Line from file:', line);
});
console.log("end")
// 关闭数据库链接
//db.close();
//console.log(str);
//parseLog(str);