import { HOOKFORMINPUTCLASS, HOOKFORMTYPES, HOOKFORMCOUNTRIES } from "../../config/index.js"
import { validateForm } from "./validate.js"

export class HookFormPanel extends HTMLElement {
    constructor() {
        super()
        this.type = "add"
        this.indexSection = null
        this.indexBlock = null
        this.indexField = null
        this.currentSection = null
        this.blocks = null
        this.currentBlock = null
        this.fields = null
        this.currentField = null
        this.language = HOOKFORMCOUNTRIES[0]['name']
        this.data = {}
        this.levels = 1
    }

    static get observedAttributes() {
        return [""];
    }

    disconnectedCallback() {
        // console.log("Removed")
    }

    printLanguages() {
        let html = ""
        HOOKFORMCOUNTRIES.forEach(el => {
            html += `<option value="${el.name}">${el.title}</option>`
        })
        return html
    }

    constructConfig() {
        let html = ""
        html += `
            <div class="grid grid-cols-3">
                <div class="p-4">
                    <custom-field label="Columnas" data-value="${this.data.columns}" type="text"></custom-field>
                </div>
                <div class="p-4">
                    <custom-field type="select" label="Language">
                        ${this.printLanguages()}
                    </custom-field>
                </div>
            </div>
        `
        return html
    }

    constructBody() {
        let htmlSection = `
               <div data-column="section"></div>
          `
        let htmlBlock = `
               <div data-column="block"></div>
          `
        let htmlField = `
               <div data-column="field"></div>
          `
        let htmlButtonActions = `
               <div class="grid grid-cols-${this.levels} text-gray-800 w-full">
          `
        switch (this.levels) {
            case 1:
                htmlButtonActions += htmlField
                break;
            case 2:
                htmlButtonActions += htmlBlock + htmlField
                break;
            case 3:
                htmlButtonActions += htmlSection + htmlBlock + htmlField
                break;
            default:
                break;
        }
        htmlButtonActions += `</div>`
        return htmlButtonActions
    }

    constructTop() {
        let htmlSection = `
               <div class="w-full">
                    <button data-action="modal" data-name="section" 
                    class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-400 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                        Create section
                    </button>
               </div>
          `
        let htmlBlock = `
               <div>
                    <button data-action="modal" data-name="block"
                    class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-400 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                        Create block
                    </button>
               </div>
          `
        let htmlField = `
               <div>
                    <button data-action="modal" data-name="field" 
                    class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-400 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                        Create field
                    </button>
               </div>
          `
        let htmlButtonActions = `
               <div class="grid grid-cols-${this.levels} text-gray-800 w-full">
          `
        switch (this.levels) {
            case 1:
                htmlButtonActions += htmlField
                break;
            case 2:
                htmlButtonActions += htmlBlock + htmlField
                break;
            case 3:
                htmlButtonActions += htmlSection + htmlBlock + htmlField
                break;
            default:
                break;
        }
        htmlButtonActions += `</div>`
        return htmlButtonActions
    }

    constructLines() {
        let html = ""
        html += `<div class="grid grid-cols-${this.levels} absolute top-0 left-0 w-full h-full pointer-events-none z-10">`;
        const quantity = [... new Array(this.levels)]
        quantity.forEach((el, i) => {
            html += `<div class="${i < (this.levels-1) ? "border-solid border-r border-gray-400" : ""}"></div>`
        })
        html += `</div>`
        return html
    }

    constructTypes(type = "") {
        let html = ""
        HOOKFORMTYPES.forEach(el => {
            html += `<option value="${el.name}" ${type === el.name ? "selected" : ""}>${el.title}</option>`
        })
        return html
    }

    printModals({ column, type, values }) {
        let html = ""
        let htmlModalSection = `
            <h2 class="font-bold text-xl text-gray-800 mb-3">${type === "edit" ? "Edit" : "Add"} section</h2>
            <custom-field type="text" data-value="${values}" onlyfield="true" required="true" name="inputsection"></custom-field>
            <button type="button" data-action="savesection" class="mt-3 bg-blue-600 px-4 py-3 w-full rounded-xl text-white">Save</button>
          `
        let htmlModalBlock = `
            <h2 class="font-bold text-xl text-gray-800 mb-3">${type === "edit" ? "Edit" : "Add"} block</h2>
            <custom-field type="text" data-value="${values}" onlyfield="true" required="true" name="inputblock"></custom-field>
            <button type="button" data-action="saveblock" class="mt-3 bg-blue-600 px-4 py-3 w-full rounded-xl text-white">Save</button>
          `
        let htmlModalField = `
            <h2 class="font-bold text-xl text-gray-800 mb-3">${type === "edit" ? "Edit" : "Add"} field</h2>
            <form novalidate class="grid grid-cols-3 gap-3" id="formpanel">
                <custom-field type="text" data-value="${values?.label || ""}" required="true" label="Label" name="label"></custom-field>
                <custom-field type="text" data-value="${values?.additionalName || ""}" label="Aditional Name" name="additionalName"></custom-field>
                <custom-field type="text" data-value="${values?.info || ""}" label="Info" name="info"></custom-field>
                <custom-field type="text" data-value="${values?.alternateName || ""}" label="Alternate name" name="alternateName"></custom-field>
                <custom-field type="select" label="Columns" name="columns">
                    <option value="1" ${values?.columns === 1 ? "selected" : ""}>1</option>
                    <option value="2" ${values?.columns === 2 ? "selected" : ""}>2</option>
                    <option value="3" ${values?.columns === 3 ? "selected" : ""}>3</option>
                </custom-field>
                <custom-field type="text" data-value="${values?.pattern || ""}" label="Pattern" name="pattern"></custom-field>
                <custom-field type="select" label="Type" name="type">
                    ${this.constructTypes(values?.type)}
                </custom-field>
                <custom-field type="select" label="Required" name="required">
                    <option value="true" ${values?.required === true ? "selected" : ""}>Yes</option>
                    <option value="false" ${values?.required === false ? "selected" : ""}>No</option>
                </custom-field>
            </form>
            <div class="flex flex-col mt-4 border border-gray-300 rounded-xl p-3 hidden">
                <div class="flex items-center gap-2 mb-2">
                    <label class="text-gray-800 font-medium">Options</label>
                    <button class="bg-blue-50 tetx-xs text-blue-600 px-2 py-2 rounded-md font-medium" data-action="addOption">Add</button>
                </div>
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50 h-12">
                                <tr>
                                    <th class="font-medium text-left px-3">Name</th>
                                    <th class="font-medium text-left px-3">Value</th>
                                    <th class="font-medium text-left px-3">Icon</th>
                                    <th class="font-medium text-left px-3">Required</th>
                                    <th class="font-medium text-left px-3">Textarea</th>
                                </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="flex flex-col mt-4 border border-gray-300 rounded-xl p-3 hidden">
                <div class="flex items-center gap-2 mb-2">
                    <label class="text-gray-800 font-medium">HTML</label>
                </div>
                <textarea class="${HOOKFORMINPUTCLASS} pt-4" style="height: 150px;"></textarea>
            </div>
            <div class="w-full flex justify-end">
            <button type="button" data-action="savefield" class="mt-3 bg-blue-600 px-4 py-3 w-full rounded-xl text-white">
                Save
            </button>
            </div>
          `
        switch (column) {
            case "section":
                html = htmlModalSection
                break;
            case "block":
                html = htmlModalBlock
                break;
            case "field":
                html = htmlModalField
                break;
        }
        return html
    }

    constructModal() {
        return `
            <div class="fixed w-screen h-screen top-0 left-0 py-10 flex items-center justify-center z-20 hidden" data-modal="modal">
                <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-screen" data-action="modal"></div>
                <div 
                    class="bg-white p-5 rounded-xl relative max-w-3xl w-full h-max overflow-y-auto" 
                    style="max-height: 90vh" id="contentmodal">
                </div>
            </div>
    `
    }

    toggleModal({ column, type = "add", values }) {
        this.querySelector("[data-modal]").classList.toggle("hidden")
        this.querySelector("[id='contentmodal']").innerHTML = this.printModals({ column, type, values })
    }

    updateData(data = {
        columns: 2,
        form: [
            {
                "position": 1,
                "title": {
                    "en": "Personal Data",
                    "es": "Informacion Personal"
                },
                "blocks": [
                    {
                        "title": {
                            "en": "Personal",
                            "es": "Personal",
                        },
                        "fields": {
                            "constructor": {
                                "age": {
                                    "type": "text",
                                    "name": "age",
                                    "pattern": "",
                                    "position": 4,
                                    "info": "Info",
                                    "additionalName": "Additional Name",
                                    "alternateName": "Alternate Name",
                                    "pattern": "Pattern",
                                    "type": "number",
                                    "required": true,
                                    "columns": 2
                                },
                                "names": {
                                    "type": "text",
                                    "name": "names",
                                    "pattern": "",
                                    "position": 4,
                                    "info": "Info",
                                    "additionalName": "Additional Name",
                                    "alternateName": "Alternate Name",
                                    "pattern": "Pattern",
                                    "type": "radio",
                                    "required": false,
                                    "columns": 3
                                }
                            },
                            "languages": {
                                "es": {
                                    "age": {
                                        "label": "Edad"
                                    },
                                    "names": {
                                        "label": "Nombres"
                                    }
                                },
                                "en": {
                                    "age": {
                                        "label": "Age"
                                    },
                                    "names": {
                                        "label": "Names"
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                "position": 2,
                "title": {
                    "en": "Personal Data Dos",
                    "es": "Informacion Personal Dos"
                },
                "blocks": [
                    {
                        "title": {
                            "en": "Personal Dos",
                            "es": "Personal Dos",
                        },
                        "fields": {
                            "constructor": {
                                "age": {
                                    "type": "text",
                                    "name": "age",
                                    "pattern": "",
                                    "position": 4
                                },
                                "names": {
                                    "type": "text",
                                    "name": "names",
                                    "pattern": "",
                                    "position": 4
                                }
                            },
                            "languages": {
                                "es": {
                                    "age": {
                                        "label": "Edad Dos"
                                    },
                                    "names": {
                                        "label": "Nombres Dos"
                                    }
                                },
                                "en": {
                                    "age": {
                                        "label": "Age Dos"
                                    },
                                    "names": {
                                        "label": "Names Dos"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }) {
        this.data = data
        if (this.levels == 3) {
            let html = ""
            this.data.form.forEach((el, index) => {
                html += this.buttonColumn({ column: "section", index: index, el: el, title: el['title'][this.language] })
            })
            this.querySelector("[data-column='section']").innerHTML = html
        }
    }

    buttonColumn({ column, index, el, title, key = "" }) {
        return `
            <div class="flex">
                <button 
                    type="button" 
                    data-index="${index}" 
                    data-key="${key}"
                    data-column="${column}"
                    data-action="column${column}" 
                    class="focus:outline-none focus:ring-4 ring-inset focus:ring-blue-300 bg-gray-50 text-gray-800 font-medium p-3 w-full hover:bg-gray-100">
                    ${title}
                </button>
                <div class="grid grid-cols-2">
                    <button 
                        data-index="${index}" 
                        data-key="${key}"   
                        data-column="${column}" 
                        data-action="edit${column}" 
                        class="bg-blue-600 px-2 flex items-center justify-center text-white">
                        <i class="fas fa-edit pointer-events-none text-xs"></i>
                    </button>
                    <button class="bg-red-600 px-2 flex items-center justify-center text-white">
                        <i class="fas fa-edit pointer-events-none text-xs"></i>
                    </button>
                    <button class="bg-yellow-600 px-2 flex items-center justify-center text-white">
                        <i class="fas fa-edit pointer-events-none text-xs"></i>
                    </button>
                    <button class="bg-green-600 px-2 flex items-center justify-center text-white">
                        <i class="fas fa-edit pointer-events-none text-xs"></i>
                    </button>
                </div>
            </div>
        `
    }

    columns({ index, column }) {
        if (column === "section") {
            this.indexSection = index
            let html = ""
            this.data.form[this.indexSection]['blocks'].forEach((el, index) => {
                html += this.buttonColumn({ column: "block", index: index, el: el, title: el['title'][this.language] })
            })
            this.querySelector("[data-column='block']").innerHTML = html
            this.querySelector("[data-column='field']").innerHTML = ""
        }

        if (column === "block") {
            this.indexBlock = index
            console.log(this.data.form[this.indexSection]['blocks'][this.indexBlock])
            let html = ""
            let fields = this.data.form[this.indexSection]['blocks'][this.indexBlock]['fields']
            let indexField = 0
            Object.entries(fields['constructor']).forEach(([k, v]) => {
                html += this.buttonColumn({ 
                    column: "field", 
                    index: indexField, 
                    el: v, 
                    title: fields['languages'][this.language][k]['label'],
                    key: k
                })
                indexField++
            })
            this.querySelector("[data-column='field']").innerHTML = html
        }
    }

    editColumn({ column, index, key }) {
        this.type = "edit"
        console.log(column)
        let values = null
        switch (column) {
            case "section":
                this.indexSection = index
                values = this.data['form'][this.indexSection]['title'][this.language]
            break;
                case "block":
                this.indexBlock = index
                values = this.data['form'][this.indexSection]['blocks'][this.indexBlock]['title'][this.language]
            break;
            case "field":
                this.indexField = index
                let field = this.data['form'][this.indexSection]['blocks'][this.indexBlock]['fields']
                console.log(field)
                values = {
                    label: field['languages'][this.language][key]['label'],
                    additionalName: field['constructor'][key]['additionalName'],
                    info: field['constructor'][key]['info'],
                    alternateName: field['constructor'][key]['alternateName'],
                    columns: field['constructor'][key]['columns'],
                    pattern: field['constructor'][key]['pattern'],
                    type: field['constructor'][key]['type'],
                    required: field['constructor'][key]['required']
                }
                break;
        }
        this.toggleModal({ column: column, type: "edit", values: values })
    }

    saveSection() {
        validateForm({ selector: "[data-modal]" })
        .then(res => {
            console.log(res[1])
        }).catch(err => {
            console.log(err)
        })
    }

    saveBlock() {
        validateForm({ selector: "[data-modal]" })
        .then(res => {
            console.log(res[1])
        }).catch(err => {
            console.log(err)
        })
    }

    saveField() {
        validateForm({ selector: "[id='formpanel']" })
        .then(res => {
            console.log(res[1])
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        let html = ""
        html += "<div class='relative shadow border border-gray-300'>"
        html += this.constructConfig()
        html += this.constructLines()
        html += this.constructTop()
        html += this.constructBody()
        html += this.constructModal()
        html += "</div>"
        this.innerHTML = html

        this.addEventListener("click", e => {
            switch (e.target.dataset.action) {
                case "modal":
                    this.toggleModal({ column: e.target.dataset.name })
                    break;
                case "savesection":
                    this.saveSection()
                    break;
                case "saveblock":
                    this.saveBlock()
                    break;
                case "savefield":
                    this.saveField()
                    break;
                case "columnsection":
                case "columnblock":
                case "columnfield":
                    this.columns({ index: e.target.dataset.index, column: e.target.dataset.column })
                    break;
                case "editsection":
                case "editblock":
                case "editfield":
                    this.editColumn({ column: e.target.dataset.column, index: e.target.dataset.index, key: e.target.dataset.key })
                    break;
            }
        })
    }

    connectedCallback() {
        this.levels = parseFloat(this.getAttribute("levels")) || 1
        this.render()

        this.updateData()
    }
}

window.customElements.define('custom-hook-form-panel', HookFormPanel);