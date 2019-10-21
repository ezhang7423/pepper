const axios = require('axios');
const cheerio = require('cheerio');
const store = require("./store.js")

const urls = ["https://github.com/44A44", "https://github.com/a-vinod", "https://github.com/aaroncross202", "https://github.com/Adarsha58", "https://github.com/aeshapar", "https://github.com/aezhao065", "https://github.com/akelkordy", "https://github.com/AlejandroRR16", "https://github.com/alexmeigz", "https://github.com/alfredmchen", "https://github.com/alonkatzcs", "https://github.com/Alsoro", "https://github.com/andrewpengucsb", "https://github.com/angelinagrace2", "https://github.com/AnishaKabir", "https://github.com/annabellezzy", "https://github.com/anqi0420", "https://github.com/anqilin11", "https://github.com/Anshuman-UCSB", "https://github.com/antguzman636", "https://github.com/Anthonypella", "https://github.com/aprilsanchez", "https://github.com/arielyhsieh", "https://github.com/ashleshag", "https://github.com/Atziry-M", "https://github.com/austinmacmath", "https://github.com/banannago", "https://github.com/BenLuong", "https://github.com/bennytrac", "https://github.com/bernardogonzalez01",
"https://github.com/Bernstern", "https://github.com/Bluuuumo", "https://github.com/bryanaxu", "https://github.com/Bryanz2019", "https://github.com/buhraian", "https://github.com/calvitronic", "https://github.com/carolinehhuang", "https://github.com/cerulity", "https://github.com/chaewon-shin", "https://github.com/CharityHsu", "https://github.com/Charlie0916", "https://github.com/Chasewu123", "https://github.com/chenlin28", "https://github.com/Chihlun", "https://github.com/Christine-ong", "https://github.com/ChristineOng01", "https://github.com/christopherbarnett", "https://github.com/chucklesbao", "https://github.com/cilense", "https://github.com/CL6385", "https://github.com/claystern", "https://github.com/cliffordxu", "https://github.com/connorrapelje", "https://github.com/cpmckim", "https://github.com/cs126", "https://github.com/d-x-lin", "https://github.com/DaisyWang526", "https://github.com/DanielEskander", "https://github.com/darrenchou1", "https://github.com/davisr2124",
"https://github.com/DawitAboye", "https://github.com/DengxianYang", "https://github.com/dianamendezramos", "https://github.com/dibamirza", "https://github.com/DLohn", "https://github.com/dragonslayerintraining", "https://github.com/drzevia", "https://github.com/dshamtob", "https://github.com/eliotlipszyc", "https://github.com/EmilyyyLee", "https://github.com/encombhat", "https://github.com/esieng", "https://github.com/ezhang7423", "https://github.com/felixxyang", "https://github.com/gdx6666", "https://github.com/gracehsu2000", "https://github.com/hdinh77", "https://github.com/henriquedaponte", "https://github.com/hhu00", "https://github.com/hjhcharles66", "https://github.com/hmei97", "https://github.com/holdensmith30", "https://github.com/Hu-TianRui", "https://github.com/hunterlhxlin", "https://github.com/ishtiyaque", "https://github.com/ivangvozdanovic", "https://github.com/J-Miller1", "https://github.com/jake-garcia", "https://github.com/Jarmstrong845", "https://github.com/jasonpjackson",
"https://github.com/jasunchen", "https://github.com/jay-red", "https://github.com/Jay145", "https://github.com/jdgarcia-cs", "https://github.com/Jechen27", "https://github.com/jianingsong97", "https://github.com/jiaqili980919", "https://github.com/jiaxianhu", "https://github.com/jijeon-sh", "https://github.com/JohnK-mi", "https://github.com/JohnnJudge", "https://github.com/josephquiroz23", "https://github.com/joshuavilela", "https://github.com/julianstevenbt", "https://github.com/junshuzhou", "https://github.com/jvoucsb", "https://github.com/jwangathan", "https://github.com/kenny-wang6", "https://github.com/khalidmihlar", "https://github.com/khoang1800", "https://github.com/kjin883", "https://github.com/konman2", "https://github.com/ksbenipal", "https://github.com/kunalhandaUCSB", "https://github.com/LeahhLi", "https://github.com/liaaaaran", "https://github.com/litingchu", "https://github.com/louieUCSB", "https://github.com/loypham", "https://github.com/LucienLuc",
"https://github.com/luongeric", "https://github.com/magiejen", "https://github.com/MangoSister", "https://github.com/markoristicc", "https://github.com/MattReddick", "https://github.com/MaxwellJung", "https://github.com/mdeirossi", "https://github.com/mialicew", "https://github.com/micahzmorales", "https://github.com/michaelwyl", "https://github.com/missmiss20", "https://github.com/mitchellrapaport", "https://github.com/mjang13935", "https://github.com/mmunozvaltierra", "https://github.com/Mohamed-Abdelmaksoud", "https://github.com/msantiago35", "https://github.com/mziontz", "https://github.com/Naiyu-niu", "https://github.com/NanokaHiya", "https://github.com/NathanWoo", "https://github.com/nicholasbrown1", "https://github.com/nickrryan", "https://github.com/NickWang11235", "https://github.com/nikkityagi", "https://github.com/nlxj", "https://github.com/nmagallanesfloress", "https://github.com/norayousuf", "https://github.com/olonkar29", "https://github.com/paritoshjha24", "https://github.com/Peake2",
"https://github.com/phtcon", "https://github.com/pranav01acharya", "https://github.com/PureDreamerGk", "https://github.com/qianyouwang", "https://github.com/R-Kolhatkar", "https://github.com/RaghubirChimni", "https://github.com/rainaalee", "https://github.com/rbapat100", "https://github.com/ReneeWan", "https://github.com/Richard-Rao", "https://github.com/risheekm", "https://github.com/rmenon121", "https://github.com/ronvechter", "https://github.com/rowantran", "https://github.com/ruijuefu", "https://github.com/rutvikjha", "https://github.com/ryanmosalem", "https://github.com/sarahkwon", "https://github.com/scsampath", "https://github.com/sebastiannaibaho", "https://github.com/shouc", "https://github.com/SiavashKeivani", "https://github.com/silhouette8", "https://github.com/simonfookyu", "https://github.com/Siyang-Li", "https://github.com/skiteskopes", "https://github.com/sonalimayer1", "https://github.com/songhaoliu", "https://github.com/soohyunchoi", "https://github.com/sophiacheng01",
"https://github.com/sriya112", "https://github.com/sshanley", "https://github.com/stephaniesimon1998", "https://github.com/stevenpan00", "https://github.com/stevenvalvarez", "https://github.com/strongwar", "https://github.com/surendraGh", "https://github.com/SypherXN", "https://github.com/taylorschultz", "https://github.com/TheBestestGuestest", "https://github.com/TheoSBafrali", "https://github.com/thepancakesman", "https://github.com/thiskappaisgrey", "https://github.com/ttdiep", "https://github.com/Tuckwilliger", "https://github.com/ucsb-cs16-shitong", "https://github.com/ucsb-hs", "https://github.com/vinceqyh", "https://github.com/virpathak", "https://github.com/vmreed1", "https://github.com/WangHaoranRobin", "https://github.com/wanqingliu", "https://github.com/Weixuanucsb", "https://github.com/wenjingl1101", "https://github.com/xilin4239", "https://github.com/xinlin991010", "https://github.com/xinyizhang666", "https://github.com/yi-hsien", "https://github.com/yifanpan2023", "https://github.com/yiyaoli98",
"https://github.com/yongzhenjin", "https://github.com/yuheho7749", "https://github.com/yunqizhang85", "https://github.com/yuxinzhang0311", "https://github.com/yuyuechen", "https://github.com/Yvonneliu0201", "https://github.com/yyamazaki1205", "https://github.com/Yzccc3", "https://github.com/zhugema", "https://github.com/zixuanpeng99"]



urls.forEach((url) => {
    axios.get(url)
        .then(res => {
            const $ = cheerio.load(res.data)
            contributions = $(".f4.text-normal.mb-2")
            store.writeContributions(url)
        })
        .catch(err => {
            console.log(err);
        })
})
