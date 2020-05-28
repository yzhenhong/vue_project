import redirectConfirmList from './getRedirectConfirm';

export function setRedirectConfirm (currentRouteName,val) {
  let rc = redirectConfirmList.find((x) => x.routeName === currentRouteName);
  rc.canReturn= val
}