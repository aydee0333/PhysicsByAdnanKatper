/**
 * Tri-lingual translations: English (en), Urdu (ur), Sindhi (sd)
 * Add new keys here — useT(key) will fall back to English if missing.
 */

export type Lang = 'en' | 'ur' | 'sd';

export const LANG_META: Record<Lang, { label: string; native: string; dir: 'ltr' | 'rtl'; flag: string; font: string }> = {
  en: { label: 'English', native: 'English',  dir: 'ltr', flag: '🇬🇧', font: "'Poppins', sans-serif" },
  ur: { label: 'Urdu',    native: 'اُردُو',    dir: 'rtl', flag: '🇵🇰', font: "'Noto Nastaliq Urdu', serif" },
  sd: { label: 'Sindhi',  native: 'سِنڌِي',     dir: 'rtl', flag: '🇵🇰', font: "'Noto Naskh Arabic', 'Noto Sans Arabic', serif" },
};

type Dict = Record<string, string>;

const en: Dict = {
  // Brand
  'brand.name': 'Physics',
  'brand.subtitle': 'By Adnan Katper',

  // Login
  'login.welcome': 'Welcome',
  'login.tagline': 'Master Physics with',
  'login.teacherName': 'Adnan Katper',
  'login.teacherTitle': 'Physics Teacher',
  'login.school': 'Govt. Boys Higher Secondary School, Naudero',
  'login.heading': 'Sign in to continue',
  'login.subheading': 'Enter your credentials to access the physics portal.',
  'login.username': 'Username',
  'login.usernamePh': 'Enter your username',
  'login.password': 'Password',
  'login.passwordPh': 'Enter your password',
  'login.signIn': 'Sign In',
  'login.signingIn': 'Signing in…',
  'login.errorInvalid': 'Invalid username or password. Please try again.',
  'login.show': 'Show',
  'login.hide': 'Hide',
  'login.remember': 'Keep me signed in',
  'login.footer': 'Class IX & X Physics • Naudero, Pakistan',
  'login.typing.1': 'Welcome to Physics Portal',
  'login.typing.2': 'Learn with real-life examples',
  'login.typing.3': 'Master concepts step by step',
  'login.typing.4': 'Class IX & X — fully covered',

  // Nav
  'nav.home': 'Home',
  'nav.classIX': 'Class IX',
  'nav.classX': 'Class X',
  'nav.logout': 'Logout',
  'nav.signedInAs': 'Signed in as',

  // Common
  'common.language': 'Language',
};

const ur: Dict = {
  'brand.name': 'فزکس',
  'brand.subtitle': 'عدنان کٹپر کے ساتھ',

  'login.welcome': 'خوش آمدید',
  'login.tagline': 'فزکس سیکھیں',
  'login.teacherName': 'عدنان کٹپر',
  'login.teacherTitle': 'استادِ فزکس',
  'login.school': 'گورنمنٹ بوائز ہائر سیکنڈری اسکول، نوڈیرو',
  'login.heading': 'جاری رکھنے کے لیے سائن اِن کریں',
  'login.subheading': 'فزکس پورٹل تک رسائی کے لیے اپنی تفصیلات درج کریں۔',
  'login.username': 'یوزر نیم',
  'login.usernamePh': 'اپنا یوزر نیم درج کریں',
  'login.password': 'پاس ورڈ',
  'login.passwordPh': 'اپنا پاس ورڈ درج کریں',
  'login.signIn': 'سائن اِن',
  'login.signingIn': 'سائن اِن ہو رہا ہے…',
  'login.errorInvalid': 'غلط یوزر نیم یا پاس ورڈ۔ دوبارہ کوشش کریں۔',
  'login.show': 'دکھائیں',
  'login.hide': 'چھپائیں',
  'login.remember': 'مجھے سائن اِن رکھیں',
  'login.footer': 'کلاس نہم اور دہم فزکس • نوڈیرو، پاکستان',
  'login.typing.1': 'فزکس پورٹل میں خوش آمدید',
  'login.typing.2': 'حقیقی مثالوں سے سیکھیں',
  'login.typing.3': 'مرحلہ وار تصورات سمجھیں',
  'login.typing.4': 'کلاس نہم و دہم — مکمل کورس',

  'nav.home': 'ہوم',
  'nav.classIX': 'کلاس نہم',
  'nav.classX': 'کلاس دہم',
  'nav.logout': 'لاگ آؤٹ',
  'nav.signedInAs': 'سائن اِن بطور',

  'common.language': 'زبان',
};

const sd: Dict = {
  'brand.name': 'فزڪس',
  'brand.subtitle': 'عدنان ڪٽپر سان',

  'login.welcome': 'ڀلي ڪري آيا',
  'login.tagline': 'فزڪس سکو',
  'login.teacherName': 'عدنان ڪٽپر',
  'login.teacherTitle': 'فزڪس جو استاد',
  'login.school': 'گورنمينٽ بوائز هائر سيڪنڊري اسڪول، نوڊيرو',
  'login.heading': 'جاري رکڻ لاءِ سائن اِن ڪريو',
  'login.subheading': 'فزڪس پورٽل ۾ داخل ٿيڻ لاءِ پنھنجون تفصيلون لکو.',
  'login.username': 'يوزر نيم',
  'login.usernamePh': 'پنھنجو يوزر نيم لکو',
  'login.password': 'پاسورڊ',
  'login.passwordPh': 'پنھنجو پاسورڊ لکو',
  'login.signIn': 'سائن اِن',
  'login.signingIn': 'سائن اِن ٿي رهيو آهي…',
  'login.errorInvalid': 'غلط يوزر نيم يا پاسورڊ. وري ڪوشش ڪريو.',
  'login.show': 'ڏيکاريو',
  'login.hide': 'لڪايو',
  'login.remember': 'مون کي سائن اِن رکو',
  'login.footer': 'ڪلاس نائين ۽ ڏھين فزڪس • نوڊيرو، پاڪستان',
  'login.typing.1': 'فزڪس پورٽل ۾ ڀلي ڪري آيا',
  'login.typing.2': 'حقيقي مثالن سان سکو',
  'login.typing.3': 'تصور قدم بہ قدم سمجھو',
  'login.typing.4': 'ڪلاس نائين ۽ ڏھين — مڪمل ڪورس',

  'nav.home': 'ھوم',
  'nav.classIX': 'ڪلاس نائين',
  'nav.classX': 'ڪلاس ڏھين',
  'nav.logout': 'لاگ آئوٽ',
  'nav.signedInAs': 'سائن اِن طور',

  'common.language': 'ٻولي',
};

export const TRANSLATIONS: Record<Lang, Dict> = { en, ur, sd };

export function translate(lang: Lang, key: string): string {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}
