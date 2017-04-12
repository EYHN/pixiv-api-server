define({ "api": [
  {
    "type": "get",
    "url": "/slideshow",
    "title": "Pixiv日排行榜",
    "name": "GetIllustDetail",
    "group": "pixiv",
    "version": "0.0.0",
    "filename": "src/middlewares/index.ts",
    "groupTitle": "pixiv"
  },
  {
    "type": "POST",
    "url": "/slideshow",
    "title": "Pixiv日排行榜 json数据",
    "name": "GetIllustDetailREST",
    "group": "pixiv",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>json数据.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/middlewares/index.ts",
    "groupTitle": "pixiv"
  },
  {
    "type": "get",
    "url": "/slideshow",
    "title": "Pixiv幻灯片",
    "name": "GetSlideshow",
    "group": "pixiv",
    "version": "0.0.0",
    "filename": "src/middlewares/index.ts",
    "groupTitle": "pixiv"
  },
  {
    "type": "get",
    "url": "/pximg",
    "title": "Pixiv图片反向代理",
    "name": "getPximg",
    "group": "pixiv",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "src",
            "description": "<p>图片的链接.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/middlewares/index.ts",
    "groupTitle": "pixiv"
  },
  {
    "type": "POST",
    "url": "/slideshow",
    "title": "Pixiv幻灯片 json数据",
    "name": "getPximgREST",
    "group": "pixiv",
    "sampleRequest": [
      {
        "url": "https://lit-brushlands-42343.herokuapp.com/pximg"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>json数据.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/middlewares/index.ts",
    "groupTitle": "pixiv"
  }
] });
