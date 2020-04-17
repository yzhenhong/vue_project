import wxjs from '@/utils/wxjsInterface';
export function goPay() {
  let url = `${process.env.WEB_HOST}/pay`;
  let link = wxjs.getOpenIdUrl(url);
  location.href = link;
}