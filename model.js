// 早餐清單
const breakfast_list = [
    "漢堡", "饅頭", "燒餅油條", "飯糰", "吐司", "果醬厚片", "蛋餅", "麵包", "包子", "水煎包", "咖啡店", "速食店", "便利商店", "小籠包"
];

// 午餐清單
const lunch_list = [
    "鐵板燒", "鍋燒麵", "燒臘便當", "雞腿便當", "便當", "速食店", "湯麵", "水餃", "控肉飯", "滷味", "肉圓", "甜不辣", "麵線羹", "水煎包"
];

// 晚餐清單
const dinner_list = [
    "臭豆腐", "鹽水雞", "雞排", "滷味", "便當", "沙威瑪", "水餃", "刈包", "炸物", "肉圓", "甜不辣", "水煎包", "湯麵", "速食店", "牛排", "韓式美食", "泰式美食", "港式美食", "越式美食"
];

// 餐點清單
let mealsList = [];

// 獲取下拉列表元素
const dropdown = document.getElementById("meals");

// 獲取顯示所選項目的元素
const eatItem = document.getElementById("eatItem");

// 是否已符合目前時間做更改
let isChange = false;

// 取得日期字串
function get_nowDate() {
    const newDateTime = new Date;
    const year = newDateTime.getFullYear().toString();
    const month = (newDateTime.getMonth() +1).toString().padStart(2, '0');
    const date = newDateTime.getDate().toString().padStart(2, '0');
    const nowDate = `${year} / ${month} / ${date}`;

    return nowDate;
}

// 取得時間字串
function get_nowTime() {
    const newDateTime = new Date;
    const hours = newDateTime.getHours().toString().padStart(2, '0');
    const minutes = newDateTime.getMinutes().toString().padStart(2, '0');
    const seconds = newDateTime.getSeconds().toString().padStart(2, '0');
    const nowTime = `${hours}:${minutes}:${seconds}`;

    return nowTime;
}

// 依時間更改 ddl 下拉
function change_DdlTimeMeals() {
    if (dropdown instanceof HTMLSelectElement) {
        const newDateTime = new Date;
        const hours = newDateTime.getHours();
        const minutes = newDateTime.getMinutes();
        const seconds = newDateTime.getSeconds();

        // 在指定時間取得是否已完成更新
        if (hours === 11 && minutes === 0 && seconds === 0) {
            isChange = false;
        } else if (hours === 17 && minutes === 0 && seconds === 0) {
            isChange = false;
        } else if (hours === 23 && minutes === 0 && seconds === 0) {
            isChange = false;
        }

        if ((hours >= 11 && minutes >= 0 && seconds >= 0) && (hours <= 16 && minutes <= 59 && seconds <= 59)) {
            if (isChange === false) {
                dropdown.value = "lunch"
                get_eatItem();
            }
    
        } else if ((hours >= 17 && minutes >= 0 && seconds >= 0) && (hours <= 22 && minutes <= 59 && seconds <= 59)) {
            if (isChange === false) {
                dropdown.value = "dinner"
                get_eatItem();
            }

        } else if ((hours === 23 && minutes >= 0 && seconds >= 0) || (hours <= 10 && minutes <= 59 && seconds <= 59)) {
            if (isChange === false) {
                dropdown.value = "breakfast"
                get_eatItem();
            }
        }
    }
}

// 餐點清單轉換
function change_mealList(mealsVal) {
    if (mealsVal === "breakfast") {
        mealsList = breakfast_list
    }

    if (mealsVal === "lunch") {
        mealsList = lunch_list
    }

    if (mealsVal === "dinner") {
        mealsList = dinner_list
    }

    return mealsList;
}

// 取得隨機餐點
function random_meals(select_meals) {
    let randomFortune = select_meals[Math.floor(Math.random() * select_meals.length)];
    return randomFortune;
}

// 顯示時間
function view_dateTime() {
    let p_nowDate = document.getElementById("nowDate")
    if (p_nowDate) {
        p_nowDate.textContent = get_nowDate();
    }

    let p_nowTime = document.getElementById("nowTime")
    if (p_nowTime) {
        p_nowTime.textContent = get_nowTime();
    }

    change_DdlTimeMeals();
}

// 顯示隨機餐點項目
function get_eatItem() {
    if (dropdown instanceof HTMLSelectElement) {
        mealsList = change_mealList(dropdown.value);
        isChange = true;
    }
    
    if (eatItem) {
        eatItem.textContent = random_meals(mealsList);
    }
}

// 每 1 秒刷新時間
setInterval(view_dateTime, 1000);

// 預設
view_dateTime();
get_eatItem();