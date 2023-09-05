const all = document.querySelector('#all');
const kor = document.querySelector('#kor');
const jap = document.querySelector('#jap');
const usa = document.querySelector('#usa');
const aisan = document.querySelector('#aisan');
const meat = document.querySelector('#meat');
const seefd = document.querySelector('#seefd');
const night = document.querySelector('#night');
const axios = require('axios')


all.addEventListener('click',async(event)=> {
    let frm = document.tag;
    if (frm.all.value) {
        frm.method = 'post'
        frm.submit();
        console.log('작동중인가여',frm.submit())
    }
})


kor.addEventListener('click',async(event)=> {
    let frm = document.tag;
    if (frm.kor.value) {
        frm.method = 'post'
        frm.submit();
    }
})


// all.addEventListener('click',async(event)=>{
//     console.log('작동 가능?',event)
//         const url = 'http://localhost:3000/eat?data_filter=all'
//         let response = fetch(url,{method:"get",headrs:{"Content-Type":"application/json",},body:JSON.stringify({})
//         ,})
//         console.log('리스폰스', response)
//         // const datas = await response.json();
//         // console.log('datas???????', datas.exists)
//
//         //const datapath = JSON.stringify(response)
//         //const datapath = await
//         // console.log('datapath인가요?',datapath.exists)
// })
// kor.addEventListener('click',async(event)=>{
//     console.log('작동 가능?')
//         const data = 'kor'
//        let response = await fetch(`http://localhost:3000/eat?data_filter=${data}`)
//         const datapath = await response.json();
//         console.log('---------',datapath.exists)
// })
// jap.addEventListener('click',async(event)=>{
//         const data = 'jap'
//         await fetch(`/eat?data_filter=${data}`)
// })
// usa.addEventListener('click',async(event)=>{
//         const data = 'usa'
//         await fetch(`/eat?data_ilter=${data}`)
// })
// aisan.addEventListener('click',async(event)=>{
//         const data = 'aisan'
//         await fetch(`/eat?data_filter=${data}`)
// })
// meat.addEventListener('click',async(event)=>{
//         const data = 'meat'
//         await fetch(`/eat?data_filter=${data}`)
// })
// seefd.addEventListener('click',async(event)=>{
//         const data = 'seefd'
//         await fetch(`/eat?data_filter=${data}`)
// })
// night.addEventListener('click',async(event)=>{
//         const data = 'night'
//         await fetch(`/eat?data_filter=${data}`)
// })
