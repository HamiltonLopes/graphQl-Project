import {readFile, writeFile} from 'fs';
import { resolve } from 'path';

function createRepository(name){
    const path = resolve(__dirname, `../../data/${name}.json`)
    return{
        
        read: () => new Promise((resolve, reject) => {
            readFile(path, (err, data)=>{
                if (err)
                    return reject(err);

                resolve(JSON.parse(data));
            })
        }),

        write: (data) => new Promise((resolve, reject) => {
            writeFile(path, JSON.stringify(data), (err)=>{
                if (err) 
                    return reject(err);

                resolve();
            })
        }),

    }
}

export default createRepository;