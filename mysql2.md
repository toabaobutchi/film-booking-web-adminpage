# MySQL2

## MySQL2 là gì ?

Đây là package giúp thao tác với cơ sở dữ liệu MySQL trong Node.js. No tập trung vào cải tiến hiệu năng, hỗ trợ Prepared Statement và các tính năng khác.

MySQL2 không phải là **ORM Framework** ! Nó tương tác với cơ sở dữ liệu theo cơ chế Raw SQL (hay SQL Native). 

=> Để sử dụng MySQL2 cần có hiểu biết về câu lệnh SQL nhất định.

## Cài đặt

```bash
npm install mysql2
```

## Kết nối MySQL

Có 2 cách để thao tác với MySQL2:

- Callback:

```js
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dbname',
});
```

- Promise (Bất đồng bộ)

```js
// sử dụng trong module
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
});
```



