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

[IV. Component & API](#IV)

[1. Button](#Button)  

[2. InputSearch](#InputSearch)  

[3. CustomDatePicker](#CustomDatePicker)  

[4. CustomDateTimePicker](#CustomDateTimePicker)  

[5. CustomSelect](#CustomSelect)  

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
# II. NPM Link
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

* <a name="III"></a>
# III. Cách sử dụng thư viện "findxdn/erp/theme"
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

![image](https://fv9-3.failiem.lv/thumb_show.php?i=q6rvvtjaa&view)

* <a name="IV"></a>
# IV. Component và cách sử dụng"

<a name="Button"></a>
## 1.*Button*

|       Name    |      Type     | Default     | Description |
| :------------:|:-------------:|:-----------:|:-----------:|          
|     onClick   |     func      |   null      | function handle onclick |
|     children  |     string    |   ""        | Name button |
|     className |     string    |   ""        | ClassName button |
|     sx        |     any       |   ""        | Style css button |
|     icon      |     any       |   ""        | Icon button |
|     type      |     any       |   button    | Type button: sudmid / reset / button |

<a name="InputSearch"></a>
## 2.*InputSearch*

|       Name    |      Type     | Default     | Description |
| :------------:|:-------------:|:-----------:|:-----------:|          
|     name      |     string    |   ""        | Name inputSearch  |
|    inputCustom|     any       |   null      | Custom css input |


<a name="CustomDatePicker"></a>
## 3.*CustomDatePicker*

|       Name    |      Type     | Default     | Description |
| :------------:|:-------------:|:-----------:|:-----------:|          
|     name      |     string    |   ""        | Name CustomDatePicker  |
|     register  |     any       |   null      |  |
|     className |     string    |   ""        | ClassName CustomDatePicker |
|     onChange  |     any       |   null      | Handle onchange data |
|     errors    |     any       |   null      |
|     styled    |     any       |   null      | Custom css Customdatepiker |

<a name="CustomDateTimePicker"></a>
## 4.*CustomDateTimePicker*

|       Name    |      Type     | Default     | Description |
| :------------:|:-------------:|:-----------:|:-----------:|          
|     name      |     string    |   ""        | Name CustomDateTimePicker  |
|     value     |     any       |   null      | Value default datetimepiker  |
|     register  |     any       |   null      |  |
|     className |     string    |   ""        | ClassName CustomDateTimePicker |
|     onChange  |     any       |   null      | Handle onchange data |
|     errors    |     any       |   null      |
|     styled    |     any       |   null      | Custom css Customdatepiker |

<a name="CustomSelect"></a>
## 5.*CustomSelect*

|       Name             |      Type                | Default     | Description |
| :---------------------:|:------------------------:|:-----------:|:-----------:|          
|     isMulti            |     bool                 |   false     | Multi select options |
|     group              |     bool                 |   false     | Group options |
|     onChange           |     func                 |   ()=> {}   | Change data select |
|     value              |     list,int,string      |   null      | Data select |
|     maxToShowProps     |     number               |   1         | Show data select (isMulti) |
|     menuPlacement      |     top, bottom, auto    |   auto      | Position menu options (config _props) |
|     menuPortal         |     null                 |             | Config styles menu          |

5.1.Example Group: 

    1.options = [
        {
            label: 'label1',
            key:'key1',
            options: [
                {
                    label: 'label1.1',
                    key:'key1.1',
                    value: 'value1.1'
                },
                {
                    label: 'label1.2',
                    key:'key1.2',
                    value: 'value1.2'
                }
            ]
        },
        {
            label: 'label2',
            key:'key2',
            options: [
                {
                    label: 'label2.1',
                    key:'key1',
                    value: 'value2.1'
                },
                {
                    label: 'label2.2',
                    key:'key2.2',
                    value: 'value2.2'
                }
            ]
        }
    ]

    2.onChange : (inputValue, actions) => { 
        <!-- inputValue : value options-->
        <!-- actions : Action Meta onchange-->
    }

    3.value: value2.1

5.2.Example IsMulti: 

    1.options = [
        {
            label: 'label1.1',
            key:'key1.1',
            value: 'value1.1'
        },
        {
            label: 'label1.2',
            key:'key1.2',
            value: 'value1.2'
        }
    ]

    2.onChange : (inputValue, actions) => { 
        <!-- inputValue : list value [value1.1, value1.2]-->
        <!-- actions : Action Meta onchange-->
    }

    3.value: list value [value1.1, value1.2]

5.3.Example Group and IsMulti: 

    1.options = [
        {
            label: 'label1',
            key:'key1',
            options: [
                {
                    label: 'label1.1',
                    key:'key1.1',
                    value: 'value1.1'
                },
                {
                    label: 'label1.2',
                    key:'key1.2',
                    value: 'value1.2'
                }
            ]
        },
        {
            label: 'label2',
            key:'key2',
            options: [
                {
                    label: 'label2.1',
                    key:'key2.1',
                    value: 'value2.1'
                },
                {
                    label: 'label2.2',
                    key:'key2.2',
                    value: 'value2.2'
                }
            ]
        }
    ]

    2.onChange : (inputValue, actions) => { 
        <!-- inputValue :list value options [value1.1, value2.1]-->
        <!-- actions : Action Meta onchange-->
    }

    3.value: list value [value1.1, value2.1]
5.4.Example menuPortal:

    const objectPortal = {
        zIndex: 9999
    }
    <CustomSelect 
        {...props}
        menuPortalTarget={document.body}
        styles={{
            menuPortal: (base) => ({ ...base, ...objectPortal }),
        }} 
    />
