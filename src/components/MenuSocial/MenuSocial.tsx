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

export interface PropsMenuSocial {
  hrm: any;
  system: any;
  pos: any;
  crm: any;
  finance: any;
  manufacturing: any;
}

const headerLink = "/";

const HRM_KEYS = {
  EMPLOYEE: "EMPLOYEE",
  DEPARTMENT: "DEPARTMENT",
  RECRUIT: "RECRUIT",
  ELEARNING: "ELEARNING",
  TIMEKEEPING: "TIMEKEEPING",
  PAYROLL: "PAYROLL",
  WELFARE: "WELFARE",
  INSURANCE: "INSURANCE",
  BOOKING: "BOOKING",
  OFFER: "OFFER",
  CTV: "CTV",
  CTP: "CTP",
};

const SYSTEM_KEYS = {
  REPORT: "REPORT",
  DECENTRALIZATION: "DECENTRALIZATION",
  LIBRARY: "LIBRARY",
  WEB_APP: "WEB_APP",
  HELPDESK: "HELPDESK",
  TROUBLE: "TROUBLE",
  SETTING: "SETTING",
};

const POS_KEYS = {
  POS: "POS",
  PRODUCT: "PRODUCT",
  SHOP: "SHOP",
  ORDER: "ORDER",
  STOCK: "STOCK",
  NCC: "NCC",
};

const CRM_KEYS = {
  CUSTOMER: "CUSTOMER",
  LIVECHAT: "LIVECHAT",
  FEEDBACK: "FEEDBACK",
  COMPLAIN: "COMPLAIN",
  MARKETING: "MARKETING",
  VOUCHER: "VOUCHER",
  POINT: "POINT",
};

const FINANCE_KEYS = {
  COLLECTION: "COLLECTION",
  CASHBOOK: "CASHBOOK",
  DEBT: "DEBT",
  ASSET: "ASSET",
  PAYMENT: "PAYMENT",
  FORCONTROL: "FORCONTROL",
  LEASE: "LEASE",
};

const MANUFACTURING_KEYS = {
  PLAN: "PLAN",
  CATEGORY: "CATEGORY",
  MATERIAL: "MATERIAL",
  MACHINING: "MACHINING",
  PRICE: "PRICE",
};

const MODULE_HRM_DEFAULT = {
  [HRM_KEYS.EMPLOYEE]: {
    name: "Nhân sự",
    icon: <IcPersonal />,
    onClick: () => {
      window.location.href = headerLink + "hrm";
    },
    active: true,
  },
  [HRM_KEYS.DEPARTMENT]: {
    name: "Phòng ban",
    icon: <IcDepartment />,
    onClick: () => {
      window.location.href = headerLink + "hrm/manage-office";
    },
    active: false,
  },
  [HRM_KEYS.RECRUIT]: {
    name: "Tuyển dụng",
    icon: <IcRecruit />,
    onClick: () => { },
    active: false,
  },
  [HRM_KEYS.ELEARNING]: {
    name: "E-leaning",
    icon: <IcRecruit />,
    onClick: () => { },
    active: false,
  },
  [HRM_KEYS.TIMEKEEPING]: {
    name: "Chấm công",
    icon: <IcTimekeeping />,
    onClick: () => {
      window.location.href = headerLink + "hrm/manage-checkin";
    },
    active: false,
  },
  [HRM_KEYS.PAYROLL]: {
    name: "Bảng lương",
    icon: <IcTimekeeping />,
    onClick: () => { },
    active: false,
  },
  [HRM_KEYS.WELFARE]: {
    name: "Phúc lợi",
    icon: <IcWelfare />,
    onClick: () => { },
    active: false,
  },
  [HRM_KEYS.INSURANCE]: {
    name: "Bảo hiểm",
    icon: <IcInsurance />,
    onClick: () => { },
    active: false,
  },
  [HRM_KEYS.BOOKING]: {
    name: "Booking",
    icon: <IcBooking />,
    onClick: () => { },
    active: false,
  },
  [HRM_KEYS.OFFER]: {
    name: "Đề xuất",
    icon: <IcOffer />,
    onClick: () => { },
    active: false,
  },
  [HRM_KEYS.CTV]: {
    name: "CTV",
    icon: <IcCtv />,
    onClick: () => { },
    active: false,
  },
  [HRM_KEYS.CTP]: {
    name: "Cộng tác phí",
    icon: <IcCtp />,
    onClick: () => { },
    active: false,
  },
};

const MODULE_SYSTEM_DEFAULT = {
  [SYSTEM_KEYS.REPORT]: {
    name: "Báo cáo",
    icon: <IcReport />,
    onClick: () => { },
    active: false,
  },
  [SYSTEM_KEYS.DECENTRALIZATION]: {
    name: "Phân quyền",
    icon: <IcDecentralization />,
    onClick: () => { },
    active: false,
  },
  [SYSTEM_KEYS.LIBRARY]: {
    name: "Thư viện",
    icon: <IcLibrary />,
    onClick: () => { },
    active: false,
  },
  [SYSTEM_KEYS.WEB_APP]: {
    name: "Web/App",
    icon: <IcWebApp />,
    onClick: () => {
      window.location.href = headerLink + "wa";
    },
    active: true,
  },
  [SYSTEM_KEYS.HELPDESK]: {
    name: "HelpDesk",
    icon: <IcHelpDesk />,
    onClick: () => { },
    active: false,
  },
  [SYSTEM_KEYS.TROUBLE]: {
    name: "Sự cố",
    icon: <IcTrouble />,
    onClick: () => { },
    active: false,
  },
  [SYSTEM_KEYS.SETTING]: {
    name: "Cài đặt",
    icon: <IcSetting />,
    onClick: () => { },
    active: false,
  },
};

const MODULE_POS_DEFAULT = {
  [POS_KEYS.POS]: {
    name: "Pos",
    icon: <IcPos />,
    onClick: () => {
      window.location.href = headerLink + "pos";
    },
    active: true,
  },
  [POS_KEYS.PRODUCT]: {
    name: "Sản phẩm",
    icon: <IcProduct />,
    onClick: () => {
      window.location.href = headerLink + "product";
    },
    active: true,
  },
  [POS_KEYS.SHOP]: {
    name: "Cửa hàng",
    icon: <IcShop />,
    onClick: () => { },
    active: false,
  },
  [POS_KEYS.ORDER]: {
    name: "Đơn hàng",
    icon: <IcOrder />,
    onClick: () => {
      window.location.href = headerLink + "order";
    },
    active: true,
  },
  [POS_KEYS.STOCK]: {
    name: "Kho",
    icon: <IcStock />,
    onClick: () => {
      window.location.href = headerLink + "stock";
    },
    active: true,
  },
  [POS_KEYS.NCC]: {
    name: "NCC",
    icon: <IcNCC />,
    onClick: () => {
      window.location.href = headerLink + "supplier";
    },
    active: false,
  },
};

const MODULE_CRM_DEFAULT = {
  [CRM_KEYS.CUSTOMER]: {
    name: "Khách hàng",
    icon: <IcUser />,
    onClick: () => {
      window.location.assign(headerLink + "customer");
    },
    active: true,
  },
  [CRM_KEYS.LIVECHAT]: {
    name: "Livechat",
    icon: <IcLiveChat />,
    onClick: () => { },
    active: false,
  },
  [CRM_KEYS.FEEDBACK]: {
    name: "Góp ý",
    icon: <IcComplain />,
    onClick: () => { },
    active: false,
  },
  [CRM_KEYS.COMPLAIN]: {
    name: "Khiếu nại",
    icon: <IcFeedback />,
    onClick: () => { },
    active: false,
  },
  [CRM_KEYS.MARKETING]: {
    name: "Marketing",
    icon: <IcMarketing />,
    onClick: () => { },
    active: false,
  },
  [CRM_KEYS.VOUCHER]: {
    name: "Voucher",
    icon: <IcVoucher />,
    onClick: () => { },
    active: false,
  },
  [CRM_KEYS.POINT]: {
    name: "Điểm",
    icon: <IcPoint />,
    onClick: () => { },
    active: false,
  },
};

const MODULE_FINANCE_DEFAULT = {
  [FINANCE_KEYS.COLLECTION]: {
    name: "Thu chi",
    icon: <IcTC />,
    onClick: () => { },
    active: false,
  },
  [FINANCE_KEYS.CASHBOOK]: {
    name: "Sổ quỷ",
    icon: <IcCashBook />,
    onClick: () => { },
    active: false,
  },
  [FINANCE_KEYS.DEBT]: {
    name: "Công nợ",
    icon: <IcDebt />,
    onClick: () => { },
    active: false,
  },
  [FINANCE_KEYS.ASSET]: {
    name: "Tài sản",
    icon: <IcAsset />,
    onClick: () => { },
    active: false,
  },
  [FINANCE_KEYS.PAYMENT]: {
    name: "Thanh toán",
    icon: <IcPayment />,
    onClick: () => { },
    active: false,
  },
  [FINANCE_KEYS.FORCONTROL]: {
    name: "Đối soát",
    icon: <IcForControl />,
    onClick: () => { },
    active: false,
  },
  [FINANCE_KEYS.LEASE]: {
    name: "Cho thuê",
    icon: <IcRent />,
    onClick: () => { },
    active: false,
  },
};

const MODULE_MANUFACTURING_DEFAULT = {
  [MANUFACTURING_KEYS.PLAN]: {
    name: "Kế hoạch",
    icon: <IcPlan />,
    onClick: () => { },
    active: false,
  },
  [MANUFACTURING_KEYS.CATEGORY]: {
    name: "Định mức",
    icon: <IcQuota />,
    onClick: () => { },
    active: false,
  },
  [MANUFACTURING_KEYS.MATERIAL]: {
    name: "Vật liệu",
    icon: <IcMaterial />,
    onClick: () => { },
    active: false,
  },
  [MANUFACTURING_KEYS.MACHINING]: {
    name: "Gia công",
    icon: <IcMachine />,
    onClick: () => { },
    active: false,
  },
  [MANUFACTURING_KEYS.PRICE]: {
    name: "Giá bán",
    icon: <IcPrice />,
    onClick: () => { },
    active: false,
  },
};

function MenuSocial(props: PropsMenuSocial) {
  const getCustomObject = (moduleKey, MODULE_DEFAULT) => {
    let custom = {};
    if (props[moduleKey]) {
      Object.keys(props[moduleKey]).forEach((key) => {
        custom[key] = Object.assign(MODULE_DEFAULT[key], props[moduleKey][key]);
      });
    }
    return Object.assign(MODULE_DEFAULT, custom);
  };

  const MODULE_HRM = getCustomObject("hrm", MODULE_HRM_DEFAULT);
  const MODULE_SYSTEM = getCustomObject("system", MODULE_SYSTEM_DEFAULT);
  const MODULE_POS = getCustomObject("pos", MODULE_POS_DEFAULT);
  const MODULE_CRM = getCustomObject("crm", MODULE_CRM_DEFAULT);
  const MODULE_FINANCE = getCustomObject("finance", MODULE_FINANCE_DEFAULT);
  const MODULE_MANUFACTURING = getCustomObject(
    "manufacturing",
    MODULE_MANUFACTURING_DEFAULT
  );

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
                    className={`hrm-icon-item ${!MODULE_HRM[key]?.active && `unactive-module`
                      }`}
                    onClick={() => {
                      if (MODULE_HRM[key]?.active) {
                        MODULE_HRM[key]?.onClick();
                      }
                    }}
                  >
                    {MODULE_HRM[key]?.icon}
                    <p>{MODULE_HRM[key]?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="menu-hrm">
            <p className="menu-hrm-title">crm</p>
            <div className="hrm-icon">
              {Object.keys(MODULE_CRM).map((key) => {
                return (
                  <div
                    className={`hrm-icon-item ${!MODULE_CRM[key]?.active && `unactive-module`
                      }`}
                    onClick={() => {
                      if (MODULE_CRM[key]?.active) {
                        MODULE_CRM[key]?.onClick();
                      }
                    }}
                  >
                    {MODULE_CRM[key]?.icon}
                    <p>{MODULE_CRM[key]?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="menu-hrm">
            <p className="menu-hrm-title">hệ thống</p>
            <div className="hrm-icon">
              {Object.keys(MODULE_SYSTEM).map((key) => {
                return (
                  <div
                    className={`hrm-icon-item ${!MODULE_SYSTEM[key]?.active && `unactive-module`
                      }`}
                    onClick={() => {
                      if (MODULE_SYSTEM[key]?.active) {
                        MODULE_SYSTEM[key]?.onClick();
                      }
                    }}
                  >
                    {MODULE_SYSTEM[key]?.icon}
                    <p>{MODULE_SYSTEM[key]?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="menu-content-right">
          <div className="menu-pos">
            <p className="menu-pos-title">bán hàng</p>
            <div className="pos-icon">
              {Object.keys(MODULE_POS).map((key) => {
                return (
                  <div
                    className={`pos-icon-item ${!MODULE_POS[key]?.active && `unactive-module`
                      }`}
                    onClick={() => {
                      if (MODULE_POS[key]?.active) {
                        MODULE_POS[key]?.onClick();
                      }
                    }}
                  >
                    {MODULE_POS[key]?.icon}
                    <p>{MODULE_POS[key]?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="menu-pos">
            <p className="menu-pos-title">tài chính</p>
            <div className="pos-icon">
              {Object.keys(MODULE_FINANCE).map((key) => {
                return (
                  <div
                    className={`pos-icon-item ${!MODULE_FINANCE[key]?.active && `unactive-module`
                      }`}
                    onClick={() => {
                      if (MODULE_FINANCE[key]?.active) {
                        MODULE_FINANCE[key]?.onClick();
                      }
                    }}
                  >
                    {MODULE_FINANCE[key]?.icon}
                    <p>{MODULE_FINANCE[key]?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="menu-pos">
            <p className="menu-pos-title">sản xuất</p>
            <div className="pos-icon">
              {Object.keys(MODULE_MANUFACTURING).map((key) => {
                return (
                  <div
                    className={`pos-icon-item ${!MODULE_MANUFACTURING[key]?.active && `unactive-module`
                      }`}
                    onClick={() => {
                      if (MODULE_MANUFACTURING[key]?.active) {
                        MODULE_MANUFACTURING[key]?.onClick();
                      }
                    }}
                  >
                    {MODULE_MANUFACTURING[key]?.icon}
                    <p>{MODULE_MANUFACTURING[key]?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuSocial;
