export default class LastMayday {
  palette(url,name,id,joinTime,avatarUrl) {
    return ({
      "width": "600px",
      "height": "1299px",
      "background": "#f8f8f8",
      "views": [{
          "type": "image",
          "url": url,
          "css": {
            "width": "600px",
            "height": "1299px",
            "top": "0px",
            "left": "0px",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "mode": "scaleToFill"
          }
        },
        {
          "type": "text",
          "text": name,
          "css": {
            "color": "#000000",
            "background": "rgba(0,0,0,0)",
            "width": "200px",
            "height": "50.04999999999999px",
            "top": "951px",
            "left": "208px",
            "rotate": "0",
            "borderColor": "#000000",
            "padding": "0px",
            "fontSize": "35px",
            "fontWeight": "bold",
            "maxLines": "2",
            "lineHeight": "50px",
            "textStyle": "fill",
            "textAlign": "left"
          }
        },
        {
          "type": "text",
          "text": "为蓝时间：" + formatDate(joinTime),
          "css": {
            "color": "#000000",
            "background": "rgba(0,0,0,0)",
            "width": "400px",
            "height": "35.74999999999999px",
            "top": "1047px",
            "left": "208px",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0px",
            "fontSize": "25px",
            "fontWeight": "bold",
            "maxLines": "2",
            "lineHeight": "36.07500000000001px",
            "textStyle": "fill",
            "textDecoration": "none",
            "fontFamily": "",
            "textAlign": "left"
          }
        },
        {
          "type": "text",
          "text": "为蓝ID：" + id,
          "css": {
            "color": "#000000",
            "background": "rgba(0,0,0,0)",
            "width": "200px",
            "height": "35.74999999999999px",
            "top": "1006px",
            "left": "208px",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0px",
            "fontSize": "25px",
            "fontWeight": "bold",
            "maxLines": "2",
            "lineHeight": "36.07500000000001px",
            "textStyle": "fill",
            "textDecoration": "none",
            "fontFamily": "",
            "textAlign": "left"
          }
        },
        {
          "type": "image",
          "url": avatarUrl,
          "css": {
            "width": "130px",
            "height": "130px",
            "top": "950px",
            "left": "63px",
            "rotate": "0",
            "borderRadius": "150px",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "mode": "scaleToFill"
          }
        }
      ]
    });
  }
}

// 时间戳转换方法    date:时间戳数字
function formatDate (d) {
  var date = new Date(d * 1)
  var YY = date.getFullYear() + '/'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ''
  return YY + MM + DD + ' ' + hh + mm
}