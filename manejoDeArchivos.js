const fs = require('fs');

class Contenedor{
    constructor(nameFile) {
        this.nameFile = nameFile;
    }
    save({title,price,thumbnail}) {
        // const json = {...obj}
        let obj = {
                title,
                price,
                thumbnail,
            }
        let dataArray = [];
        try {
            const data =  fs.readFileSync(this.nameFile , 'utf-8');
            let dataArray = JSON.parse(data);
                        
            const id = dataArray[dataArray.length - 1].id + 1;
            obj.id = id;
            dataArray.push(obj);
            fs.writeFileSync(this.nameFile, JSON.stringify(dataArray));   
            } catch (e) {
                obj.id = 1;
                dataArray.push(obj);
                fs.writeFileSync(this.nameFile, JSON.stringify(dataArray));    
            }
    }
    getByID(idGet){
        try{
            const data = fs.readFileSync(this.nameFile, 'utf-8');
            const dataJson = JSON.parse(data.toString());
            
            const productoGet = dataJson.find(({id}) => id === idGet);
            console.log(productoGet);
        } 
        catch (error){
            console.log("[ERROR]",error);
        }
    }
    getAll(){
        try{
            const data = fs.readFileSync(this.nameFile, 'utf-8');
            const dataJson = JSON.parse(data);
            console.log(dataJson);
            return dataJson;
            } 
        catch (error){
            console.log(error);
        }
        }
    deleteById(idDelete){
        try{
            const data = fs.readFileSync(this.nameFile, 'utf-8');
            const dataJson = JSON.parse(data); 
            const productosNoBorrados = dataJson.filter(({id}) => id !== idDelete);

            console.log(`Se eliminó el producto con el id : ${idDelete}`);
            fs.writeFileSync(this.nameFile, JSON.stringify(productosNoBorrados));
        } catch(e){
            console.log(e);
        }
    }
    deleteAll(){
        try{
            fs.writeFileSync(this.nameFile, JSON.stringify([]));
            console.log('Se eliminaron todos los productos');
        }
        catch (error){
            console.log(error);
        }
    }
}

const productos = new Contenedor("productos.txt");
const escuadra = {"title": "Escuadra",
                    "price": 100,
                    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
                };
const regla = {"title": "regla",
                "price": 150,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
            };
const lapicera = {"title": "lapicera",
    "price": 150,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
};
const cuaderno = {"title": "cuaderno",
    "price": 150,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
};
console.log(`----------------------------------------------------------------`);
console.log(`------------------------Crando productos -----------------------`);
console.log(`----------------------------------------------------------------`);
productos.save(escuadra);
productos.save(regla);
productos.save(lapicera);
productos.save(cuaderno);
console.log(`----------------------------------------------------------------`);
console.log(`------------------------Get all productos-----------------------`);
console.log(`----------------------------------------------------------------`);
productos.getAll();
console.log(`----------------------------------------------------------------`);
console.log(`------------------------Get id productos------------------------`);
console.log(`----------------------------------------------------------------`);
productos.getByID(1);
console.log(`----------------------------------------------------------------`);
console.log(`--------------------deleteById productos------------------------`);
console.log(`----------------------------------------------------------------`);
productos.deleteById(2);
console.log(`----------------------------------------------------------------`);
console.log(`------------------------Get all productos-----------------------`);
console.log(`----------------------------------------------------------------`);
productos.getAll();
console.log(`----------------------------------------------------------------`);
console.log(`------------------------deleteAll all productos-----------------`);
console.log(`----------------------------------------------------------------`);
productos.deleteAll();
console.log(`----------------------------------------------------------------`);
console.log(`------------------------Get all productos-----------------------`);
console.log(`----------------------------------------------------------------`);
productos.getAll();