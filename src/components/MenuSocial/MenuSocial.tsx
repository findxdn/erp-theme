import React from "react";
import InputSearch from "../../components/InputSearch";
import "./MenuSocial.scss";
import {
  IcBooking,
  IcCtp,
  IcCtv,
  IcDepartment,
  IcELearning,
  IcInsurance,
  IcOffer,
  IcPayroll,
  IcPersonal,
  IcRecruit,
  IcTimekeeping,
  IcWelfare,
} from "../../assets/icons/hrm";

import {
  IcComplain,
  IcFeedback,
  IcLiveChat,
  IcMarketing,
  IcPoint,
  IcUser,
  IcVoucher,
} from "../../assets/icons/crm";

import {
  IcDecentralization,
  IcHelpDesk,
  IcLibrary,
  IcReport,
  IcSetting,
  IcTrouble,
  IcWebApp,
} from "../../assets/icons/system";

import {
  IcNCC,
  IcOrder,
  IcPos,
  IcProduct,
  IcShop,
  IcStock,
} from "../../assets/icons/sales";

import {
  IcAsset,
  IcCashBook,
  IcDebt,
  IcForControl,
  IcPayment,
  IcRent,
  IcTC,
} from "../../assets/icons/finance";

import {
  IcMachine,
  IcMaterial,
  IcPlan,
  IcPrice,
  IcQuota,
} from "../../assets/icons/manufacture";

export interface PropsMenuSocial {}

const HRM_KEYS = {
  EMPLOYEE: "EMPLOYEE",
};

const MODULE_HRM_DEFAULT = {
  [HRM_KEYS.EMPLOYEE]: {
    name: "Nhân sự",
    icon: <IcPersonal />,
    onClick: ()=>{

    },
    active: false,
  },
};

function MenuSocial(props: PropsMenuSocial) {
  const headerLink = "https://ilove.fm.com.vn/";

  const MODULE_HRM = MODULE_HRM_DEFAULT;

  return (
    <div className="social-menu-container">
      <div className="menu-search">
        <InputSearch inputCustom="input-custom" />
      </div>
      <div className="menu-content">
        <div className="menu-content-left">
          <div className="menu-hrm">
            <p className="menu-hrm-title">hrm</p>
            <div className="hrm-icon">
              {Object.keys(MODULE_HRM).map((key) => {
                return (
                  <div
                    className={`hrm-icon-item ${`unactive-module`}`}
                    onClick={() => window.location.assign(headerLink + "hrm")}
                  >
                    {MODULE_HRM[key]?.icon}
                    <p>{MODULE_HRM[key]?.name}</p>
                  </div>
                );
              })}
              {/* <div
                className="hrm-icon-item"
                onClick={() => window.location.assign(headerLink + "hrm")}
              >
                <IcPersonal />
                <p>Nhân sự</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcDepartment />
                <p>Phòng ban</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcRecruit />
                <p>Tuyển dụng</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcELearning />
                <p>E-leaning</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcTimekeeping />
                <p>Chấm công</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcPayroll />
                <p>Bảng lương</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcWelfare />
                <p>Phúc lợi</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcInsurance />
                <p>Bảo hiểm</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcBooking />
                <p>Booking</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcOffer />
                <p>Đề xuất</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcCtv />
                <p>CTV</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcCtp />
                <p>Cộng tác phí</p>
              </div> */}
            </div>
          </div>
          <div className="menu-hrm">
            <p className="menu-hrm-title">crm</p>
            <div className="hrm-icon">
              <div
                className="hrm-icon-item"
                onClick={() => window.location.assign(headerLink + "customers")}
              >
                <IcUser />
                <p>Khách hàng</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcLiveChat />
                <p>Livechat</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcComplain />
                <p>Góp ý</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcFeedback />
                <p>Khiếu nại</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcMarketing />
                <p>Marketing</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcVoucher />
                <p>Voucher</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcPoint />
                <p>Điểm</p>
              </div>
            </div>
          </div>
          <div className="menu-hrm">
            <p className="menu-hrm-title">hệ thống</p>
            <div className="hrm-icon">
              <div className="hrm-icon-item unactive-module">
                <IcReport />
                <p>Báo cáo</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcDecentralization />
                <p>Phân quyền</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcLibrary />
                <p>Thư viện</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcWebApp />
                <p>Web/App</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcHelpDesk />
                <p>HelpDesk</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcTrouble />
                <p>Sự cố</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcSetting />
                <p>Cài đặt</p>
              </div>
              <div className="hrm-icon-item unactive-module">
                <IcHelpDesk />
                <p>HelpDesk</p>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-content-right">
          <div className="menu-pos">
            <p className="menu-pos-title">bán hàng</p>
            <div className="pos-icon">
              <div
                className="pos-icon-item"
                onClick={() => window.location.assign(headerLink + "pos")}
              >
                <IcPos />
                <p>POS</p>
              </div>
              <div
                className="pos-icon-item"
                onClick={() => window.location.assign(headerLink + "products")}
              >
                <IcProduct />
                <p>Sản phẩm</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcShop />
                <p>Cửa hàng</p>
              </div>
              <div
                className="pos-icon-item"
                onClick={() => window.location.assign(headerLink + "orders")}
              >
                <IcOrder />
                <p>Đơn hàng</p>
              </div>
              <div
                className="pos-icon-item"
                onClick={() => window.location.assign(headerLink + "stocks")}
              >
                <IcStock />
                <p>Kho</p>
              </div>
              <div
                className="pos-icon-item"
                onClick={() => window.location.assign(headerLink + "suppliers")}
              >
                <IcNCC />
                <p>NCC</p>
              </div>
            </div>
          </div>
          <div className="menu-pos">
            <p className="menu-pos-title">tài chính</p>
            <div className="pos-icon">
              <div className="pos-icon-item unactive-module">
                <IcTC />
                <p>Thu chi</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcCashBook />
                <p>Sổ quỷ</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcDebt />
                <p>Công nợ</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcAsset />
                <p>Tài sản</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcPayment />
                <p>Thanh toán</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcForControl />
                <p>Đối soát</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcRent />
                <p>Cho thuê</p>
              </div>
            </div>
          </div>
          <div className="menu-pos">
            <p className="menu-pos-title">sản xuất</p>
            <div className="pos-icon">
              <div className="pos-icon-item unactive-module">
                <IcPlan />
                <p>Kế hoạch</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcQuota />
                <p>Định mức</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcMaterial />
                <p>Vật liệu</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcMachine />
                <p>Gia công</p>
              </div>
              <div className="pos-icon-item unactive-module">
                <IcPrice />
                <p>Giá bán</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuSocial;
