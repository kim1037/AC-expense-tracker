# AC-expense-tracker

使用 Node.js + Express + MongoDB 製作記帳web app，使用者可以註冊帳號、登入，並查看、新增、編輯或刪除專屬該用戶的收支明細，另外使用了chart.js於首頁顯示費用圓餅圖。

可至此連結進行測試，[https://expense-tracker-dc00e409c72e.herokuapp.com/](https://expense-tracker-dc00e409c72e.herokuapp.com/) 

測試帳號 : user1@ac.com ， 密碼：12345678

## Screenshot - 畫面截圖

#### Login & Register Page

![image](https://user-images.githubusercontent.com/107454420/234933970-4fd625a3-64ac-4f50-95a4-1f6564cbd6e1.png)
![image](https://user-images.githubusercontent.com/107454420/234934118-3d5a73fb-8dab-41eb-a289-82bf93a6adcd.png)


#### 首頁 - 顯示收支明細、總計金額及費用圓餅圖
![image](https://user-images.githubusercontent.com/107454420/234933407-cff7b034-7b6b-4d76-85f0-8ef46341f443.png)
![image](https://user-images.githubusercontent.com/107454420/234933565-0e60f5f7-191d-46b0-884d-468f1d21df3f.png)

#### 新增頁面
![image](https://user-images.githubusercontent.com/107454420/234933829-d5480b10-205c-490d-aa83-c37bcb956987.png)

## Features - 功能

1. 使用者可以註冊帳號
2. 使用者可以登入查看自己的收支明細
3. 使用者可以透過第三方網站登入如google, facebook, github
4. 使用者可以新增一筆收支
5. 使用者可以編輯一筆收支
6. 使用者可以刪除一筆收支
7. 使用者可以透過下拉式選單選擇篩選收支的類別
8. 使用者可以透過下拉式選單選擇收支的排序方式
9. 使用者於登入時可勾選remember me 記憶帳號以便下一次登入。

## Prerequisites - 環境設置

- Node.js
- nodemon
- Express @4.16.4
- Bootstrap @5.1.3
- MongoDB


## Installation and execution - 安裝與執行步驟

1. 開啟 Terminal, Clone 此專案至本機:

```
git clone https://github.com/kim1037/AC-expense-tracker.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd AC_expense_tracker
```

3. 安裝所需套件 - 請參見 package.json

```
npm i [套件名稱]
```

4. 設置.env檔

請修改 `.env.example` 成 .env，並將內容改成您的資訊

請至[FACEBOOK](https://developers.facebook.com/apps)、[GOOGLE](https://console.cloud.google.com/)、[Github](https://github.com/settings/applications/new)設置密鑰。

5. 匯入種子檔案

```
npm run seed
```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫

> MongoDB connect success!
>
> done

6. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

7. 當 terminal 出現以下字樣，表示伺服器已啟動

> The server is running on http://localhost:3000
>
> MongoDB connect success!
