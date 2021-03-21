# 說明

請使用 Nuxt.js or Vue CLI 3 完成作業。

FrontEnd/index.html 是這次的考題，裡面有設計師給的規格，請依照設計師的設計，完成畫面。

開發時請將元素組件化，請盡情地發揮，展現出你的技術力！

附註：

- 除了規格外，也可以加上證明自己實力的東西。
- 請勿使用 CSS Framework ( Bootstrap, Foundation ... )，請手動排版。
- 請使用 JavaScript 或 TypeScript 撰寫。

## 加分項目

- 針對影片列表做 SEO 優化。
- Unit Testing
- End-to-End Testing
- 實作 Date Range 篩選功能，能以當地時區的日期區間，篩選發佈日期在此區間內的影片。此項目沒有 UI 畫面要求，可以搭配任意套件實作。
  - e.g. UTC+8 時區，影片發佈時間為 `2021-02-04T16:00:00+00:00`，篩選條件為 `2021-01-01T00:00:00+08:00 ~ 2021-02-04T23:59:59+08:00` 則不滿足此條件。

## 繳交期限及方式

請於收到信件的 **七日內** 完成，並提供 Github 或 Gitlab。

## 功能描述

透過 API 取得相關的影片資訊並將資訊呈現至頁面中。

## 上方篩選、排序功能列

- 為前端篩選及排序，無需經由 API 篩選及排序
- 排序可以從「發佈時間」、「觀看次數」、「收藏次數」中選擇一種，進行排序
- 長度篩選分別為「不限」、「4 分鐘以下」、「5 - 10 分鐘」、「超過 10 分鐘」，擇一進行篩選
- 沒有篩選結果時，請顯示「沒有篩選結果」
- 耳機 icon - [link](https://material.io/tools/icons/?search=headset&icon=headset&style=baseline)

## 頁面設計規格補充

- 全頁水平置中對齊 ( 最大寬度為 1366px )。
- 影片資訊卡定寬定高，每排最多 4 張，卡片間間距最小為 20px，若還有更多空間，請將卡片 **分散對齊** 。
- 卡片超出四張或頁面寬度不足以容納四張，請 **自動換行** 至下一行。
- 滑鼠經過每張卡片時，請將影片縮圖放大 10%，放大過程需漸變。( 影片圖片不可露出黑邊 )
- 影片標題最多為兩行。
- RWD。

## API 規格

- Endpoint: `https://us-central1-lithe-window-713.cloudfunctions.net/frontendQuiz`
- Method: GET
- Response

```json
{
  "status": true,
  "data": [
    {
      "id": 52250,
      "thumbnail": "https://cdn.voicetube.com/assets/thumbnails/QxjsWwgPjwM.jpg",
      "title": "台北人英文真的超強？這部影片告訴你！(中英字幕) (Do They Speak English In Taiwan?)",
      "views": 526816,
      "collectCount": 200,
      "duration": 316,
      "publishedAt": "2021-02-04T03:00:00+00:00",
      "level": 1,
      "captions": [
        "cht",
        "ja",
        "vi",
        "en"
      ]
    }
  ]
}
```

|欄位|型態|說明|
|--|--|--|
|id| Number | 影片序號|
|thumbnail|String|影片縮圖|
|title|String|影片標題|
|views|Number|影片觀看人數|
|collectCount|Number|影片收藏人數|
|duration|Number|片長 (s)|
|TedAt|String|發佈時間|
|level|Number|影片程度 ( 1: 初級、2: 中級、3: 中高級、4: 高級 )|
|captions|Array|影片字幕 ( cht: 中文、ja: 日文、vi: 越南文、en: 英文 )
