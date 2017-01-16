let calendar_data = require('config.js').calendar_data

let today = new Date();
let iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

function random(dayseed, indexseed) {
	var n = dayseed % 11117;
	for (var i = 0; i < 100 + indexseed; i++) {
		n = n * n;
		n = n % 11117;   // 11117 是个质数
	}
	return n;
}

function is_someday() {
	return today.getMonth() == 5 && today.getDate() == 4;
}

function star(num) {
	var result = "";
	var i = 0;
	while (i < num) {
		result += "★";
		i++;
	}
	while(i < 5) {
		result += "☆";
		i++;
	}
	return result;
} 

// 去掉一些不合今日的事件
function filter(activities) {
    var result = [];
    
    // 周末的话，只留下 weekend = true 的事件
    if (isWeekend()) {
        
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].weekend) {
                result.push(activities[i]);
            }
        }
        
        return result;
    }
    
    return activities;
}

function isWeekend() {
    return today.getDay() == 0 || today.getDay() == 6;
}

// 添加预定义事件
function pickSpecials() {
	var specialSize = [0,0];
	
	for (var i = 0; i < calendar_data.specials.length; i++) {
		var special = calendar_data.specials[i];
		
		if (iday == special.date) {
			if (special.type == 'good') {
				specialSize[0]++;
				addToGood({name: special.name, good: special.description});
			} else {
				specialSize[1]++;
				addToBad({name: special.name, bad: special.description});
			}
		}
	}
	
	return specialSize;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(activities, size) {
	var picked_events = pickRandom(activities, size);
	
	for (var i = 0; i < picked_events.length; i++) {
		picked_events[i] = parse(picked_events[i]);
	}
	
	return picked_events;
}

// 从数组中随机挑选 size 个
function pickRandom(array, size) {
	var result = [];
	
	for (var i = 0; i < array.length; i++) {
		result.push(array[i]);
	}
	
	for (var j = 0; j < array.length - size; j++) {
		var index = random(iday, j) % result.length;
		result.splice(index, 1);
	}
	
	return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
	var result = {name: event.name, good: event.good, bad: event.bad};  // clone
	
	if (result.name.indexOf('%v') != -1) {
		result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
	}
	
	if (result.name.indexOf('%t') != -1) {
		result.name = result.name.replace('%t', calendar_data.tools[random(iday, 11) % calendar_data.tools.length]);
	}
	
	if (result.name.indexOf('%l') != -1) {
		result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
	}
	
	return result;
}

function genTodayString() {
	return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + calendar_data.weeks[today.getDay()];
}

// 生成今日运势
function genTodayLuck() {
  var _activities = filter(calendar_data.activities);
    
	var numGood = random(iday, 98) % 3 + 2;
	var numBad = random(iday, 87) % 3 + 2;
	var eventArr = pickRandomActivity(_activities, numGood + numBad);
	
	var specialSize = pickSpecials();
	let goods = []
	for (var i = 0; i < numGood; i++) {
		goods.push({title: eventArr[i].name, description: eventArr[i].good})
	}
	let bads = []
	for (var i = 0; i < numBad; i++) {
        bads.push({title: eventArr[numGood + i].name, description: eventArr[numGood + i].bad})
	}
    return {goods: goods, bads: bads}
}

function genDirection() {
    let index = random(iday, 2) % calendar_data.directions.length
    return calendar_data.directions[index]
}

function genGirlsIndex() {
    return star(random(iday, 6) % 5 + 1)
}

function genDrinks() {
    return pickRandom(calendar_data.drinks, 2).join('，')
}

module.exports.genTodayString = genTodayString
module.exports.genTodayLuck = genTodayLuck
module.exports.genDirection = genDirection
module.exports.genGirlsIndex = genGirlsIndex
module.exports.genDrinks = genDrinks