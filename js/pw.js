const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DELTA = 1; // Граница выбора объектов (в градусах)
const LIMIT = 5;   // Ограничение на количество возвращаемых объектов

// document.getElementById("searchname").addEventListener("click",searchName);

main();

async function main() {
  let coords = await getLocation();
  // console.log(coords);
  let rect = createRect(coords, DELTA);
  // console.log(rect);
  let list = await getList(rect);
  console.log(list);
  let nearestAddr = findNearestAddress(coords, list);
  console.log(nearestAddr)
  let address = await getAddress(nearestAddr);
  showResults(coords, list, address);
}

// Получить текущее расположение

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords));
    } else {
      alert("Геолокация не поддерживается вашим браузером");
      reject();
    }
  });
}

// Создать квадрат для поиска вокруг адреса

function createRect(coords, delta) {
  return {
    lt_lat: coords.latitude - delta,
    lt_lng: coords.longitude - delta,
    rb_lat: coords.latitude + delta,
    rb_lng: coords.longitude + delta
  }
}

// Получить список навиадресов, находящихся в заданном квадрате

function getList(/*token, */rect) {
  return new Promise((resolve, reject) => {
    let url = new URL('https://staging-api.naviaddress.com/api/v1.5/Map');

    let params = {
      zoom: '17',
      address_type: 'event',
      //limit: LIMIT,
      lt_lat: rect.lt_lat,
      lt_lng: rect.lt_lng,
      rb_lat: rect.rb_lat,
      rb_lng: rect.rb_lng
    };
    url.search = new URLSearchParams(params);

    fetch(url).then((res1) =>
      res1.json().then((res2) => resolve(res2.result))
    );
  });
}

console.log(window.innerWidth);

async function searchName(querystr1,querystr2) {
  // e.preventDefault();
  let coords = await getLocation();
  if (window.innerWidth <= 1087) {
    querystr = querystr1;
    console.log("str: "+querystr)
  }
  else {
    querystr = querystr2;
    console.log("str: "+querystr)
  };
  // let querystr = document.getElementById('search-mobile').value;
  console.log('Search str: ' + querystr);
  let list = await searchList(coords, querystr);
  console.log('search' + list);
  clearResults('#events-main');
  showResults(coords, list);
}

function clearResults(cont) {
  $(cont).empty()
}

function searchList(coords, querystr) {
  return new Promise((resolve, reject) => {
    let url = new URL('https://staging-api.naviaddress.com/api/v1.5/Addresses/Search');
    let params = {
      address_type: 'event',
      zoom: 17,
      limit: LIMIT,
      querystr: querystr,
      lat: coords.latitude,
      lng: coords.longitude
    };
    url.search = new URLSearchParams(params);
    fetch(url).then((res1) =>
      res1.json().then((res2) => resolve(res2.result))
    );
  });
}

// Выбрать ближайший навиадрес

function findNearestAddress(coords, list) {
  list.sort((a, b) => distance(a) - distance(b));
  return list[0];

  function distance(el) {
    return Math.sqrt(Math.pow(el.point.lat - coords.latitude, 2)
      + Math.pow(el.point.lng - coords.longitude, 2));
  }
}

// Получить информацию по навиадресу

function getAddress(obj) {
  // console.log("OBJ"+ obj)
  return new Promise((resolve, reject) => {
    let url = 'https://staging-api.naviaddress.com/api/v1.5/Addresses/'
      + obj.container + '/' + obj.naviaddress;
    fetch(url.replace("#", "%23")).then((res1) =>
      res1.json().then((res2) => resolve(res2.result))
    );
  });
}


// Разбиваем array на части
// function chunk(arr, len) {

//   var chunks = [],
//       i = 0,
//       n = arr.length;

//   while (i < n) {
//     chunks.push(arr.slice(i, i += len));
//   }

//   return chunks;
// }

function imageCheck(val) {
  if (val == undefined)
    return "https://source.unsplash.com/random/640x320";
  else
    return val[0].image;
}
// javascript 

// I know this is absolutely stupid, but I want to sleep :,(
function dateCheck(val) {
  if (val === undefined)
    return ""
  else
    return val
}

function dateCheckN(val) {
  if (val === undefined)
    return "N"
  else
    return val
}

function dateCheckA(val) {
  if (val === undefined)
    return "A"
  else
    return val
}

function showEventTime(time) {
  if (time == undefined) {
    return "";
  }
  else {
    time = new Date(time);
    return [time.getDate(), monthNames[time.getMonth()], addZero(time.getHours()), addZero(time.getMinutes())];
  }
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function truncateString(str, length) {
  return str.length > length ? str.substring(0, length - 3) + '...' : str
}

// Отобразить результаты




function showResults(coords, list, address) {
  // console.log("list 0:"+list[0])
  // chunks = chunk(list,4);
  // console.log(newList);



  list.forEach(async function (item) {
    item = await getAddress(item)
    console.log("Item2: " + item)
    var start_time = showEventTime(item.event_start)
    var end_time = showEventTime(item.event_end)
    $(`<div class="column is-4">
      <div class="card">
        <div class="card-image">
          <figure class="image is-2by1">
            <img src=${imageCheck(item.cover)} alt="Placeholder image">
          </figure>
        </div>

        <div class="card-header">
          <p class="card-header-title is-centered title is-5">
            ${item.name}
          </p>
        </div>

        <div class="card-content">
          <div class="content">
            <p style="height: 200рх; overflow:hidden;">
            ${truncateString(item.description, 100)}
            </p>
          </div>

          <div class="columns is-mobile">
            <div class="column has-text-left" style="padding:0">
              <div class="content title is-7">
                <a href="">
                  <i class="material-icons" style="font-size: 19px; vertical-align: center;">place</i>
                  ${item.postal_address}
                </a>
              </div>
            </div>
          </div>

          <div class="columns is-mobile">
            <div class="column has-text-left is-3" style="padding-left:0; padding-right:0;">
              <p style="font-size:0.7rem; margin-top:12;">
                <br>
                <a href="">
                  <i class="material-icons">remove_red_eye</i>
                  ${item.count_views}
                </a>
              </p>
            </div>

            <div class="column has-text-centered is-3" style="padding-left:0; padding-right:0;">
              <p style="font-size:0.7rem; margin-top:12;">
                <br>
                <a href="">
                  <i class="far fa-star"></i>
                  ${item.count_favorites}
                </a>
              </p>
            </div>

            <div class="column has-text-right " style="padding-right:0">
              <time datetime="2018-09-26T00:00:38.2Z" class="title is-7">
                <p style="margin-bottom: 5;">
                  <b>Start</b>
                </p>
                <p>
                ${dateCheck(start_time[0])} ${dateCheck(start_time[1])}<br> ${dateCheckN(start_time[2])}:${dateCheckA(start_time[3])}
                </p>
              </time>
            </div>

            <div class="column has-text-right " style="padding-right:0">
              <time datetime="2018-09-27T00:00:38.2Z" class="title is-7">
                <p style="margin-bottom: 5;">
                  <b>End</b>
                </p>
                <p>
                ${dateCheck(end_time[0])} ${dateCheck(end_time[1])}<br> ${dateCheckN(end_time[2])}:${dateCheckA(end_time[3])}
                </p>
              </time>
            </div>
            
          </div>
        </div>
      </div>
    </div>`).appendTo("#events-main");
  })

}