export const required = (value) => (value ? undefined : 'Không được để trống');

export const maxLength = (max) => (value) =>
  (value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined);

export const maxLength5 = maxLength(5);
export const maxLength3 = maxLength(3);
export const maxLength10 = maxLength(10);
export const maxLength8 = maxLength(8);
export const maxLength15 = maxLength(15);
export const maxLength16 = maxLength(16);
export const maxLength22 = maxLength(22);
export const maxLength100 = maxLength(100);
export const maxLength120 = maxLength(120);
export const maxLength50 = maxLength(50);
export const maxLength20 = maxLength(20);
export const maxLength30 = maxLength(30);
export const maxLength200 = maxLength(200);
export const maxLength152 = maxLength(152);
export const maxLength500 = maxLength(500);
export const maxLength1000 = maxLength(1000);
export const maxLength2000 = maxLength(2000);

export const minLength = (min) => (value) =>
  (value && value.length < min
    ? `Tên đăng nhập tối thiểu 0${min} ký tự`
    : undefined);
export const minLength8 = minLength(8);

export const number = (value) =>
  (!/^[0-9]*$/i.test(value) && value != null ? 'Must be a number' : undefined);
export const minValue = (min) => (value) =>
  (value && value < min ? `Must be at least ${min}` : undefined);
export const minValue18 = minValue(18);
export const email = (value) =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email không đúng định dạng'
    : undefined);
export const phone = (value) =>
  (value
    && !/(090|093|070|072|079|077|076|078|089|088|091|094|083|084|085|081|082|032|033|034|035|036|037|038|039|086|096|097|098|099|059|092|052|056|058)+([0-9]{7})\b/i.test(
      value,
    )
    ? 'Số điện thoại không hợp lệ'
    : undefined);
export const tooOld = (value) =>
  (value && value > 65 ? 'You might be too old for this' : undefined);
export const aol = (value) =>
  (value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined);
export const nickNameCheck = (value) =>
  (value && !/^[a-zA-Z0-9-_\s]*$/gs.test(value)
    ? 'Nickname chỉ cho phép kí tự, số, dấu cách & kí tự " - " & " _ "'
    : undefined);
export const passwordCheck = (value) =>
  (value
    && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/gm.test(value)
    ? 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 ký tự thường - 1 ký tự hoa - 1 ký tự số'
    : undefined);
export const validateSync = (values) => {
  const errors = {};
  if (!values.dateFrom) {
    errors.dateFrom = 'Required';
  }
  if (!values.dateTo) {
    errors.dateTo = 'Required';
  }
  if (!values.user_cd) {
    errors.user_cd = 'Required';
  }
  if (
    new Date(values.dateFrom).getTime() > new Date(values.dateTo).getTime()
  ) {
    errors.dateFrom = 'Date From must before Date To';
  }
  return errors;
};
export const confirmPassword = (value, allValues) => (value != allValues.Password
  ? 'Mật khẩu không trùng khớp'
  : undefined);

export const usernameCheck = (value) =>
  (value && !/^[a-zA-Z0-9]*$/gs.test(value)
    ? 'Chỉ chứa chữ & số, không chứa dấu cách, không chứa ký tự đặc biệt, không được chỉ chứa số'
    : undefined);

export const notOnlyNumber = (value) =>
  (value && !/^(?!^\d+$)^.+$/gs.test(value)
    ? 'Chỉ chứa chữ & số, không chứa dấu cách, không chứa ký tự đặc biệt, không được chỉ chứa số'
    : undefined);
export const onlyNormalChar = (value) =>
  (value
    && !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýÝ\s]+$/gs.test(
      value,
    )
    ? 'Chỉ chứa chữ'
    : undefined);
export const lastname = (value) =>
  (value
    && !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýÝ\s]+$/gs.test(
      value,
    )
    ? 'Chỉ chứa chữ, không chứa số & ký tự đặc biệt'
    : undefined);
export const firstname = (value) =>
  (value
    && !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýÝ]+$/gs.test(
      value,
    )
    ? 'Chỉ chứa chữ, không chứa: dấu cách, số & ký tự đặc biệt'
    : undefined);
export const checkPIN = (value) =>
  (value && !/^[0-9]{6,}$/gm.test(value)
    ? 'Mã PIN phải đủ 6 ký tự & chỉ chứa số'
    : undefined);
export const checkPinSpecial = (value) =>
  ('0123456789876543210/111111/222222/333333/444444/555555/666666/777777/888888/999999/000000'.includes(
    value,
  )
    ? 'Vui lòng không nhập mã PIN dễ đoán'
    : undefined);

export function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'a');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'i');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'o');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y');
  str = str.replace(/Đ/g, 'd');
  str = str.toUpperCase();
  return str;
}
