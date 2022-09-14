const fs = require('fs');

module.exports = class Container{

    constructor(filename){
        this.filename = String().concat('.\/', filename);
        this.readFile()
            .then(data => {
                console.log(`Archivo cargado correctamente.`);
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
            console.log(obj);
            await this.saveFile(data);
        }catch(er){
            console.error(`Archivo no actualizado: ${error.message}`)
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

    async editById(id,newObj){
        let obj = { ...newObj };
        let {title,price,thumbnail} = obj;
        try {
            const content = await this.readFile();
            let productos = content.filter( obj => obj.id !== id);
            let producto = content.find( obj => obj.id === id);
            producto.title = title;
            producto.price = price;
            producto.thumbnail = thumbnail;
            productos.push(producto);
            productos.sort(function (a, b) {
                if (a.id > b.id) { return 1 }
                if (a.id < b.id) { return -1 }
            });
            await this.saveFile(productos);
        } catch{
            console.error("Error al editar el elemento")
        }
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
