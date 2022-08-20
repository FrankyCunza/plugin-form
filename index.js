import { HookFormPanel, CustomFieldHook } from "./modules_aputek/components/form/index.js";

// const form = [{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Condiciones físicas","name":"condiciones_fsicas","options":[{"title":"ALTA","value":"ALTA"},{"title":"menos de 140","value":"menos de 140"},{"title":"140-160","value":"140-160"},{"title":"más de 160","value":"más de 160"},{"title":"","value":""}],"pattern":"","position":1,"required":true,"type":"h6","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Índice de masa corporal","name":"ndice_de_masa_corporal","options":[{"title":"Bajo 18,5","value":"Bajo 18,5"},{"title":"18,5 - 24,9","value":"18,5 - 24,9"},{"title":"25 - 29.9","value":"25 - 29.9"},{"title":"30 o más","value":"30 o más"}],"pattern":"","position":2,"required":true,"type":"radio-multiple","value":""},{"alternateName":"","columns":"1","hidden":false,"html":"","info":"","label":"Hábitos no saludables","name":"hbitos_no_saludables","options":[{"icon":"https://cdn-icons-png.flaticon.com/512/924/924514.png","required":false,"textarea":false,"title":"Café","value":"Café"},{"icon":"https://cdn-icons-png.flaticon.com/128/595/595766.png","required":true,"textarea":false,"title":"Cigarrillo","value":"Cigarrillo"},{"icon":"https://cdn-icons-png.flaticon.com/128/931/931949.png","required":true,"textarea":true,"title":"Alcohol","value":"Alcohol"},{"icon":"https://cdn-icons.flaticon.com/png/128/1188/premium/1188126.png?token=exp=1653060145~hmac=965dc10980daeaff238a713ad6c62fe6","required":false,"textarea":false,"title":"Drogas","value":"Drogas"}],"pattern":"","position":3,"required":true,"type":"checkbox","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Actividad física","name":"actividad_fsica","options":[{"title":"Más de 3 veces a la semana","value":"Más de 3 veces a la semana"},{"title":"Menos de 3 veces a la semana","value":"Menos de 3 veces a la semana"}],"pattern":"","position":4,"required":true,"type":"checkbox","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Glicemia basal","name":"glicemia_basal","options":[{"title":"Menor de 70 mg/dl","value":"Menor de 70 mg/dl"},{"title":"Entre 70 y 110 mg-dl","value":"Entre 70 y 110 mg-dl"},{"title":"Más de 110 mg/dl","value":"Más de 110 mg/dl"}],"pattern":"","position":5,"required":true,"type":"checkbox","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Estrés","name":"estrs","options":[{"title":"Laboral","value":"Laboral"},{"title":"Personal","value":"Personal"}],"pattern":"","position":6,"required":true,"type":"checkbox","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Síntoma agregado","name":"sntoma_agregado","options":[{"title":"Dolor de pecho","value":"Dolor de pecho"},{"title":"Dolor de cabeza y/o vómitos","value":"Dolor de cabeza y/o vómitos"},{"title":"Dificultad para respirar","value":"Dificultad para respirar"},{"title":"Disminución de fuerza en una pierna o un brazo","value":"Disminución de fuerza en una pierna o un brazo"}],"pattern":"","position":7,"required":true,"type":"checkbox","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Presión arterial","name":"presin_arterial","options":[{"title":"ALTA","value":"ALTA"},{"title":"menos de 140","value":"menos de 140"},{"title":"140-160","value":"140-160"},{"title":"más de 160","value":"más de 160"}],"pattern":"","position":8,"required":true,"type":"checkbox","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Presión","name":"presin","options":[],"pattern":"","position":9,"required":true,"type":"h6","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Sistólica","name":"sistlica","options":[],"pattern":"","position":10,"required":true,"type":"number","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Diastólica","name":"diastlica","options":[],"pattern":"","position":11,"required":true,"type":"number","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Pulsaciones","name":"pulsaciones","options":[],"pattern":"","position":12,"required":true,"type":"number","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Ejercicio","name":"ejercicio","options":[],"pattern":"","position":13,"required":true,"type":"radio","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Tiempo","name":"tiempo","options":[{"title":"Caminar","value":"Caminar"},{"title":"Correr","value":"Correr"},{"title":"Gimnasio","value":"Gimnasio"},{"title":"Bicicleta","value":"Bicicleta"},{"title":"Otros","value":"Otros"},{"title":"","value":""}],"pattern":"","position":14,"required":true,"type":"number","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Tipo","name":"tipo","options":[{"title":"Caminar","value":"Caminar"},{"title":"Correr","value":"Correr"},{"title":"Gimnasio","value":"Gimnasio"},{"title":"Bicicleta","value":"Bicicleta"},{"title":"Otros","value":"Otros"}],"pattern":"","position":15,"required":true,"type":"checkbox","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Alimentación","name":"alimentacin","options":[{"title":"Alto en sal","value":"Alto en sal"},{"title":"Alto en Azúcares","value":"Alto en Azúcares"}],"pattern":"","position":16,"required":true,"type":"checkbox","value":""},{"alternateName":"","columns":"1","hidden":false,"info":"","label":"Síntomas","name":"sntomas","options":[{"title":"Dolor de pecho","value":"Dolor de pecho"},{"title":"Dolor de cabeza","value":"Dolor de cabeza"}],"pattern":"","position":17,"required":true,"type":"checkbox","value":""},{"alternateName":"sads","columns":"1","hidden":false,"html":"","info":"info","label":"Comidas","name":"sads","options":[{"icon":"","required":false,"textarea":false,"title":"lechug","value":"lechuga"},{"icon":"","required":false,"textarea":false,"title":"tomate","value":"tomate"}],"pattern":"","position":18,"required":true,"type":"radio-multiple","value":""}]
const form = {
    "constructor": {
        "actividad_fsica": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "Actividad f\u00edsica", 
          "name": "actividad_fsica", 
          "options": [
            {
              "title": "M\u00e1s de 3 veces a la semana", 
              "value": "M\u00e1s de 3 veces a la semana"
            }, 
            {
              "title": "Menos de 3 veces a la semana", 
              "value": "Menos de 3 veces a la semana"
            }
          ], 
          "pattern": "", 
          "position": 6, 
          "required": true, 
          "type": "checkbox", 
          "value": ""
        }, 
        "alimentacin": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "Alimentaci\u00f3n", 
          "name": "alimentacin", 
          "options": [
            {
              "title": "Consumo de grasas o fritos", 
              "value": "Consumo de grasas o fritos"
            }, 
            {
              "title": "Consumo de az\u00facares", 
              "value": "Consumo de az\u00facares"
            }, 
            {
              "title": "Consumo de sal en exceso", 
              "value": "Consumo de sal en exceso"
            }
          ], 
          "pattern": "", 
          "position": 5, 
          "required": true, 
          "type": "checkbox", 
          "value": ""
        }, 
        "condiciones_fsicas": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "Condiciones f\u00edsicas", 
          "name": "condiciones_fsicas", 
          "options": [
            {
              "title": "", 
              "value": ""
            }
          ], 
          "pattern": "", 
          "position": 3, 
          "required": true, 
          "type": "h6", 
          "value": ""
        }, 
        "estrs": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "Estr\u00e9s", 
          "name": "estrs", 
          "options": [
            {
              "title": "Laboral", 
              "value": "Laboral"
            }, 
            {
              "title": "Personal", 
              "value": "Personal"
            }
          ], 
          "pattern": "", 
          "position": 8, 
          "required": true, 
          "type": "checkbox", 
          "value": ""
        }, 
        "glicemia_basal": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "Glicemia basal", 
          "name": "glicemia_basal", 
          "options": [
            {
              "title": "Menor de 70 mg/dl", 
              "value": "Menor de 70 mg/dl"
            }, 
            {
              "title": "Entre 70 y 110 mg-dl", 
              "value": "Entre 70 y 110 mg-dl"
            }, 
            {
              "title": "M\u00e1s de 110 mg/dl", 
              "value": "M\u00e1s de 110 mg/dl"
            }
          ], 
          "pattern": "", 
          "position": 7, 
          "required": true, 
          "type": "checkbox", 
          "value": ""
        }, 
        "hbitos_no_saludables": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "H\u00e1bitos no saludables", 
          "name": "hbitos_no_saludables", 
          "options": [
            {
              "icon": "https://cdn-icons-png.flaticon.com/512/6919/6919883.png", 
              "title": "Caf\u00e9", 
              "value": "Caf\u00e9"
            }, 
            {
              "icon": "https://cdn-icons-png.flaticon.com/512/6919/6919883.png", 
              "title": "Cigarrillo", 
              "value": "Cigarrillo"
            }, 
            {
              "icon": "https://cdn-icons-png.flaticon.com/512/6919/6919883.png", 
              "title": "Alcohol", 
              "value": "Alcohol"
            }, 
            {
              "icon": "", 
              "title": "Drogas", 
              "value": "Drogas"
            }
          ], 
          "pattern": "", 
          "position": 4, 
          "required": true, 
          "type": "checkbox", 
          "value": ""
        }, 
        "ndice_de_masa_corporal": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "\u00cdndice de masa corporal", 
          "name": "ndice_de_masa_corporal", 
          "options": [
            {
              "title": "Bajo 18,5", 
              "value": "Bajo 18,5"
            }, 
            {
              "title": "18,5 - 24,9", 
              "value": "18,5 - 24,9"
            }, 
            {
              "title": "25 - 29.9", 
              "value": "25 - 29.9"
            }, 
            {
              "title": "30 o m\u00e1s", 
              "value": "30 o m\u00e1s"
            }
          ], 
          "pattern": "", 
          "position": 2, 
          "required": true, 
          "type": "radio-multiple", 
          "value": ""
        }, 
        "presin_arterial": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "Presi\u00f3n arterial", 
          "name": "presin_arterial", 
          "options": [
            {
              "title": "ALTA", 
              "value": "ALTA"
            }, 
            {
              "title": "menos de 140", 
              "value": "menos de 140"
            }, 
            {
              "title": "140-160", 
              "value": "140-160"
            }, 
            {
              "title": "m\u00e1s de 160", 
              "value": "m\u00e1s de 160"
            }
          ], 
          "pattern": "", 
          "position": 10, 
          "required": true, 
          "type": "checkbox", 
          "value": ""
        }, 
        "resultado_glicemia": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "Resultado glicemia", 
          "name": "resultado_glicemia", 
          "options": [], 
          "pattern": "", 
          "position": 1, 
          "required": false, 
          "type": "text", 
          "value": ""
        }, 
        "sntoma_agregado": {
          "alternateName": "", 
          "columns": "1", 
          "hidden": false, 
          "info": "", 
          "label": "S\u00edntoma agregado", 
          "name": "sntoma_agregado", 
          "options": [
            {
              "title": "Dolor de pecho", 
              "value": "Dolor de pecho"
            }, 
            {
              "title": "Dolor de cabeza y/o v\u00f3mitos", 
              "value": "Dolor de cabeza y/o v\u00f3mitos"
            }, 
            {
              "title": "Dificultad para respirar", 
              "value": "Dificultad para respirar"
            }, 
            {
              "title": "Disminuci\u00f3n de fuerza en una pierna o un brazo", 
              "value": "Disminuci\u00f3n de fuerza en una pierna o un brazo"
            }
          ], 
          "pattern": "", 
          "position": 9, 
          "required": true, 
          "type": "checkbox", 
          "value": ""
        }
      }, 
      "languages": {
        "en": {
          "actividad_fsica": {
            "label": "Actividad f\u00edsica"
          }, 
          "alimentacin": {
            "label": "Alimentaci\u00f3n"
          }, 
          "condiciones_fsicas": {
            "label": "Condiciones f\u00edsicas"
          }, 
          "estrs": {
            "label": "Estr\u00e9s"
          }, 
          "glicemia_basal": {
            "label": "Glicemia basal"
          }, 
          "hbitos_no_saludables": {
            "label": "H\u00e1bitos no saludables"
          }, 
          "ndice_de_masa_corporal": {
            "label": "\u00cdndice de masa corporal"
          }, 
          "presin_arterial": {
            "label": "Presi\u00f3n arterial"
          }, 
          "resultado_glicemia": {
            "label": "Resultado glicemia"
          }, 
          "sntoma_agregado": {
            "label": "S\u00edntoma agregado"
          }
        }, 
        "es": {
          "actividad_fsica": {
            "label": "Actividad f\u00edsica"
          }, 
          "alimentacin": {
            "label": "Alimentaci\u00f3n"
          }, 
          "condiciones_fsicas": {
            "label": "Condiciones f\u00edsicas"
          }, 
          "estrs": {
            "label": "Estr\u00e9s"
          }, 
          "glicemia_basal": {
            "label": "Glicemia basal"
          }, 
          "hbitos_no_saludables": {
            "label": "H\u00e1bitos no saludables"
          }, 
          "ndice_de_masa_corporal": {
            "label": "\u00cdndice de masa corporal"
          }, 
          "presin_arterial": {
            "label": "Presi\u00f3n arterial"
          }, 
          "resultado_glicemia": {
            "label": "Resultado glicemia"
          }, 
          "sntoma_agregado": {
            "label": "S\u00edntoma agregado"
          }
        }
      }
 }
//  console.log(form)
document.querySelector("custom-hook-form-panel").updateData(form)
document.querySelector("custom-hook-form-panel").saveFunction = () => {
    console.log("Sending")
}