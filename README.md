# React Component Library Template
> 
> Thực hiện: **Nguyễn Phước Vĩnh Phúc**
> 
> Cập nhật lần cuối: **23/04/2022**

### Mục lục  
[I. Các bước tạo mới component( Dự án Findx)](#I)  

[1. Tạo component?](#createcomponent)  

[2. Import component](#importcomponent)  

[3. Update version component](#updateversion)  

[II. NPM Link](#II)  

[1. Tìm Hiểu NPM Link](#timhieu)  

[2. Sử dụng NPM Link](#usenpmlink)

[III. Cách sử dụng thư viện "findxdn/erp/theme"](#III)

[1. Cách sử dụng](#use)  

[2. Fix lỗi thường gặp](#fixbug)

<a name = "I"></a>
# I. Các bước tạo mới component ( Dự án Findx)
<a name="createcomponent"></a>
## 1.*Tạo componnet*
* Clone code từ https://github.com/findxdn/erp-theme
* Tạo folder tên component trong thư mục components với cấu trúc: 
* index.ts  
* name.txs  
* name.scss

![VÍ DỤ](https://fv9-3.failiem.lv/thumb_show.php?i=5q5fux3t9&view)  
<a name="importcomponent"></a>
## 2.*Import component*
* Import component vào file index.js
* npm run roolup : build các componet thành file .js
* <a name="updateversion"></a>
## 3.*Update version component* :  
* Thay đổi version ở file pakage.json 
![VÍ DỤ](https://fv9-1.failiem.lv/thumb_show.php?i=vf7pv39fy&view)  
*	npm publish

<a name = "II"></a>
# [II. NPM Link](#II)
<a name="timhieu"></a>
## 1.*Tìm Hiểu NPM Link*
* - Tác dụng:
* Tạo sự phụ thuộc để liên kết: Tạo ra 1 liên kết tượng trưng trong node_modules, thư mục để bất kỳ sửa đổi bạn thực hiện trong một mô-đun sẽ ngay lập tức được phản ánh trong bất kỳ dự án đã được thành lập để phụ thuộc vào đó (địa phương) phiên bản của mô-đun.
<a name="usenpmlink"></a>
## 2.*Sử dụng NPM Link*
* -	Cách sử dụng: Tạo một shortcut trên dependency với npm link. Shortcut này trỏ tới vị trí thư mục khác trên local.
* npm link ( trong node_mudules cần tạo liên kết) => tạo một liên kết tượng trưng trong thư mục chung
* npm link name (name: tên tương ứng trong node-modules)
* //lưu ý: nên sửa tên node_modules khác với tên thư viện đã import từ github

![VÍ DỤ](https://fv9-1.failiem.lv/thumb_show.php?i=vf7pv39fy&view)  
*	Import thư viện: import { ... } from "name"
* <a name="III"></a>f
[III. Cách sử dụng thư viện "findxdn/erp/theme"](#III)
<a name="use"></a>
## 1.*Cách sử dụng*
* Tạo file .npmrc trong project với data <br>
registry=https://registry.npmjs.org/
@findxdn:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=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
* npm i @findxdmn/erp-theme
* Sử dụng: import { nameComponent } from “findxdn@erp-theme”
*-	Update phiên bản:
* Thay đổi tên phiên bản tương ứng trong file pakage.json
* o	npm i
<a name="fixbug"></a>
## 2.*Fix lỗi thường gặp*
* Nếu có lỗi như hình, thêm --legacy-peer-deps vào sau mỗi lệnh
* Ex: npm i --legacy-peer-deps

![VÍ DỤ](![image](https://fv9-3.failiem.lv/thumb_show.php?i=q6rvvtjaa&view)  




	
