define({ "api": [
  {
    "type": "get",
    "url": "/illustDetail",
    "title": "Pixiv日排行榜",
    "name": "GetIllustDetail",
    "group": "pixiv",
    "description": "<p><a href=\"https://lit-brushlands-42343.herokuapp.com/illustDetail?size=original\">https://lit-brushlands-42343.herokuapp.com/illustDetail?size=original</a></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "size",
            "description": "<p>图片的大小 &quot;squareMedium&quot; | &quot;medium&quot; | &quot;large&quot; | &quot;original&quot;</p>"
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
    "title": "Pixiv日排行榜 json数据",
    "name": "GetIllustDetailREST",
    "group": "pixiv",
    "sampleRequest": [
      {
        "url": "https://lit-brushlands-42343.herokuapp.com/slideshow"
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
  },
  {
    "type": "get",
    "url": "/slideshow",
    "title": "Pixiv幻灯片",
    "name": "GetSlideshow",
    "group": "pixiv",
    "description": "<p><a href=\"https://lit-brushlands-42343.herokuapp.com/slideshow\">https://lit-brushlands-42343.herokuapp.com/slideshow</a></p>",
    "version": "0.0.0",
    "filename": "src/middlewares/index.ts",
    "groupTitle": "pixiv"
  },
  {
    "type": "get",
    "url": "/pximg",
    "title": "Pixiv图片代理",
    "name": "getPximg",
    "group": "pixiv",
    "description": "<p><a href=\"https://lit-brushlands-42343.herokuapp.com/pximg?src=https://i.pximg.net/img-original/img/2017/04/05/00/00/02/62258773_p0.png\">https://lit-brushlands-42343.herokuapp.com/pximg?src=https://i.pximg.net/img-original/img/2017/04/05/00/00/02/62258773_p0.png</a></p>",
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
        "url": "https://lit-brushlands-42343.herokuapp.com/slideshow"
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
