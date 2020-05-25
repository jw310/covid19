$(".navbar-toggler").click(function () {
    $(".navbar").toggleClass('navbar-toggle')
})


const markersData = [
    {
        "latLng": [25.0338489, 121.5645294],
        "name": "台北101"
    },
]

// let names = {};
// $.each(mapdata, function (index, item) {
//     names[item.id] = item.province;
// });


let mapdata = {}


function map () {
    $('#map').vectorMap({
        map: 'world_mill',
        backgroundColor: '#534847',
        // 區域樣式
        regionStyle: {
            initial: {
                fill: "#FFEEE4",
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            },
            hover: {
                fill: "#EFDC05"
            },
            selected: {
                fill: "#00BFFF"
            },
            selectedHover: {
            }
        },
        // // 地標
        // markers: markersData,
        // // 標記樣式
        // markerStyle: {
        //     initial: {
        //     },
        //     hover: {
        //     },
        //     selected: {
        //     },
        //     selectedHover: {
        //     }
        // },
        series: {
            // 分區資料、樣式
            regions: [{
                values: gdpData,
                scale: ['#C8EEFF', '#0071A4'],
                normalizeFunction: 'polynomial'
            }]
        },
        // 標籤
        // labels: {
        //     // regions: {
        //     //     render: function (code) {
        //     //         return names[code];
        //     //     }
        //     // }
        // },
        hoverOpacity: 0.7,
        hoverColor: false,
        // 滑鼠經過區域時觸發說明 code 是鼠標當前的索引值(縮寫國名)，可用來取得資料。要用 var 來宣告，不然會有問題
        onRegionTipShow: function (e, el, code) {
            // console.log(code)
            // 轉換成小寫
            var lowerCaseCode = code.toLowerCase();
            // console.log(code)
            // 取得 map-legend 的 html 內容之後複製(地圖說明的樣板)
            var node = $($('[id=map-legend]').html()).clone();
            // var country = mapdata[code];

            /* 處理 template 資料跟建立 HTML 內容 */
            // attr 設定屬性值
            node.find('.national-flag').attr('src', 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/' + lowerCaseCode + '.svg')
            node.find('.country').text(code || el.html());

            node.find('.confirmed').text('Unknown');
            node.find('.critical').text('Unknown');
            node.find('.deaths').text('Unknown');
            node.find('.recovered').text('Unknown');
            node.find('.active').text('Unknown');

            // 將元素的 html 內容換成樣板內容
            el.html(node.html());
        },
    });
}