# kodik-video-links
Получение ссылок на m3u8-плейлисты с базы Kodik 

## Установка
```bash
git clone https://github.com/EdemBey/kodik-video-links.git
cd kodik-video-links
pnpm install
```
## Запуск

### Через ts-node
```bash
npx ts-node src/server.ts
```

### Через scripts
```bash
PORT=1234 pnpm run start
```

## Методы

## • parse
Парсинг ссылки
```js
GET /parse
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
link | string | Ссылка на серию / фильм с базы Kodik |
extended | boolean | Дополнительные поля | false

### Примеры запросов
```
/parse?link=http://kodik.cc/video/19850/6476310cc6d90aa9304d5d8af3a91279/720p
```
```
/parse?link=http://aniqit.com/seria/538868/cd8113b0efb75a204cb2777a3e098cda/720p&extended
```

### Примеры ответов
```json
{
  "ok": true,
  "data": {
    "protocol": "http",
    "type": "seria",
    "id": "538868",
    "hash": "cd8113b0efb75a204cb2777a3e098cda",
    "quality": "720"
  }
}
```
```json
{
  "ok": true,
  "data": {
    "protocol": "http",
    "type": "seria",
    "id": "538868",
    "hash": "cd8113b0efb75a204cb2777a3e098cda",
    "quality": "720",
    "d": "kodik.cc",
    "d_sign": "9945930febce35101e96ce0fe360f9729430271c19941e63c5208c2f342e10ed",
    "pd": "aniqit.com",
    "pd_sign": "716d0963074fd798baeda496497e185ae65a539e726a0db11ffd49e615aab73b",
    "ref_sign": "208d2a75f78d8afe7a1c73c2d97fd3ce07534666ab4405369f4f8705a9741144",
    "ref": ""
  }
}
```
***

## • video-links
Получение ссылок на видео
```js
GET /video-links
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
link | string | Ссылка на серию / фильм с базы Kodik |
extended | boolean | Дополнительные поля(распаршенные параметры) | false

### Примеры запросов
```
/video-links?link=http://kodik.cc/video/19850/6476310cc6d90aa9304d5d8af3a91279/720p
```
```
/video-links?link=http://aniqit.com/seria/538868/cd8113b0efb75a204cb2777a3e098cda/720p&extended
```

### Примеры ответа
```json
{
  "ok": true,
  "data": {
    "links": {
      "360": [
        {
          "src": "//cloud.kodik-storage.com/useruploads/f6bcbf58-4a96-462d-b013-1e6c2fbb0bf7/ede72c81a02c8c52f0d17c32ffafe3a5:2022020610/360.mp4:hls:manifest.m3u8",
          "type": "application/x-mpegURL"
        }
      ],
      "480": [
        {
          "src": "//cloud.kodik-storage.com/useruploads/f6bcbf58-4a96-462d-b013-1e6c2fbb0bf7/ede72c81a02c8c52f0d17c32ffafe3a5:2022020610/480.mp4:hls:manifest.m3u8",
          "type": "application/x-mpegURL"
        }
      ],
      "720": [
        {
          "src": "//cloud.kodik-storage.com/useruploads/f6bcbf58-4a96-462d-b013-1e6c2fbb0bf7/ede72c81a02c8c52f0d17c32ffafe3a5:2022020610/720.mp4:hls:manifest.m3u8",
          "type": "application/x-mpegURL"
        }
      ]
    }
  }
}
```
```json
{
  "ok": true,
  "data": {
    "params": {
      "protocol": "http",
      "info": "{}",
      "ban_user": false,
      "type": "video",
      "id": "19850",
      "hash": "6476310cc6d90aa9304d5d8af3a91279",
      "d": "kodik.cc",
      "d_sign": "9945930febce35101e96ce0fe360f9729430271c19941e63c5208c2f342e10ed",
      "pd": "kodik.cc",
      "pd_sign": "9945930febce35101e96ce0fe360f9729430271c19941e63c5208c2f342e10ed",
      "ref_sign": "208d2a75f78d8afe7a1c73c2d97fd3ce07534666ab4405369f4f8705a9741144",
      "ref": ""
    },
    "links": {
      "240": [
        {
          "src": "https://cloud.kodik-cdn.com/movies/9c4890024a022aaadf47422d5d0dbb75a3c27eeb/b082153774c1ee9cad716ff7f313652a:2022020610/240.mp4:hls:manifest.m3u8",
          "type": "application/x-mpegURL"
        }
      ],
      "360": [
        {
          "src": "https://cloud.kodik-cdn.com/movies/9c4890024a022aaadf47422d5d0dbb75a3c27eeb/b082153774c1ee9cad716ff7f313652a:2022020610/360.mp4:hls:manifest.m3u8",
          "type": "application/x-mpegURL"
        }
      ],
      "480": [
        {
          "src": "https://cloud.kodik-cdn.com/movies/9c4890024a022aaadf47422d5d0dbb75a3c27eeb/b082153774c1ee9cad716ff7f313652a:2022020610/480.mp4:hls:manifest.m3u8",
          "type": "application/x-mpegURL"
        }
      ],
      "720": [
        {
          "src": "https://cloud.kodik-cdn.com/movies/9c4890024a022aaadf47422d5d0dbb75a3c27eeb/b082153774c1ee9cad716ff7f313652a:2022020610/720.mp4:hls:manifest.m3u8",
          "type": "application/x-mpegURL"
        }
      ]
    }
  }
}
```

***


## • all-dubs
Получение ссылок на альтернативные озвучки/субтитры
```js
GET /all-dubs
```


### Примеры запросов
```
/all-dubs?link=http://kodik.biz/video/80472/2763ceff125af0118e3a1d498a5d91bb/720p
```
```
/all-dubs?link=http://kodik.biz/season/64603/f3cbcdd745a3994c72502f62f4ef616f/720p
```

### Примеры ответа
```json
{
  "ok": true,
  "data": [
    [
      {
        "title": "AniFame",
        "translationType": "voice",
        "videoLink": "http://kodik.biz/video/80472/2763ceff125af0118e3a1d498a5d91bb/720p"
      },
      {
        "title": "AniFilm",
        "translationType": "voice",
        "videoLink": "http://kodik.biz/video/57216/db2d71f77ee321319c3a2ea73b567b3c/720p"
      },
      {
        "title": "AniLibria.TV",
        "translationType": "voice",
        "videoLink": "http://kodik.biz/video/63224/14df471efcd7c11a251d2b8a2d2aff09/720p"
      },
      {
        "title": "AniStar Многоголосый",
        "translationType": "voice",
        "videoLink": "http://kodik.biz/video/45156/57026f64e6aa3b62ee9c007549e5c8a2/720p"
      },
      {
        "title": "Субтитры",
        "translationType": "subtitles",
        "videoLink": "http://kodik.biz/video/47682/baf86bf283c79c9913672866e9968653/720p"
      }
    ]
  ]
}
```

```json
{
  "ok": true,
  "data": [
    [
      {
        "title": "Ancord",
        "translationType": "voice",
        "episodesList": [
          [
            {
              "title": "1 серия",
              "videoLink": "http://kodik.biz/seria/283239/582f93970b237b069b1d78ce3e10ea32/720p"
            },
            {
              "title": "2 серия",
              "videoLink": "http://kodik.biz/seria/283240/c2f65dd640e88cce12e77de384a00d45/720p"
            
            }
          ]
        ]
      },
      {
        "title": "GrandStudio",
        "translationType": "voice",
        "episodesList": [
          [
            {
              "title": "1 серия",
              "videoLink": "http://kodik.biz/seria/1158293/1f0a889a3f7ebc513b99c37c8d705d25/720p"
            },
            {
              "title": "2 серия",
              "videoLink": "http://kodik.biz/seria/1159198/1ba6a85c0aa897b6f1c3596fee14beea/720p"
            },
            {
              "title": "3 серия",
              "videoLink": "http://kodik.biz/seria/1165661/7df566b943a9870a2997031403a35ac2/720p"
            }
          ]
        ]
      }
    ]
  ]
}
```

## Credits

[neverlane from thedvxchsquad](https://github.com/thedvxchsquad) 2022 - ?
