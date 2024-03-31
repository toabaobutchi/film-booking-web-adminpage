# Các nghiệp vụ của trang admin

## Khi thêm một phim

Dữ liệu cần có để thêm một bộ phim: Tên, thời lượng, ngôn ngữ, diễn viên, đạo diễn, rated, ngày chiếu, ...

Khi nhập ảnh, có thể có 2 lựa chọn (có thể chọn thông qua radio button): Nhập URL ảnh hoặc chọn tải tệp từ máy tính.

Server: Kiểm tra giá trị của radio button để quyết định xem hành vi lưu ảnh.

## Khi thêm (các) suất chiếu cho một phim

-   Chọn phim cần tạo suất chiếu > Chọn **Tạo suất chiếu**.

-   Chọn ngày đặt suất chiếu.

-   Hiển thị tất cả các phòng cùng với (các) suất chiếu có thể tạo của phòng đó.

-   Loại bỏ các suất chiếu chiếm thời gian trên suất chiếu đã có sẵn.

**Vấn đề:** Làm sao để tính toán được các suất chiếu **có thể có** trong ngày đó.

**_Bước 1_**: Giả sử ban đầu không có suất chiếu nào. Ta tính được dãy các suất chiếu có thể có từ E giờ đến F giờ (E, F là mốc thời gian mà rạp phim mở và đóng cửa).

```js
// viết hàm lấy thời gian trong ngày
function getAfterTime(startDateTime, timeInMinute) {
    const miliseconds = timeInMinute * 60 * 1000
    const result = new Date(startDateTime.getTime() + miliseconds)

    return {
        date: result,
        getString() {
            return result.toTimeString().slice(0, 5)
        },
    }
}

function getXuatChieus(date = new Date(), time = 60, initTime = 7) {
    date = new Date(date.setHours(initTime))
    date.setMinutes(0)

    let current = { date }

    let sets = [
        // giá trị khởi tạo
        {
            ...current,
            getString() {
                return `0${initTime}:00`
            },
        },
    ]

    while (current.date.getHours() < 23) {
        // vãn còn trong ngày
        current = getAfterTime(current.date, time)
        sets.push(current)
    }
    return sets
}
```

**Bước 2**: Sau khi đã có danh sách các suất chiếu. Loại trừ các suất chiếu đã đăng ký cho phim khác. Các trường hợp có thể xảy ra như sau (**`A`** là thời gian chiếu trong suất dự kiến, **`A'`** là thời gian chiếu của một suất chiếu khác trong thực tế. Tương tự với **`Atime`** và **`A'time`**):

-   Nếu **`A`** < **`A'`** (tức là **`A`** xảy ra trước) thì phải xét xem khoảng thời gian (**`A'`** - **`A`**) có lớn hơn **`Atime`** hay không. Nếu không thì suất chiếu hợp lệ, còn không thì loại bỏ.

-   Ngược lại, tính xem (**`A'`** + **`A'time`**) có lớn hơn **`A`** hay không. Nếu lớn hơn thì loại bỏ suất chiếu **`A`**.

-> **Suất chiếu** nên lưu thời gian kết thúc (sẽ tự động tính sau khi chọn suất chiếu)

=> Tuy nhiên bảng không còn tính nhất quán của dữ liệu (thời lượng phim hoặc thời gian kết thúc có thể tính toán tử bảng **Phim**)

## Các vấn đề về thời gian

### # Chuyển đổi thời gian của MySQL thành JavaScript

Thời gian được lưu trong MySQL khác với thời gian trong JavaScript.

Hàm sau sẽ thực hiện chuyển đổi ngày giờ từ MySQL thành JavaScript để đồng bộ:

```js
function MySQLtoJSDate(datetime) {
    var mysqlDate = new Date(datetime)
    return new Date(mysqlDate.getTime() + mysqlDate.getTimezoneOffset() * 60000)
}
```

Hàm sẽ trả về đối tượng `Date` có thời gian đồng bộ như trong MySQL.

### # Xác định thời gian bắt đầu

Thời gian bắt đầu của suất chiếu sẽ được xác định như sau:

- Nếu là ngày mà phim chiếu, thời gian bắt đầu là thời gian khởi chiếu của phim.

- Nếu không, thời gian bắt đầu là thời gian mở cửa được quy định bởi rạp (Ví dụ: mở cửa vào 10 giờ sáng, ...).

Thời gian bắt đầu sẽ làm tham số cho `initTime` ở hàm `getXuatChieus()` - Xem phần trên.

`initTime` có thể là đối tượng `Date` và dùng hàm `getDate()` để lấy phần giờ (giá trị trả về từ `0` - `23`).

### # Lưu lại MySQL

Ta sẽ chọn suất chiếu thông qua checkbox.

- Phần hiển thị của checkbox, tức là thẻ `<label>` sẽ chỉ là phần thời gian, ví dụ như `13:30`, `07:55`, ...

- Phần giá trị thực, tức là thuộc tính HTML `value` sẽ lưu cả giá trị ngày và giờ để gửi và lưu vào MySQL.

