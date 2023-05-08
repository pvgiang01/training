import {I18n} from 'i18n-js'
const translations={
    en:{
        SignIn:'Sign In',
        User: 'Username',
        Password: 'Password',
        ChangePass: 'Change password',
        OldPass: 'Password',
        NewPass: 'New password',
        ConfirmPass:'Confirm password',
        MobilePhone: 'Work Mobile:',
        Birthday: 'Birthday:',
        ChangeLanguage: 'Change Language',
        Version:'Version',
        ReadAll: 'Read all',
        Agree: 'Agree',
        Cancel: 'Cancel',
        MarkAll:'Mark all the notice is read?',
        Notifications: 'Notification',
        Logout: 'Sign Out',
        Search: 'Search by name, number, email...',
        Application: 'Application',
        Contact: 'Contact',
    },
    vi:{
            SignIn:'Đăng nhập',
            User: 'Tên đăng nhập',
            Password: 'Mật Khẩu',
            ChangePass: 'Đổi mật khẩu',
            OldPass: 'Mật khẩu cũ',
            NewPass: 'Nhập mật khẩu mới',
            ConfirmPass:'Nhập lại mật khẩu mới',
            MobilePhone: 'Số điện thoại:',
            Birthday: 'Ngày sinh:',
            ChangeLanguage: 'Đổi ngôn ngữ',
            Version:'Phiên bản',
            ReadAll: 'Đọc tất cả',
            Agree: 'Đồng ý',
            Cancel: 'Hủy bỏ',
            MarkAll:'Đánh dấu tất cả đã đọc?',
            Notifications: 'Thông báo',
            Logout: 'Đăng xuất',
            Search: 'Tìm kiếm theo tên, điện thoại, email...',
            Application: 'Ứng dụng',
            Contact: 'Danh bạ'

        }
    };
const i18n = new I18n(translations);
i18n.defaultLocale = 'vi';
i18n.locale = 'vi';
export default i18n;
