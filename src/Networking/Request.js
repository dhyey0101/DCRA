import axios from 'axios';
import * as RootNavigation from './../Navigation/RootNavigation';
import * as React from 'react';

// export const isReadyRef = React.createRef();
const AccountTypeErrorTitle = 'Error';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import AccountType from '../Screens/Auth/AccountType';

// const clearStorageAndLogout = async (response) => {
//   try {
//     await AsyncStorage.clear();
//     RootNavigation.reset({
//       index: 0,
//       routes: [{name: 'AccountType'}],
//     });
//     setTimeout(() => {
//       AccountType.showErrorMessage(
//         AccountTypeErrorTitle,
//         response?.message ? response?.message : 'Something went wrong!',
//         5000,
//         2,
//       );
//     }, 1000);
//     return true;
//   } catch (err) {
//     console.log('error is: ' + err);
//   }
// };

//getAPI
const getAPI = (url, headers) =>
  axios
    .get(url, {headers})
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        let response = error?.response?.data;
        // clearStorageAndLogout(response);
      } else {
        // alert('Error is ',error?.response?.data)
        let response = error?.response?.data;
        return response;
      }
    });

//postAPI
const postAPI = (url, headers, data) =>
  axios
    .post(url, data, {headers})
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        let response = error?.response?.data;
        // clearStorageAndLogout(response);
      } else {
        // alert('Error is ',error?.response?.data)
        let response = error?.response?.data;
        return response;
      }
    });

//putAPI
const putAPI = (url, headers, data) =>
  axios
    .put(url, {headers}, data)
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        let response = error?.response?.data;
        clearStorageAndLogout(response);
      } else {
        // alert('Error is ',error?.response?.data)
        let response = error?.response?.data;
        return response;
      }
    });

//patchAPI
const patchAPI = (url, headers, data) =>
  axios
    .patch(url, data, {headers})
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        let response = error?.response?.data;
        clearStorageAndLogout(response);
      } else {
        // alert('Error is ',error?.response?.data)
        let response = error?.response?.data;
        return response;
      }
    });

//deleteAPI
const deleteAPI = (url, headers, data) => {
  // data = {
  //     data
  // }

  return (
    axios
      .delete(url, {headers, data})
      .then((response) => response.data)
      .catch((error) => {
        if (error?.response?.status == 401) {
          let response = error?.response?.data;
          clearStorageAndLogout(response);
        } else {
          // alert('Error is ',error?.response?.data)
          let response = error?.response?.data;
          return response;
        }
      })
      // .catch(function (error) {
      //     let displayError = {}
      //     displayError.status = 0;
      //     console.log("error?.response?.data ====> ", error)
      //     displayError.message = error?.response?.data?.message
      //         ? error.response.data.message
      //         :
      //         (error?.response.data?.error[0]?.msg
      //             ?
      //             error.response.data.error[0].msg : 'Something went wrong!');
      //     console.log('deleteAPI=104=', displayError)
      //     return displayError
      // })
      .finally(function () {
        // always executed
        console.log('deleteAPI=finally=');
      })
  );
};

export {getAPI, putAPI, postAPI, patchAPI, deleteAPI};
