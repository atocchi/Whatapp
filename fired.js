const axios = require('axios');


async function fired(x){
    switch(x){
        case 'Goodbye':
            return 'Goodbye';
            break;
        case 'Hello':
            return 'Hello';
            break;
        case 'Sorry No Command exists':
            return 'Sorry No Command exists';
            break;
        case 1:
            let promise1 = new Promise((resolve, reject) => {
            axios.get('http://10.1.10.91:8080/api/fired').then(res => {
                let data = res.data;
                // console.log(data[data.length - 2])
                resolve(data[data.length - 2]);
            });})
                let result1 = await promise1;
                return result1;
            break;
        case 2:
            let promise2 = new Promise((resolve, reject) => {
            axios.get('http://10.1.10.91:8080/api/fired').then(res => {
                let data = res.data;
                let fireList = '';
                for(i=1; i < (data.length -1);i++){
                    fireList = `${fireList} ${data[i].name}`
                }
                // console.log(fireList)
                resolve(fireList);
            });});
                let result2 = await promise2;
                return result2;
            break;
        case 3:
            let promise3= new Promise((resolve, reject) => {
            axios.get('http://10.1.10.91:8080/api/fired').then(res => {
                let data = res.data;
                // console.log(data[data.length - 1])
                resolve(data[data.length - 1])
            });});
                let result3 = await promise3
                return result3;
    
            break;
        case 4:
            let promise4 = new Promise((resolve, reject) => {
            axios.get('http://10.1.10.91:8080/api/fired').then(res => {
                let data = res.data;
                // console.log(data[data.length - 1])
                resolve(data[data.length - 1])
            });});
            let result4 = await promise4;
            return result4;
            break;

        default:
            return 'Sorry No Command exists'
        
    }
}

module.exports = fired;