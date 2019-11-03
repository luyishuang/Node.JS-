const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const queryString = require("queryString");
var chapterList = require("./data.js").chapterList;
var userList = require("./data.js").userList;

http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var pathName = urlObj.pathname;
    if(pathName == "/list" || pathName == "list/"){
        var htmlPath = path.join(__dirname,"chapterList.html");
        var htmlContent = fs.readFileSync(htmlPath);
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        res.write(htmlContent);
        res.end();
    }
    else if(pathName == "/detail" || pathName == "detail/"){
        var htmlPath = path.join(__dirname,"chapter.html");
        var htmlContent = fs.readFileSync(htmlPath);
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        res.write(htmlContent);
        res.end();
    }
    else if(pathName == "/login" || pathName == "login/"){
        var htmlPath = path.join(__dirname,"login.html");
        var htmlContent = fs.readFileSync(htmlPath);
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        res.write(htmlContent);
        res.end();
    }
    else if(pathName == "/listmanager" || pathName == "listmanager/"){
        var htmlPath = path.join(__dirname,"list.html");
        var htmlContent = fs.readFileSync(htmlPath);
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        res.write(htmlContent);
        res.end();
    }
    else if(pathName == "/addChapter" || pathName == "addChapter/"){
        var htmlPath = path.join(__dirname,"addChapter.html");
        var htmlContent = fs.readFileSync(htmlPath);
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        res.write(htmlContent);
        res.end();
    }
    else if(pathName == "/getChapterList"){
        //console.log(typeof chapterList);//object
        var chapterListStr = JSON.stringify(chapterList);
        //console.log(typeof chapterListStr);//string
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(chapterListStr);
        res.end();
    }
    else if(pathName == "/readChapter"){
        var dataList = [];
        //console.log(urlObj.query);//chapterId=1
        //console.log(typeof urlObj.query);//string
        var listLi = queryString.parse(urlObj.query);
        //console.log(typeof listLi);//object
        //console.log(listLi);//[Object: null prototype] { chapterId: '1' }
        var chapterId = listLi.chapterId;
        chapterList.forEach(function(data, index){
            if (data.chapterId == chapterId) {
                dataList.push(data);
            }
        });
        //console.log(typeof dataList);//object
        var dataListStr = JSON.stringify(dataList);
        //console.log(typeof dataListStr);//string
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(dataListStr);
        res.end();
    }
    else if(pathName == "/toLogin"){
        var dataObj = "";
        req.on("data", function(chunk){
            dataObj += chunk;
        });
        req.on("end", function(){
            //console.log(dataObj);//username=admin&password=admin string类型的数据
            var userpwd = queryString.parse(dataObj);
            var userName = userpwd.username;
            var passWord = userpwd.password;
            for (var i = 0; i < userList.length;i ++){
                if(userList[i].username == userName && userList[i].pwd == passWord) {
                    data = {code: 0};
                    //console.log(data);//{ code: 0 }  object类型
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(data));
                }
            }
            data = {code: -1};
            //console.log(data);//{ code: -1 } object类型
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(data));
        });
    }
    else if(pathName == "/addMyChapter"){
        var dataObj = "";//用来接收数据
        req.on("data", function(chunk){
            dataObj += chunk;
        });
        req.on("end", function(){
            //console.log(dataObj);//title=q&content=q string类型的数据
            var titcon = queryString.parse(dataObj);
            var date = new Date();
            var attr = {
                "chapterId": chapterList[chapterList.length-1].chapterId + 1,
                "chapterName": titcon.title,
                "imgPath": "images/1447641406565685-lp.jpg",
                "chapterDes": titcon.content,
                "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
                "publishTimer": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                "author": "admin",
                "views": 999
            };
            chapterList.push(attr);
            data = {code: 0};
            var dataStr = JSON.stringify(data);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(dataStr);
            res.end();
        });
    }
    //扩展：文章删除功能
    else if(pathName == "/deleteChapter"){
        var listLi = queryString.parse(urlObj.query);
        var chapterId = listLi.chapterId;
        for (var i = 0; i < chapterList.length; i ++) {
            if (chapterList[i].chapterId == chapterId) {
                chapterList.splice(i, 1);
                data = {code: 0};
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(data));
            }
        }
        data = {code: -1};
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    }
    else{
        var htmlPath = path.join(__dirname, urlObj.pathname);
        fs.readFile(htmlPath, function(err, data){
            if(err){
                res.writeHead(404,{"Content-Type": "text/plane; charset=utf-8"});
                res.write("page is not found");
                res.end();
            }
            else{
                var suffix = htmlPath.substring(htmlPath.indexOf(".") + 1, htmlPath.length);//根据后缀判断返回类型
                if(suffix == "css"){
                    res.writeHead(200, {"Content-Type": "text/css"});
                }
                else if(suffix == "js"){
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                }
                else if(suffix == "jpg"){
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                }
                else if(suffix == "jpeg"){
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                }
                else if(suffix == "png"){
                    res.writeHead(200, {"Content-Type": "image/png"});
                }
                else{
                    res.writeHead(200, {"Content-Type": "text/plane;charset=utf-8"});
                }
                res.write(data);
                res.end();
            }
        })
    }
}).listen(8083);

console.log("server is listening 8083");