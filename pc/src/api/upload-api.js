import axios from 'axios'

export function upload (file) {
  return new Promise(resolve => {
    let url = '/api/v1/query/upload/url'
    // 避免文件名重复
    let name = (new Date()).getTime() + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
    axios.get(url, {
      params: {
        name,
        type: '1',
      }
    }).then((res) => {
      console.log(res)
      var upload_url = (res.data.data.url).split("https://cos.xgeeklab.com")[1];
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      axios.put(upload_url, file, config).then(re => {
        // console.log(re)
        if (re.status === 200) {
          resolve({code: 0, data: {visitUrl: res.data.data.visitUrl}})
        } else {
          resolve({code: -1, message: 'error'})
        }
      }).catch(err=>{
        console.log(err)
      })
    }).catch(error=>{
      console.log(error)
    })
  })
}
