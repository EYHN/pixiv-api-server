const nextTick = new Promise((resolve,reject)=>{
  process.nextTick(resolve);
})

export default nextTick;