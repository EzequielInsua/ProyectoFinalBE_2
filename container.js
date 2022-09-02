const fs = require('fs');

module.exports = class Container {

    constructor(filename){
        this.filename = String().concat('.\/', filename);
        this.readFile()
            .then(data => {
                console.log(`Archivo cargado correctamente. Contenido: \n ${JSON.stringify(data)}`);
            })
            .catch(()=>{
                this.saveFile([])
                    .then( console.log("El archivo no existe. Archivo creado!") )
                    .catch( console.error("El archivo no existe y no se pudo crear."))
            })
    }


    async save(newObj){
        let obj = { ...newObj };
        try{
            const data = await this.readFile();
            let id = 1;
            if ( data.length > 0 ){
                const lastId = data[data.length-1].id
                id = lastId + 1;
            }
            obj['id'] = id;
            data.push(obj);
            await this.saveFile(data);
        }catch(er){
            console.error("Archivo no actualizado.")
        }

    }

    async getById(id){
        try {
            const content = await this.readFile();
            let element = content.find( obj => obj.id === id)
            return element
        }catch {
            console.error("Error al obtener el elemento")
        }  
    }

    async getAll(){
        return await this.readFile()
    }

    async deleteById(id){
        try {
            const content = await this.readFile();
            const element = content.filter( obj => obj.id !== id)
            await this.saveFile(element)
        }catch {
            console.error("Error al eliminar el elemento")
        }
        
    }

    async deleteAll(){
        try{
            await this.saveFile([]);
            console.log("Archivo borrado correctamente")
        }catch {
            console.error(`Error al borrar el contenido.`)
        }
    }

    readFile(){
        return new Promise((resolve, reject) => {
            fs.readFile(this.filename, 'utf8', (error, data) => {
                if(error){
                    console.error(`Error al leer el archivo: ${error.message}`);
                    reject(error);
                }
                resolve(JSON.parse(data));
            });
        })
    }

    saveFile(content){
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filename, JSON.stringify(content), (error)=>{
                if(error){
                    console.error(`Error al escribir el archivo: ${error}`);
                    reject();
                }
                resolve();
            });
        });
        
    }

}

const filename = 'productos.txt';

const regla = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'http://images/'
};

const calc = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'http://images/'
};

const globo = {
    title: 'Carpeta',
    price: 356.67,
    thumbnail: 'http://images/'
}; 

const lapicera = {
    title: 'Lapicera',
    price: 335.67,
    thumbnail: 'http://images/'
}; 