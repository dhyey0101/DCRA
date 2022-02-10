import {Platform, Dimensions} from 'react-native';

export default class APIConstants {
  //============================================Auth flow===========================================================================

  static register = 'sign_up';
  static login = 'login';
  static social_Login_Registration = 'social_register';
  static social_Login = 'social_login';
  static setMpin = 'user/set_mpin';
  static loginMpin = 'user/login_with_mpin';
  static logout = 'user/logout';
  static deleteUser = 'user/delete_user';
  static notification = 'user/notification_list'

  // static logout = 'auth/logout';
  // static verifyOtp = 'auth/verify-otp';
  // static resendOtp = 'auth/resend-otp';
  // static checkOtp = 'auth/check-otp';
  // static profileCreation = 'auth/user-signup/profile';
  // static imperials = 'auth/imperials';
  // static country = 'auth/country';
  // static city = 'auth/city?countryId=';
  // static horseColors = 'auth/horses-colors';
  // static horseBreeds = 'auth/horses-breeds';
  static forgotPassword = 'reset_password_by_id';
  // static changePassword = 'auth/change-password';
  // static resendEmail = 'auth/resend-verification-email';

  //============================================App flow===========================================================================
  static getSateUser = 'main/get_state_user';
  static getDisasterUser = 'main/get_disaster_manager';
  static addDisasterUser = 'main/add_edit_disaster_manager';
  static addStateUser = 'main/add_edit_state_user';
  static getVerificationRequest = 'main/get_verification_request';
  static approvedVerificationRequest = 'main/approved_reject_verification_request';
  static sendFeedBack = 'main/send_feedback';
  static getFeedList = 'main/get_feed_list';
  static create_Feed = 'main/create_feed';
  static comment_List = 'main/comment_list';
  static add_Edit_Comment = 'main/add_edit_comment';
  static delete_Comment = 'main/delete_comment';
  static safe_or_not_safe = 'main/safe_or_not_safe';
  static create_crowd_sourcing = 'main/create_crowd_sourcing';
  static crowd_sourcing_detail = 'main/crowd_sourcing_detail';
  static get_feed_details = 'main/get_feed_details';
  static delete_feed = 'main/delete_feed';
  static get_profile = 'user/get_profile';
  static edit_profile = 'user/edit_profile';
  static get_notification_counts = 'user/get_notification_counts';

}
