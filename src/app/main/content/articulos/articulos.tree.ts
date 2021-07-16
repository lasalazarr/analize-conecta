import { Category } from './articulos.component';

export const treeCategories: Array<Category> = [
    {   Nuevo: true,
        description: "nuevos",
        img: "nuevos.png" ,
    },
  //  { Grupo: "047", Categoria: "22 ", Genero: "03 ", description: "Prendas 60%", img: "boton60.png" },
   
    {
        description: "VER TODOS LOS PRODUCTOS",
        img: "all.png",
        All: true
    },
    {
        description: "mujer",
        img: "mujer.png",
        listCategory: [
            { Grupo: "037", Categoria: "14 ", Genero: "01 ", description: "OFERTAS", img: "oferta.png", },
            {
                description: "ROPA",
                img: "rmujer.png",
                listCategory: [
                    { Grupo: "010", Categoria: "01 ", Genero: "01 ", description: "ABRIGOS Y BLAZER",   img: "abrigos.png"},
                    { Grupo: "011", Categoria: "01 ", Genero: "01 ", description: "BLUSAS Y BLUSONES",   img: "blusas.png" },
                    { Grupo: "012", Categoria: "01 ", Genero: "01 ", description: "CHALECOS",   img: "chalecos.png" },
                    { Grupo: "013", Categoria: "01 ", Genero: "01 ", description: "CONJUNTOS DEPORTIVOS",   img: "deportivo.png" },
                    { Grupo: "014", Categoria: "01 ", Genero: "01 ", description: "FALDAS Y SHORTS" ,   img: "faldasysh.png"},
                    { Grupo: "015", Categoria: "01 ", Genero: "01 ", description: "JEANS Y PANTALONES",   img: "jeans.png" },
                    { Grupo: "016", Categoria: "01 ", Genero: "01 ", description: "PIJAMAS" ,   img: "Pijamas.png"},
                    { Grupo: "017", Categoria: "01 ", Genero: "01 ", description: "PRENDAS INTIMAS" ,   img: "lenceria.png"},
                    { Grupo: "018", Categoria: "01 ", Genero: "01 ", description: "TRAJES DE BAÑO" ,   img: "trajes.png"},
                    { Grupo: "019", Categoria: "01 ", Genero: "01 ", description: "VESTIDOS Y ENTERIZOS",   img: "Vestidos y enterizos.png" },
                ]
            },
            {
                description: "CALZADO",
                img: "calzadom.png",
                listCategory: [
                    { Grupo: "001", Categoria: "03 ", Genero: "01 ", description: "BALETAS" ,   img: "Baletas.png"},
                    { Grupo: "002", Categoria: "03 ", Genero: "01 ", description: "BOTAS" ,   img: "Botas.png"},
                    { Grupo: "003", Categoria: "03 ", Genero: "01 ", description: "DEPORTIVOS" ,   img: "Deportivoscm.png"},
                    { Grupo: "004", Categoria: "03 ", Genero: "01 ", description: "MAGNOLIAS" ,   img: "Magnolias.png"},
                    { Grupo: "005", Categoria: "03 ", Genero: "01 ", description: "MOCASIN" ,   img: "Mocasin.png"},
                    { Grupo: "006", Categoria: "03 ", Genero: "01 ", description: "OXFORD" ,   img: "Oxford.png"},
                    { Grupo: "007", Categoria: "03 ", Genero: "01 ", description: "SANDALIAS" ,   img: "Sandalias.png"},
                    { Grupo: "008", Categoria: "03 ", Genero: "01 ", description: "TACON" ,   img: "tacon.png"},
                    { Grupo: "009", Categoria: "03 ", Genero: "01 ", description: "ZAPATO CASUAL" ,   img: "Zapato casual.png"},
                ]
            },

        ]
    },
    {
        description: "hombre",
        img: "hombre.png",
        listCategory: [
            {Grupo: "031", Categoria: "15 ", Genero: "02 ", description: "OFERTAS",
            img: "ofertash.png", },
            {
                description: "ROPA",
                img: "ropahombre.png",
                listCategory: [
                    { Grupo: "025", Categoria: "02 ", Genero: "02 ", description: "BERMUDAS Y SHORTS" ,   img: "Bermudas y Shorts.png" },
                    { Grupo: "026", Categoria: "02 ", Genero: "02 ", description: "CAMISAS" ,   img: "Camisas.png" },
                    { Grupo: "027", Categoria: "02 ", Genero: "02 ", description: "CAMISETAS" ,   img: "Camisetas.png"},
                    { Grupo: "028", Categoria: "02 ", Genero: "02 ", description: "CHAQUETAS Y BUZOS" ,   img: "Chaquetas y buzos.png"},
                    { Grupo: "029", Categoria: "02 ", Genero: "02 ", description: "JEAN Y PANTALONES" ,   img: "Jeans y pantalones.png"},
                    { Grupo: "030", Categoria: "02 ", Genero: "02 ", description: "ROPA INTERIOR" ,   img: "Ropa interiorh.png"},
                ]
            },
            {
                description: "CALZADO",
                img: "calzadoh.png",
                listCategory: [
                    { Grupo: "020", Categoria: "04 ", Genero: "02 ", description: "BOTIN" ,   img: "Botin.png"},
                    { Grupo: "021", Categoria: "04 ", Genero: "02 ", description: "DEPORTIVO" ,   img: "Deportivoch.png"},
                    { Grupo: "022", Categoria: "04 ", Genero: "02 ", description: "MOCASIN" ,   img: "Mocasin.png"},
                    { Grupo: "023", Categoria: "04 ", Genero: "02 ", description: "ZAPATO CASUAL" ,   img: "Zapato Casual.png"},
                    { Grupo: "024", Categoria: "04 ", Genero: "02 ", description: "ZAPATO FORMAL" ,   img: "Zapato formal.png"},
                ]
            },

        ]
    },
    { Grupo: "036", Categoria: "10 ", Genero: "03 ", description: "INSUMOS MEDICOS", img: "insumosmedicos.png" },
    { Grupo: "032", Categoria: "06 ", Genero: "03 ", description: "CUIDADO PERSONAL", img: "cuidadopersonal.png" },
    { Grupo: "039", Categoria: "13 ", Genero: "03 ", description: "ALIMENTACION", img: "alimentos.png" },
   
    { Grupo: "035", Categoria: "09 ", Genero: "03 ", description: "HOGAR", img: "hogar.png" },
    { Grupo: "038", Categoria: "12 ", Genero: "03 ", description: "TECNOLOGIA", img: "tecnologia.png", listCategory: [] },
   
]
