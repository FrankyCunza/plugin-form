import { HOOKFORMINPUTCLASS, HOOKFORMTYPES, HOOKFORMCOUNTRIES } from "../../config/index.js"
import { validateForm } from "./validate.js"

export class HookFormPanel extends HTMLElement {
    constructor() {
        super()
        this.config = {
            levels: 1, // 1 to 3
            columns: {
                3: "section",
                2: "block",
                1: "field"
            }
        }
        this.type = "add"
        this.indexSection = null
        this.indexBlock = null
        this.indexField = null
        this.currentSection = null
        this.blocks = null
        this.currentBlock = null
        this.fields = null
        this.currentField = null
        this.currentFieldKey = null
        this.language = "es" || HOOKFORMCOUNTRIES[0]['name']
        this.data = {}
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
            html += `<option value="${el.name}" ${el.name === this.language ? "selected" : ""}>${el.title}</option>`
        })
        return html
    }

    constructConfig() {
        let html = ""
        html += `
            <div class="grid grid-cols-3">
                <div class="p-4">
                    <custom-field label="Columnas" data-value="${this.data?.columns || ""}" type="text"></custom-field>
                </div>
                <div class="p-4">
                    <custom-field type="select" data-action="language" label="Language">
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
               <div class="grid grid-cols-${this.config.levels} text-gray-800 w-full">
          `
        switch (this.config.levels) {
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
               <div class="grid grid-cols-${this.config.levels} text-gray-800 w-full">
          `
        switch (this.config.levels) {
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
        html += `<div class="grid grid-cols-${this.config.levels} absolute top-0 left-0 w-full h-full pointer-events-none z-10">`;
        const quantity = [... new Array(this.config.levels)]
        quantity.forEach((el, i) => {
            html += `<div class="${i < (this.config.levels-1) ? "border-solid border-r border-gray-400" : ""}"></div>`
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
        this.querySelector("[data-modal]").classList.toggle("hidden")
        let html = ""
        let htmlModalSection = `
            <h2 class="font-bold text-xl text-gray-800 mb-3">${type === "edit" ? "Edit" : "Add"} section</h2>
            <form novalidate data-form="formsection">
                <custom-field type="text" data-value="${values || ""}" onlyfield="true" required="true" name="inputsection"></custom-field>
                <button type="submit" data-action="savesection" class="mt-3 bg-blue-600 px-4 py-3 w-full rounded-xl text-white">Save</button>
            </form>
          `
        let htmlModalBlock = `
            <h2 class="font-bold text-xl text-gray-800 mb-3">${type === "edit" ? "Edit" : "Add"} block</h2>
            <form novalidate data-form="formblock">
                <custom-field type="text" data-value="${values || ""}" onlyfield="true" required="true" name="inputblock"></custom-field>
                <button type="submit" data-action="saveblock" class="mt-3 bg-blue-600 px-4 py-3 w-full rounded-xl text-white">Save</button>
            </form>
          `
        let htmlModalField = `
            <h2 class="font-bold text-xl text-gray-800 mb-3">${type === "edit" ? "Edit" : "Add"} field</h2>
            <form novalidate class="grid grid-cols-3 gap-3" data-form="formfield">
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
                <button type="submit" class="" hidden data-skipValidation="true">Enviar</button>
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
                <textarea data-skipValidation="true" class="${HOOKFORMINPUTCLASS} pt-4" style="height: 150px;"></textarea>
            </div>
            <div class="w-full flex justify-end">
            <button type="submit" data-action="savefield" class="mt-3 bg-blue-600 px-4 py-3 w-full rounded-xl text-white">
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
                <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-screen" data-action="hidemodal"></div>
                <div 
                    class="bg-white p-5 rounded-xl relative max-w-3xl w-full h-max overflow-y-auto" 
                    style="max-height: 90vh" id="contentmodal">
                </div>
            </div>
    `
    }

    toggleModal({ column, type = "add", values, hidden = false }) {
        this.type = type
        if (hidden) {
            this.querySelector("[data-modal]").classList.toggle("hidden")
            return
        }
        console.log(column)
        console.log(this.indexSection)
        switch (column) {
            case "section":
                this.querySelector("[id='contentmodal']").innerHTML = this.printModals({ column, type, values })
                break;
            case "block":
                if (typeof this.indexSection !== "number") {
                    alert("Select a section")
                } else {
                    this.querySelector("[id='contentmodal']").innerHTML = this.printModals({ column, type, values })
                }
                break;
            case "field":
                if ((typeof this.indexBlock !== "number") && this.type === "add") {
                    alert("Select a block")
                } else {
                    this.querySelector("[id='contentmodal']").innerHTML = this.printModals({ column, type, values })
                }
                break;
        }
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
        this.printColumn({ column: this.config.columns[this.config.levels], index: null })
    }

    printColumn({ column }) {
        if (column === "section") {
            this.querySelector("[data-column='block']").innerHTML = ""
            this.querySelector("[data-column='field']").innerHTML = ""
            let html = ""
            this.data.form.forEach((el, index) => {
                html += this.buttonColumn({ column: "section", index: index, el: el, title: el['title'][this.language] })
            })
            this.querySelector("[data-column='section']").innerHTML = html

            if (typeof this.indexSection === "number") {
                console.log(this.indexSection)
                this.querySelector(`[data-action='columnsection'][data-index='${this.indexSection}']`).click()
            }
        }

        if (column === "block") {
            this.querySelector("[data-column='block']").innerHTML = ""
            this.querySelector("[data-column='field']").innerHTML = ""
            let html = ""
            this.data.form[this.indexSection]['blocks'].forEach((el, index) => {
                html += this.buttonColumn({ column: "block", index: index, el: el, title: el['title'][this.language] })
            })
            this.querySelector("[data-column='block']").innerHTML = html

            if (typeof this.indexBlock === "number") {
                this.querySelector(`[data-action='columnblock'][data-index='${this.indexBlock}']`).click()
            }
        }

        if (column === "field") {
            let html = ""
            let fields = this.data.form[this.indexSection]['blocks'][this.indexBlock]['fields']
            let indexField = 0
            Object.entries(fields['constructor']).forEach(([k, v]) => {
                html += this.buttonColumn({ 
                    column: "field", 
                    index: indexField, 
                    el: v, 
                    title: fields['languages'][this.language] ? fields['languages'][this.language][k] ? fields['languages'][this.language][k]['label'] : null : null,
                    key: k
                })
                indexField++
            })
            this.querySelector("[data-column='field']").innerHTML = html
        }
    }

    buttonColumn({ column, index, el, title, key = "" }) { // key is for field
        if (column === "section" && !title) {
            this.data['form'][index]['title'][this.language] = "Not found"
            title = this.data['form'][index]['title'][this.language]
        }
        if (column === "block" && !title) {
            this.data['form'][this.indexSection]['blocks'][index]['title'][this.language] = "Not found"
            title = this.data['form'][this.indexSection]['blocks'][index]['title'][this.language]
        }
        if (column === "field" && !title) {
            this.data['form'][this.indexSection]['blocks'][this.indexBlock]['fields']['languages'][this.language] = {
                [key]: {
                    label: "Not found"
                }
            }
            title = this.data['form'][this.indexSection]['blocks'][this.indexBlock]['fields']['languages'][this.language][key]['label']
        }
        return `
            <div class="flex relative">
                <button 
                    type="button" 
                    class="relative hover:bg-gray-200 focus:outline-none focus:ring-4 ring-inset focus:ring-blue-300 bg-gray-50 text-gray-800 font-medium w-full hover:bg-gray-100">
                    <input
                        data-index="${index}" 
                        data-key="${key}"
                        data-column="${column}"
                        data-action="column${column}" 
                        type="radio" name="${column}" class="hookformpanel__inputradio cursor-pointer opacity-0 absolute w-full h-full top-0 left-0" 
                    />
                    <span class="flex w-full h-full p-3">
                        ${title || "No encontrado"}
                    </span>
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

    editColumn({ column, index, key = "" }) {
        this.currentFieldKey = key
        let values = null
        switch (column) {
            case "section":
                this.indexSection = parseFloat(index)
                values = this.data['form'][this.indexSection]['title'][this.language]
            break;
                case "block":
                this.indexBlock = parseFloat(index)
                values = this.data['form'][this.indexSection]['blocks'][this.indexBlock]['title'][this.language]
            break;
            case "field":
                this.indexField = parseFloat(index)
                let field = this.data['form'][this.indexSection]['blocks'][this.indexBlock]['fields']
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
            const { inputsection } = res[1]
            if (this.type === "edit") {
                this.data['form'][this.indexSection]['title'][this.language] = inputsection
            }
            if (this.type === "add") {
                this.data['form'].push({
                    "title": {
                        [this.language]: inputsection
                    },
                    "blocks": []
                })
            }
            this.printColumn({ column: "section" })
            console.log(this.data['form'])
            this.toggleModal({ column: "", type: "", values: "", hidden: true })
        }).catch(err => {
            console.log(err)
        })
    }

    saveBlock() {
        validateForm({ selector: "[data-modal]" })
        .then(res => {
            const { inputblock } = res[1]
            if (this.type === "edit") {
                this.data['form'][this.indexSection]['blocks'][this.indexBlock]['title'][this.language] = inputblock
            }
            if (this.type === "add") {
                this.data['form'][this.indexSection]['blocks'].push({
                    title: {
                        [this.language]: inputblock
                    },
                    fields: {
                        constructor: {},
                        languages: {}
                    }
                })
            }
            this.printColumn({ column: "block" })
            this.toggleModal({ column: "", type: "", values: "", hidden: true })
        }).catch(err => {
            console.log(err)
        })
    }

    saveField() {
        validateForm({ selector: "[data-modal]" })
        .then(res => {
            const label = res[1]['label']
            let name = label.toLowerCase().replace(/\s{1,}/g, '_').replace(/[^\w\s]/gi, '');
            let field = {
                constructor: {
                    additionalName: res[1]['additionalName'],
                    alternateName: res[1]['alternateName'],
                    columns: parseFloat(res[1]['columns']),
                    info: res[1]['info'],
                    pattern: res[1]['pattern'],
                    required: res[1]['required'] === "true" ? true : false,
                    type: res[1]['type']
                }
            }
            HOOKFORMCOUNTRIES.forEach(el => {
                this.data['form'][this.indexSection]['blocks'][this.indexBlock]['fields']['languages'][el.name] = {
                    ...this.data['form'][this.indexSection]['blocks'][this.indexBlock]['fields']['languages'][el.name],
                    [name]: {
                        label: label + el.name
                    }
                }
            })

            if (this.type === "edit") {
                name = this.currentFieldKey
            }
            this.data['form'][this.indexSection]['blocks'][this.indexBlock]['fields']['constructor'][name] = field.constructor
            this.data['form'][this.indexSection]['blocks'][this.indexBlock]['fields']['languages'][this.language][name] = {
                label: label
            }
            this.printColumn({ column: "field" })
            this.toggleModal({ column: "", type: "", values: "", hidden: true })
        }).catch(err => {
            console.log(err)
        })
    }

    changeLanguage(lang) {
        this.language = lang

        let column = null
        switch (this.config.levels) {
            case 3:
                column = "section"
                break;
            case 2:
                column = "block"
                break;
            case 1:
                column = "field"
                break;
        }
        this.printColumn({ column: column })
    }

    render() {
        let html = ""
        html += `
            <style>
                .hookformpanel__inputradio:checked + span {
                    background: blue;
                    color: white
                }
            </style>
        `
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
                case "savefield":
                    this.saveField()
                    break;
                case "modal":
                    this.toggleModal({ column: e.target.dataset.name, type: "add" })
                    break;
                case "hidemodal":
                    this.toggleModal({ column: "", type: "", hidden: true })
                    break;
                case "columnsection":
                    this.indexSection = parseFloat(e.target.dataset.index)
                    this.indexBlock = null
                    this.indexField = null
                    this.printColumn({ column: "block" })
                    break;
                case "columnblock":
                    this.indexBlock = parseFloat(e.target.dataset.index)
                    this.printColumn({ column: "field" })
                    break;
                case "columnfield":
                    break;
                case "editsection":
                case "editblock":
                case "editfield":
                    this.editColumn({ column: e.target.dataset.column, index: e.target.dataset.index, key: e.target.dataset.key })
                    break;
            }
        })

        this.addEventListener("submit", e => {
            e.preventDefault()
            console.log(e.target.dataset.form)
            switch (e.target.dataset.form) {
                case "formsection":
                    this.saveSection()
                    break;
                case "formblock":
                    this.saveBlock()
                    break;
                case "formfield":
                    this.saveField()
                    break;
            }
        })

        this.addEventListener("change", e => {
            switch (e.target.dataset.action) {
                case "language":
                    this.changeLanguage(e.target.value)
                    break;
                default:
                    break;
            }
        })
    }

    configColumns() {
        switch (this.config.levels) {
            case 3:
                this.data = {
                    columns: 2,
                    form: []
                }
                break;
            case 2:
                this.indexSection = 0
                this.data = {
                    columns: 2,
                    form: [
                        {
                            "position": 1,
                            "title": {
                                "en": "Form",
                            },
                            "blocks": []
                        }
                    ]
                }
                break;
            case 1:
                this.indexSection = 0
                this.indexBlock = 0
                this.data = {
                    columns: 2,
                    form: [
                        {
                            "position": 1,
                            "title": {
                                "en": "Form",
                            },
                            "blocks": [
                                {
                                    "title": {
                                        "en": "Form",
                                    },
                                    "fields": {
                                        "constructor": {},
                                        "languages": {}
                                    }
                                }
                            ]
                        }
                    ]
                }
                break;
        }
    }

    connectedCallback() {
        this.config.levels = parseFloat(this.getAttribute("levels")) || 1
        this.configColumns()
        this.render()
        console.log(this.indexSection)

        let column = null
        switch (this.config.levels) {
            case 3:
                column = "section"
                break;
            case 2:
                column = "block"
                break;
            case 1:
                column = "field"
                break;
        }
        this.printColumn({ column: column })

        // this.updateData()
    }
}

window.customElements.define('custom-hook-form-panel', HookFormPanel);