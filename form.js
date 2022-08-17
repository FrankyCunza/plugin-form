const COUNTRIES = [
    {
        title: "English",
        name: "en"
    },
    {
        title: "Español",
        name: "es"
    },
    {
        title: "Italiano",
        name: "ita"
    },
    {
        title: "Francés",
        name: "fr"
    }
]

const classNameInputSelectHookForm = "p-2.5 focus:outline-none rounded bg-white focus:outline-none focus:ring-4 focus:shadow-md focus:ring-blue-200 w-full border border-solid border-gray-300 hover:border-gray-400"
class CustomField extends HTMLElement {
    constructor() {
        super()
        this.id = uniqueIdForm()()
        this.innerHtml = null
        this.required = null
        this.placeholder = null
        this.type = "text"
        this.selectMultiple = null
        this.label = null
        this.name = null
        this.option = null
        this.optionValue = null
        this.classNameInput = classNameInputSelectHookForm
        this.checkedHtml = '<span class="hidden absolute bottom-4 text-green-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-check"></i></span>'
        this.warningHtml = '<span class="hidden absolute bottom-4 text-red-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-exclamation-triangle"></i></span>'
        this.inputFilePreviewImage = null
        this.value = null
    }

    static get observedAttributes() {
        return ["type"];
    }

    disconnectedCallback() {
        // console.log("Removed")
    }

    render() {
        let htmlDataAttributes = ""
        Object.entries({ ...this.dataset }).forEach(([k, v]) => {
            htmlDataAttributes += `data-${k}='${v}'`
        })
        let label = `<label class="">${this.label}${this.required ? "*" : ""}</label>`
        let htmlField = ""
        // FIELD SELECT
        if (this.type === "select") {
            htmlField += `
                ${this.warningHtml}
                <select 
                    ${this.selectMultiple == "true" ? "multiple" : ""} 
                    class="${this.classNameInput} cursor-pointer" 
                    data-field 
                    name="${this.name}"
                    ${htmlDataAttributes}>
                    ${this.innerHtml ? this.innerHtml : ""}
                </select>
                ${this.checkedHtml}
            `
        } else {
            htmlField = `
                ${this.type == "file" && this.inputFilePreviewImage ? `
                    <div class='mb-2 bg-white border border-solid border-gray-300 rounded-lg h-20' id="previewimage${this.id}"></div>
                ` : ''}
                ${this.warningHtml}
                <input 
                    type="${this.type}" 
                    data-required="${this.required ? "true" : "false"}"
                    placeholder="${this.placeholder}" 
                    value="${this.value || ''}"
                    data-field 
                    class="${this.classNameInput}" 
                    name="${this.name}" 
                    ${htmlDataAttributes}
                />
                ${this.checkedHtml}
            `
        }
        // FIELD RADIO
        if (this.type === "radio") {
            let htmlTrue = `
                <div>
                    <label class="flex rounded-lg gap-2 cursor-pointer w-full ${this.getAttribute("cleanstyles") == "true" ? "" : "border border-solid border-gray-200 p-2 "}">
                        <span>Si</span>
                        <input 
                            type="radio" 
                            data-required="${this.required ? "true" : "false"}" 
                            data-field 
                            name="${this.name}" 
                            data-value="true" 
                            class="cursor-pointer" 
                            value="true" 
                        />
                    </label>
                </div>
            `
            let htmlFalse = `
                <div>
                    <label class="flex rounded-lg gap-2 cursor-pointer w-full ${this.getAttribute("cleanstyles") == "true" ? "" : "border border-solid border-gray-200 p-2 "}">
                        <span>No</span>
                        <input 
                            type="radio" 
                            data-required="${this.required ? "true" : "false"}" 
                            data-field 
                            name="${this.name}" 
                            data-value="false" 
                            class="cursor-pointer" 
                            value="false" 
                        />
                    </label>
                </div>
            `
            let html = ""
            if (this.getAttribute("show") == "true") {
                label = ""
                html = htmlTrue
            }
            else if (this.getAttribute("show") == "false") {
                label = ""
                html = htmlFalse
            } else {
                html = htmlTrue + htmlFalse
            }
            htmlField = `
                <div class="flex gap-2">
                    ${html}
                </div>
            `
        }
        // FIELD RADIO MULTIPLE
        if (this.type == "radio-multiple") {
            htmlField = `
                <div>
                    <label class="flex rounded-lg gap-1 cursor-pointer w-full flex-wrap border p-2 ${this.getAttribute("cleanstyles") == "true" ? "" : "border-solid border-gray-200"}">
                        <span>${this.option}</span>
                        <input 
                            type="radio" 
                            data-required="${this.required ? "true" : "false"}" 
                            data-multiple="true" 
                            data-radiomultiple="true" 
                            data-field 
                            name="${this.name}" 
                            data-value="${this.optionValue}" 
                            class="cursor-pointer" 
                        />
                    </label>
                </div>
            `
        }
        // TEXTAREA
        if (this.type === "textarea") {
            htmlField = `
                ${this.warningHtml}
                <textarea 
                    class="${this.classNameInput}" 
                    data-required="${this.required ? "true" : "false"}" 
                    data-field 
                    name="${this.name}"></textarea>
                ${this.checkedHtml}
            `
        }
        // CHECKBOX
        if (this.type === "checkbox") {
            htmlField = this.innerHTML
        }
        if (this.getAttribute("onlyfield") == "true") {
            label = ""
        }
        this.innerHTML = `
            <div class="w-full text-xs">
                ${label}
                <div class="relative w-full">
                ${this.type !== "label" ? htmlField : ""}
                </div>
            </div>
            `
    }

    changeField() {
        if (document.querySelector(`[data-field][name='${this.name}']`)) {
            document.querySelector(`[data-field][name='${this.name}']`).addEventListener("change", e => {
                switch (this.type) {
                    case "file":
                        if (this.inputFilePreviewImage) {
                            const image = URL.createObjectURL(e.target.files[0]);
                            document.getElementById("previewimage" + this.id).innerHTML = `
                                <div class="h-full w-full flex justify-center items-center">
                                    <img src='${image}' class="h-full" />
                                </div>
                            `
                        }
                        break;
                    default:
                        break;
                }
            })
        }
    }

    connectedCallback() {
        this.value = this.getAttribute("data-value")
        this.innerHtml = this.innerHTML
        this.type = this.getAttribute("type")
        this.required = this.getAttribute("required") == "true" ? true : false
        this.placeholder = this.getAttribute("placeholder") || ""
        this.label = this.getAttribute("label")
        this.name = this.getAttribute("data-name") || this.getAttribute("name")
        this.selectMultiple = this.getAttribute("multiple")
        this.optionValue = this.getAttribute("optionvalue") || ""
        // RADIO MULTIPLE
        this.option = this.getAttribute("option")
        // FILE
        this.inputFilePreviewImage = this.getAttribute("data-previewimage") == "true" ? true : false
        // RENDER
        this.render()
        // CHANGE FIELD
        this.changeField()
    }

    attributeChangedCallback() {
        // console.log("Change attribute")
    }
}
window.customElements.define('custom-field', CustomField);

function uniqueIdForm() {
    const firstItem = {
        value: "0"
    };
    /*length can be increased for lists with more items.*/
    let counter = "123456789".split('')
        .reduce((acc, curValue, curIndex, arr) => {
            const curObj = {};
            curObj.value = curValue;
            curObj.prev = acc;

            return curObj;
        }, firstItem);
    firstItem.prev = counter;

    return function () {
        let now = Date.now();
        if (typeof performance === "object" && typeof performance.now === "function") {
            now = performance.now().toString().replace('.', '');
        }
        counter = counter.prev;
        return `${now}${Math.random().toString(16).substr(2)}${counter.value}`;
    }
}

const types = [
    {
        title: "Text",
        name: "text"
    },
    {
        title: "Textarea",
        name: "textarea"
    },
    {
        title: "Button",
        name: "button"
    },
    {
        title: "Checkbox",
        name: "checkbox"
    },
    {
        title: "Color",
        name: "color"
    },
    {
        title: "Date",
        name: "date"
    },
    {
        title: "Datetime Local",
        name: "datetime-local"
    },
    {
        title: "Email",
        name: "email"
    },
    {
        title: "File",
        name: "file"
    },
    {
        title: "Hidden",
        name: "hidden"
    },
    {
        title: "Image",
        name: "image"
    },
    {
        title: "Month",
        name: "month"
    },
    {
        title: "Number",
        name: "number"
    },
    {
        title: "Password",
        name: "password"
    },
    {
        title: "Radio",
        name: "radio"
    },
    {
        title: "Radio Multiple",
        name: "radio-multiple"
    },
    {
        title: "Range",
        name: "range"
    },
    {
        title: "Reset",
        name: "reset"
    },
    {
        title: "Search",
        name: "search"
    },
    {
        title: "Submit",
        name: "submit"
    },
    {
        title: "Tel",
        name: "tel"
    },
    {
        title: "Time",
        name: "time"
    },
    {
        title: "URL",
        name: "url"
    },
    {
        title: "Week",
        name: "week"
    },
    {
        title: "Select",
        name: "select"
    },
    {
        title: "H1",
        name: "h1"
    },
    {
        title: "H2",
        name: "h2"
    },
    {
        title: "H3",
        name: "h3"
    },
    {
        title: "H4",
        name: "h4"
    },
    {
        title: "H5",
        name: "h5"
    },
    {
        title: "H6",
        name: "h6"
    },
    {
        title: "Paragraph",
        name: "p"
    },
    {
        title: "HTML",
        name: "html"
    }
]

class Form {
    constructor(selector, { sections }) {
        this.selector = selector
        this.sections = sections
        this.currentLanguage = COUNTRIES[0]['name']
        this.forms = [
            {
                blocks: [
                    {
                        title: "Pasaporte",
                        name: "passport",
                        fields: []
                    }
                ],
                title: "Personal Information",
                name: "personal_information",
                position: 1
            }
        ]
        this.titles = {
            h1: {
                class: "font-bold text-6xl"
            },
            h2: {
                class: "font-bold text-5xl"
            },
            h3: {
                class: "font-bold text-4xl"
            },
            h4: {
                class: "font-bold text-3xl"
            },
            h5: {
                class: "font-bold text-2xl"
            },
            h6: {
                class: "font-bold text-xl"
            }
        }
        this.idFormColumns = uniqueIdForm()()
        this.idFormLanguage = uniqueIdForm()()
        this.indexSection = null
        this.indexBlock = null
        this.indexField = null
        this.modalSectionId = uniqueIdForm()()
        this.modalBlockId = uniqueIdForm()()
        this.modalFieldId = uniqueIdForm()()
        this.colSectionId = uniqueIdForm()()
        this.colBlockId = uniqueIdForm()()
        this.colFieldId = uniqueIdForm()()
        this.modalSectionInput = 'modalSectionInput'
        this.modalBlockInput = 'modalBlockInpuit'
        this.sectionMethod = "add"
        this.blockMethod = "add"
        this.inputClass = 'w-full px-3 focus:outline-none focus:ring-4 focus:ring-blue-400 h-12 border border-gray-300 rounded-xl w-full'
        this.types = types
        this.idFields = {
            name: "fieldName",
            nameAdditional: "fieldNameAdditional",
            info: "fieldInfo",
            alternateName: "fieldAlternateName",
            columns: "fieldColumns",
            pattern: "fieldPattern",
            type: "fieldType",
            required: "fieldRequired",
            value: "fieldValue",
            hidden: "fieldhidden"
        }
        this.idCustomFields = {
            options: "fieldOptions",
            optionsBody: "fieldOptionsBody",
            html: "fieldHTMLSelector",
            htmlTextarea: "fieldHTMLSelectorTextarea"
        }
        this.indexSection = null;
        this.indexBlock = null;
        this.formBuilder = { 
            form_builder: [
                {
                    type: "text",
                    name: "label",
                    label: "Nddame",
                    columns: 1,
                    required: true
                },
                {
                    type: "text",
                    name: "nameAdditional",
                    label: "Additional Name",
                    columns: 1
                },
                {
                    type: "text",
                    name: "info",
                    label: "Info",
                    columns: 1
                },
                {
                    type: "text",
                    name: "alternateName",
                    label: "Alternate Name",
                    columns: 1
                },
                {
                    type: "text",
                    name: "value",
                    label: "Value",
                    columns: 1
                },
                {
                    type: "select",
                    name: "columns",
                    label: "Columns",
                    options: [
                        {
                            title: 1,
                            value: 1
                        },
                        {
                            title: 2,
                            value: 2
                        },
                        {
                            title: 3,
                            value: 3
                        }
                    ],
                    columns: 1
                },
                {
                    type: "text",
                    name: "pattern",
                    label: "Pattern",
                    columns: 1
                },
                {
                    type: "select",
                    name: "type",
                    label: "Type",
                    columns: 1,
                    data_attributes: {
                        action: "fieldtype"
                    },
                    options: this.types.map(el => {
                        return {
                            title: el.title,
                            value: el.name
                        }
                    })
                },
                {
                    type: "select",
                    name: "required",
                    label: "Required",
                    columns: 1,
                    options: [
                        {
                            title: "Yes",
                            value: true
                        },
                        {
                            title: "No",
                            value: false
                        }
                    ]
                },
                {
                    type: "select",
                    name: "hiddenn",
                    label: "Hidden",
                    columns: 1,
                    options: [
                        {
                            title: "Yes",
                            value: true
                        },
                        {
                            title: "No",
                            value: false
                        }
                    ]
                }
            ],
            columns: 3
        }
        this.forms = {...this.formatFieldLanguages(this.forms)}
        console.log(this.forms)
        this.constructForm();
        switch (this.sections) {
            case 3:
                this.printSections();
                break;
            case 2:
                this.indexSection = 0;
                this.printBlocks();
                break;
            case 1:
                this.indexSection = 0;
                this.indexBlock = 0;
                this.printFields();
                break;
            default:
                break;
        }
        this.selectorFormColumns = document.querySelector(`[data-id='${this.idFormColumns}'] input`)
        this.$language = document.querySelector(`[data-id='${this.idFormLanguage}'] select`)
        this.selectorsFields = {
            name: document.getElementById(this.idFields.name),
            nameAdditional: document.getElementById(this.idFields.nameAdditional),
            info: document.getElementById(this.idFields.info),
            alternateName: document.getElementById(this.idFields.alternateName),
            value: document.getElementById(this.idFields.value),
            columns: document.getElementById(this.idFields.columns),
            pattern: document.getElementById(this.idFields.pattern),
            type: document.getElementById(this.idFields.type),
            required: document.getElementById(this.idFields.required),
            hidden: document.getElementById(this.idFields.hidden)
        }
        this.selectorsCustomFields = {
            options: document.getElementById(this.idCustomFields.options), // FATHER OPTIONS
            optionsBody: document.getElementById(this.idCustomFields.optionsBody), // CHILD OPTIONS
            html: document.getElementById(this.idCustomFields.html),
            htmlTextarea: document.getElementById(this.idCustomFields.htmlTextarea)
        }
    }

    formatFieldLanguages(data) {
        let f = COUNTRIES.reduce((acc, cur) => {
            acc[cur.name] = {
                sections: data
            }
            return acc
        }, {})
        return f
    }

    constructTop() {
        let htmlSection = `
               <div class="w-full">
                    <button data-action="modalForm" data-name="section" data-modaltarget="${this.modalSectionId}" class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-200 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                         Create section
                    </button>
               </div>
          `
        let htmlBlock = `
               <div>
                    <button data-action="modalForm" data-name="block" data-modaltarget="${this.modalBlockId}" class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-200 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                         Create block
                    </button>
               </div>
          `
        let htmlField = `
               <div>
                    <button data-action="modalForm" data-name="field" data-modaltarget="${this.modalFieldId}" class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-200 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                         Create field
                    </button>
               </div>
          `
        let htmlButtonActions = `
               <div class="grid grid-cols-${this.sections} text-gray-800 w-full">
          `
        switch (this.sections) {
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

    get Forms() {
        switch (this.sections) {
            case 1:
            case 2:
            case 3:
                return {
                    form: this.forms,
                    columns: parseInt(parseFloat(this.selectorFormColumns.value))
                };
                break;
            default:
                break;
        }
    }

    constructLines() {
        let html = "";
        html += `
          <div class="grid grid-cols-${this.sections} absolute w-full h-full pointer-events-none z-10">
          `;
        [... new Array(this.sections)].forEach((el, i) => {
            html += `
               <div class="${i < this.sections - 1 ? 'border-r border-gray-300' : ''}"></div>
          `})
        html += `
          </div>
          `
        return html
    }

    constructModals() {
        let html = ""
        let htmlModalSection = `
               <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20 hidden" id="${this.modalSectionId}">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-full" data-action="modalForm" data-modaltarget="${this.modalSectionId}"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add section</h2>
                         <input type="text" id="${this.modalSectionInput}" 
                         class="${this.inputClass}" />
                         <button type="button" data-action="savesection" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Save</button>
                    </div>
               </div>
          `
        let htmlModalBlock = `
               <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20 hidden" id="${this.modalBlockId}">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-full" data-action="modalForm" data-modaltarget="${this.modalBlockId}"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add block</h2>
                         <input type="text" id="${this.modalBlockInput}" 
                         class="${this.inputClass}" />
                         <button type="button" data-action="saveblock" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Save</button>
                    </div>
               </div>
          `
        let htmlModalField = `
               <div class="fixed w-screen h-screen top-0 left-0 py-10 flex items-center justify-center z-20 hidden" id="${this.modalFieldId}">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-screen" data-action="modalForm" data-modaltarget="${this.modalFieldId}"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full h-max overflow-y-auto" style="max-height: 90vh">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add field</h2>
                         <form novalidate id="hookform"></form>
                         <div class="flex flex-col mt-4 border border-gray-300 rounded-xl p-3 hidden" id="${this.idCustomFields.options}">
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
                                        <tbody id="${this.idCustomFields.optionsBody}"></tbody>
                                   </table>
                              </div>
                         </div>
                         <div class="flex flex-col mt-4 border border-gray-300 rounded-xl p-3 hidden" id="${this.idCustomFields.html}">
                              <div class="flex items-center gap-2 mb-2">
                                   <label class="text-gray-800 font-medium">HTML</label>
                              </div>
                              <textarea class="${this.inputClass} pt-4" style="height: 150px;" id="${this.idCustomFields.htmlTextarea}"></textarea>
                         </div>
                         <div class="w-full flex justify-end">
                             <button type="button" data-action="savefield" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white"><i class="fas fa-save mr-2 pointer-events-none"></i>Save</button>
                         </div>
                    </div>
               </div>
          `
        html += htmlModalSection + htmlModalBlock + htmlModalField
        return html
    }

    constructBody() {
        let htmlSection = `
               <div class="w-full bg-white" data-section="section" id="${this.colSectionId}">
          </div>
          `
        let htmlBlock = `
               <div class="w-full bg-white" data-section="block" id="${this.colBlockId}">
          </div>
          `
        let htmlField = `
               <div class="w-full bg-white" data-section="field" id="${this.colFieldId}">
          </div>
          `
        let html = ""
        html += `<div class="grid grid-cols-${this.sections}">`
        switch (this.sections) {
            case 1:
                html += htmlField
                break;
            case 2:
                html += htmlBlock + htmlField
                break;
            case 3:
                html += htmlSection + htmlBlock + htmlField
                break;
            default:
                break;
        }
        html += `</div>`
        return html
    }

    button({ index, column, el }) {
        let htmlField = ""
        if (column === "field") {
            switch (el.type) {
                case "color":
                case "date":
                case "datetime-local":
                case "email":
                case "file":
                case "hidden":
                case "month":
                case "number":
                case "password":
                case "radio":
                case "range":
                case "reset":
                case "search":
                case "submit":
                case "tel":
                case "text":
                case "time":
                case "url":
                    htmlField = `<input ${el.type == "image" ? `src="${el.value}"` : ""} type="${el.type.includes("field_") ? el.type.split("field_")[1] : el.type}" class="${this.inputClass}" placeholder="${el.placeholder || ""}" />`
                    break;
                case "checkbox":
                    let html = ""
                    if (el?.options.length > 0) {
                        html += `<div class="grid grid-cols-2 md:grid-cols-3 gap-3">`
                        el.options.forEach(opt => {
                            html += `
                                        <div class="border border-solid border-gray-400 rounded-lg p-3 flex flex-col items-center justify-center shadow hover:shadow-xl">
                                             <label>${opt.title}</label>
                                             <input type="checkbox" />
                                        </div>
                                   `
                        })
                        html += `</div>`
                    } else {
                        html += `<input type="checkbox" />`
                    }
                    htmlField = html
                    break;
                case "radio-multiple":
                    let htmlRadio = ""
                    if (el?.options.length > 0) {
                        htmlRadio += `<div class="grid grid-cols-2 md:grid-cols-3 gap-3">`
                        el.options.forEach(opt => {
                            htmlRadio += `
                                        <div class="border border-solid border-gray-400 rounded-lg p-3 flex flex-col items-center justify-center shadow hover:shadow-xl">
                                             <label>${opt.title}</label>
                                             <input type="radio" />
                                        </div>
                                   `
                        })
                        htmlRadio += `</div>`
                    } else {
                        htmlRadio += `<input type="checkbox" />`
                    }
                    htmlField = htmlRadio
                    break;
                case "image":
                    htmlField = `<input src="${el.value}" type="image" class="w-full" placeholder="${el.placeholder || ""}" />`
                    break;
                case "textarea":
                    htmlField = `<textarea class="${this.inputClass} py-2" placeholder="${el.placeholder || ""}"></textarea>`;
                    break;
                case "select":
                case "field_select":
                    if (el?.options.length > 0) {
                        htmlField += `<select class="${this.inputClass}">`
                        el?.options.forEach(el => {
                            htmlField += `
                                        <option>${el.title}</option>
                                   `
                        })
                        htmlField += `</select>`
                    }
                    break;
                case "h6":
                case "h5":
                case "h4":
                case "h3":
                case "h2":
                case "h1":
                case "H6":
                case "H5":
                case "H4":
                case "H3":
                case "H2":
                case "H1":
                    htmlField += `<${el.type.toLowerCase()} class="${this.titles[el.type.toLowerCase()].class}">${el.label || el.title}</${el.type.toLowerCase()}>`
                    break;
                case "p":
                    htmlField += `<p class="text-base">${el.label || el.title}</p>`
                    break;
                default:
                    break;
            }
        }
        return `
               <button data-action="${column}" data-index="${index}" class="px-2 py-6 hover:bg-gray-50 cursor-pointer flex h-22 justify-between items-center border-b border-gray-300 w-full ring-inset focus:outline-none focus:ring-2 focus:ring-blue-200 relative text-left">
                    <div class="flex flex-col w-full ${column !== "field" ? "pointer-events-none" : ""}">
                    <div class="pointer-events-none">
                         ${el.label || el.title} ${el.required == true ? "*" : ""}
                    </div>
               ${htmlField}
               </div>
               <div class="flex gap-1.5 absolute top-1 right-1.5">
                    <div data-action="edit${column}" data-position="${el.position}" data-index="${index}" class="text-xs font-medium text-blue-600">Edit</div>
                    <div data-action="delete${column}" data-position="${el.position}" data-index="${index}" class="text-xs font-medium text-red-600">Delete</div>
                    <div data-action="moveup${column}" data-position="${el.position}" data-index="${index}" class="text-xs font-medium text-yellow-600">Up</div>
                    <div data-action="movedown${column}" data-position="${el.position}" data-index="${index}" class="text-xs font-medium text-yellow-600">Down</div>
               </div>
          </button>
          `
    }

    printSections() {
        const selector = document.getElementById(this.colSectionId)
        let html = ""
        if (this.forms.length > 0) {
            this.forms = this.resetPositions(this.forms)
            this.forms.forEach((el, i) => {
                html += this.button({ index: i, column: 'section', el })
            })
        } else {
            html = "Without data"
        }
        /* selector.insertAdjacentHTML("beforeend", "Nice") */
        selector.innerHTML = html
    }

    printBlocks() {
        const selector = document.getElementById(this.colBlockId)
        let html = ""
        if (this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks']?.length > 0) {
            this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'] = this.resetPositions(this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'])
            this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'].forEach((el, i) => {
                html += this.button({ index: i, column: 'block', el })
            })
        } else {
            html = "Without data"
        }
        selector.innerHTML = html
    }

    printFields() {
        const selector = document.getElementById(this.colFieldId)
        let html = ""
        if (this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'].length > 0) {
            this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'] = this.resetPositions(this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'])
            this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'].forEach((el, i) => {
                html += this.button({ index: i, column: 'field', el })
            })
        } else {
            html = "Without data"
        }
        selector.innerHTML = html
    }

    saveSection() {
        const value = document.getElementById(this.modalSectionInput).value
        let data = {
            label: value,
            name: value,
            blocks: []
        }
        if (value) {
            if (this.sectionMethod === "add") {
                this.forms.push(data)
            } else {
                this.forms[this.currentLanguage]['sections'][this.indexSection].label = value
                this.forms[this.currentLanguage]['sections'][this.indexSection].name = value
            }
        }
        document.getElementById(this.modalSectionId).classList.toggle("hidden")
        this.printSections()
    }

    saveBlock() {
        const value = document.getElementById(this.modalBlockInput).value
        let data = {
            label: value,
            name: value,
            fields: []
        };
        if (value) {
            if (this.blockMethod === "add") {
                this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'].push(data);
            } else {
                this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock].label = value;
                this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock].name = value;
            }
        }
        document.getElementById(this.modalBlockId).classList.toggle("hidden")
        this.printBlocks()
    }

    async saveField() {
        const data = await validateForm({ selector: "hookform" }).then(res => {
            return res[1]
        }).catch(err => {
            console.log(err)
        })
        if (!data) {
            return false
        }
        let { nameAdditional, alternateName, columns, hiddenn, info, label, pattern, required, type, value } = data
        required = required == "true" ? true : false
        hiddenn = hiddenn == "true" ? true : false
        let name = label
        if (alternateName === '') {
            name = label.toLowerCase().replace(/\s{1,}/g, '_').replace(/[^\w\s]/gi, '');
        }
        else {
            name = alternateName
        }
        pattern = String.raw`${pattern}`
        const html = this.selectorsCustomFields.htmlTextarea.value
        const options = this.options
        if (this.fieldMethod === "add") {
            let fields = [ ...this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'] ]
            fields.push({
                label,
                name,
                nameAdditional,
                info,
                alternateName,
                value,
                columns,
                pattern,
                type,
                required,
                hidden: hiddenn,
                position: this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'].length + 1,
                options,
                html
            })
            let data = JSON.parse(JSON.stringify(this.forms[this.currentLanguage]))
            data['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'] = fields
            this.forms[this.currentLanguage] = data
            
        } else {
            let item = this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
            item.label = label
            item.name = name
            item.nameAdditional = nameAdditional
            item.info = info
            item.alternateName = alternateName
            item.value = value
            item.columns = columns
            item.pattern = pattern
            item.type = type
            item.required = required
            item.hidden = hiddenn
            item.options = options
            item.html = html
        }
        document.getElementById(this.modalFieldId).classList.toggle("hidden")
        this.printFields()
    }

    deleteSection() {
        delete this.forms[this.currentLanguage]['sections'][this.indexSection]
        let res = this.forms.filter(el => el !== undefined)
        this.forms = res
        this.printSections()
    }

    deleteBlock() {
        delete this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]
        let res = this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'].filter(el => el !== undefined)
        this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'] = res
        this.printBlocks()
    }

    deleteField() {
        delete this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
        let res = this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'].filter(el => el !== undefined)
        this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'] = res
        this.printFields()
    }

    editSection() {
        let section = this.forms[this.currentLanguage]['sections'][this.indexSection]
        document.getElementById(this.modalSectionId).classList.toggle("hidden")
        document.getElementById(this.modalSectionInput).value = section.label || section.title
    }

    editBlock() {
        let block = this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]
        document.getElementById(this.modalBlockId).classList.toggle("hidden")
        document.getElementById(this.modalBlockInput).value = block.label
    }

    editField() {
        let field = this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
        console.log(field)
        Forms({ ...this.formBuilder, selector: "hookform", values: { ...field } })
        this.customFields(field.type)
        document.getElementById(this.modalFieldId).classList.toggle("hidden")
        this.addOption(field?.options)
    }

    modalForm(e) {
        const name = e.target.dataset.name
        switch (name) {
            case "section":
                document.getElementById(this.modalSectionInput).value = ""
                break;
            case "block":
                document.getElementById(this.modalBlockInput).value = ""
                if (this.indexSection < 0 || this.indexSection === null || this.indexSection === undefined) {
                    alert("Por favor seleccione una sección")
                    return false;
                }
                break;
            case "field":
                Forms({ ...this.formBuilder, selector: "hookform" })
                if (this.indexBlock < 0 || this.indexBlock === null || this.indexBlock === undefined) {
                    alert("Por favor seleccione un bloque")
                    return false;
                }
                break;
            default:
                break;
        }
        document.getElementById(e.target.dataset.modaltarget).classList.toggle("hidden")
    }

    resetPositions(data) {
        if (data.length <= 0 || JSON.stringify(data) === "{}" || JSON.stringify(data).startsWith("{")) {
            return []
        }
        let lastPosition = data.filter(el => el.position >= 1).length
        let newData = data.map(el => {
            if (!el.position) {
                lastPosition++
                el.position = parseFloat(lastPosition)
            } else {
                el.position = parseFloat(el.position)
            }
            return el
        }).sort(function (a, b) {
            return a.position - b.position
        })
        for (let i = 0; i < newData.length; i++) {
            newData[i].position = i + 1
        }
        // console.log(newData)
        return newData
    }

    moveItem({ array, arrow, position }) {
        array = this.resetPositions(array)
        if (arrow === "up") {
            if (position === 1) {
                array.map(el => {
                    if (el.position === 1) {
                        el.position = array.length
                    } else {
                        el.position = el.position - 1
                    }
                    return el;
                })
            } else {
                array.map(el => {
                    if (el.position === position) {
                        el.position = position - 1
                    } else if (el.position === (position - 1)) {
                        el.position = el.position + 1
                    }
                    return el;
                })
            }
            return array
        }

        if (arrow === "down") {
            if (position === array.length) {
                array.map(el => {
                    if (el.position == array.length) {
                        el.position = 1
                    } else {
                        el.position = el.position + 1
                    }
                    return el;
                })
            } else {
                array.map(el => {
                    if (el.position == position) {
                        el.position = (position + 1)
                    } else if (el.position == (position + 1)) {
                        el.position = (el.position - 1)
                    }
                    return el;
                })
            }
            return array
        }
    }

    move({ column, arrow, position }) {
        switch (column) {
            case "section":
                this.forms = this.moveItem({ array: this.forms, arrow, position })
                this.printSections();
                break;
            case "block":
                this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'] = this.moveItem({ array: this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'], arrow, position })
                this.printBlocks();
                break;
            case "field":
                this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'] = this.moveItem({ array: this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'], arrow, position })
                this.printFields()
                break;
            default:
                break;
        }
    }

    customFields(type) {
        switch (type) {
            case "select":
            case "field_select":
            case "checkbox":
            case "radio-multiple":
                this.selectorsCustomFields.options.classList.remove("hidden")
                this.selectorsCustomFields.html.classList.add("hidden")
                break;
            case "html":
                this.selectorsCustomFields.options.classList.add("hidden")
                this.selectorsCustomFields.html.classList.remove("hidden")
                break;
            default:
                this.selectorsCustomFields.options.classList.add("hidden")
                this.selectorsCustomFields.html.classList.add("hidden")
                break;
        }
    }

    resetForms(data) {
        this.forms = this.resetPositions(data)
        this.printSections()
    }

    resetSections() {

    }

    resetFields(data) {
         console.log(data)
         if ("en" in data) {
              this.forms = data
              this.printFields()
         } else {
              switch (this.sections) {
                  case 3:
                      break;
                  case 2:
                      break;
                  case 1:
                      this.forms[this.currentLanguage]['sections'][this.indexSection]['blocks'][this.indexBlock]['fields'] = this.resetPositions(data[0]['blocks'][0]['fields'])
                      this.printFields();
                      break;
                  default:
                      break;
              }
         }
    }

    get options() {
        let children = this.selectorsCustomFields.optionsBody.children
        let array = []
        for (let i = 0; i < children.length; i++) {
            array.push({
                title: children[i].children[0].children[0].value,
                value: children[i].children[1].children[0].value,
                icon: children[i].children[2].children[0].value,
                required: children[i].children[3].children[0].checked,
                textarea: children[i].children[4].children[0].checked
            })
        }
        return array
    }

    optionHTML(option) {
        return `
          <tr class="h-12 border-t border-gray-300">
               <td class="p-3">
                    <input type="text" value="${option?.title || ""}" placeholder="Name" class="${this.inputClass}" />
               </td>
               <td class="p-3 relative">
                    <input type="text" value="${option?.value || ""}" placeholder="Value" class="${this.inputClass}" />
               </td>
               <td class="p-3 relative">
                    <input type="text" value="${option?.icon || ""}" placeholder="Value" class="${this.inputClass}" />
               </td>
               <td class="p-3 relative">
                    <input type="checkbox" ${option?.required && 'checked'} placeholder="Value" class="${this.inputClass}" />
               </td>
               <td class="p-3 relative">
                    <input type="checkbox" ${option?.textarea && 'checked'} placeholder="Value" class="${this.inputClass}" />
                    <button data-action="deleteoption" class="w-8 h-8 bg-red-200 text-red-800 rounded flex items-center justify-center absolute top-5 right-5"><i class="fas fa-trash pointer-events-none"></i></button>
               </td>
          </tr>
          `
    }

    addOption(array = []) {
        const insert = (option) => {
            this.selectorsCustomFields.optionsBody.insertAdjacentHTML("beforeend", this.optionHTML(option))
        }
        if (array && array.length > 0) {
            this.selectorsCustomFields.optionsBody.innerHTML = ""
            array.forEach(el => {
                insert(el)
            })
        } else {
            insert()
        }
    }

    deleteOption(e) {
        e.target.parentElement.parentElement.remove()
    }

    constructForm() {
        let html = `
               <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4" data-id="${this.idFormLanguage}">
                            ${Forms({
            form_builder: [
                {
                    type: "select",
                    name: "language",
                    label: "Idioma",
                    data_attributes: {
                        action: "language"
                    },
                    options: COUNTRIES.map(el => {
                        return {
                            title: el.title,
                            value: el.name
                        }
                    })
                }
            ]
        })}
                            <custom-field type="number" data-id="${this.idFormColumns}" label="Columns"></custom-field>
                        </div>
                    </div>
                    <div class="flex flex-col relative">
                        ${this.constructLines()}
                        ${this.constructTop()}
                        ${this.constructBody()}
                    </div>
               </div>
               ${this.constructModals()}
          `
        document.getElementById(this.selector).innerHTML = `${html}`

        document.body.addEventListener("change", e => {
            switch (e.target.dataset.action) {
                case "language":
                    console.log("Language")
                    this.currentLanguage = e.target.value
                    this.printFields()
                    break;
                default:
                    break;
            }
        })

        document.body.addEventListener("click", e => {
            switch (e.target.dataset.action) {
                case "section":
                    this.indexSection = e.target.dataset.index
                    this.printBlocks()
                    break;
                case "block":
                    this.indexBlock = e.target.dataset.index
                    this.printFields()
                    break;
                case "editsection":
                    this.indexSection = e.target.dataset.index
                    this.sectionMethod = "edit"
                    this.editSection()
                    break;
                case "editblock":
                    this.indexBlock = e.target.dataset.index
                    this.blockMethod = "edit"
                    this.editBlock()
                    break;
                case "editfield":
                    this.indexField = e.target.dataset.index
                    this.fieldMethod = "edit"
                    this.editField();
                    break;
                case "savesection":
                    this.saveSection()
                    break;
                case "saveblock":
                    this.saveBlock()
                    break;
                case "savefield":
                    this.saveField().catch(err => {
                        console.log(err)
                    });
                    break;
                case "deletesection":
                    this.indexSection = e.target.dataset.index
                    this.deleteSection()
                    break;
                case "deleteblock":
                    this.indexBlock = e.target.dataset.index
                    this.deleteBlock()
                    break;
                case "deletefield":
                    this.indexField = e.target.dataset.index;
                    this.deleteField();
                    break;
                case "moveupsection":
                    this.indexSection = e.target.dataset.index
                    this.move({ column: "section", arrow: "up", position: parseFloat(e.target.dataset.position) })
                    break;
                case "movedownsection":
                    this.indexSection = e.target.dataset.index
                    this.move({ column: "section", arrow: "down", position: parseFloat(e.target.dataset.position) })
                    break
                case "moveupblock":
                    this.indexBlock = e.target.dataset.index
                    this.move({ column: "block", arrow: "up", position: parseFloat(e.target.dataset.position) })
                    break;
                case "movedownblock":
                    this.indexBlock = e.target.dataset.index
                    this.move({ column: "block", arrow: "down", position: parseFloat(e.target.dataset.position) })
                    break;
                case "moveupfield":
                    this.indexField = e.target.dataset.index
                    this.move({ column: "field", arrow: "up", position: parseFloat(e.target.dataset.position) })
                    break;
                case "movedownfield":
                    this.indexField = e.target.dataset.index
                    this.move({ column: "field", arrow: "down", position: parseFloat(e.target.dataset.position) })
                    break;
                case "modalForm":
                    this.sectionMethod = "add";
                    this.blockMethod = "add";
                    this.fieldMethod = "add";
                    this.modalForm(e);
                    break;
                case "addOption":
                    this.addOption();
                    break;
                case "deleteoption":
                    this.deleteOption(e)
                    break;
                default:
                    break;
            }
        });

        document.body.addEventListener("change", e => {
            switch (e.target.dataset.action) {
                case "fieldtype":
                    this.customFields(e.target.value)
                    break;
                default:
                    break;
            }
        })
    }
}

function Forms({ form_builder, selector = "", key_parent = "", columns = 1, values = {}, showOptions = false }) {
    const formId = uniqueIdForm()()
    const info = (info) => {
        return `
            <div class="ml-2">
                <div class="w-5 h-5 bg-gray-100 text-gray-700 flex items-center justify-center rounded-full text-xs tooltip relative cursor-pointer">
                    <i class="fas fa-info"></i>
                    <p class="text-xs mb-1 absolute p-2 rounded-md -top-10 hidden whitespace-nowrap bg-gray-700 text-white border border-gray-300">${info}</p>
                </div>
            </div>`
    }

    const classInput = "bg-white placeholder-gray-500 w-full border border-gray-300 hover:border-blue-600 py-2.5 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"

    let html = ''
    const printForms = () => {
        html += `<div id="${formId}">`
        html += `
               <div class="flex gap-3 mb-3 ${showOptions ? "" : "hidden"}">
                    <div type="button" data-action="tabs${formId}" data-type="all" data-tabs="tabs" data-tabsall="tabform" class="cursor-pointer px-3.5 py-3 focus:ring-4 focus:ring-purple-400 border border-solid border-purple-300 text-white bg-purple-700 focus:outline-none rounded-lg">
                         Ver todo
                    </div>
                    <div type="button" data-action="tabs${formId}" data-type="sequential" data-tabs="tabs" data-tabsall="tabform" class="cursor-pointer px-3.5 py-3 focus:ring-4 focus:ring-purple-400 border border-solid border-purple-300 text-purple-700 focus:outline-none rounded-lg">
                         Ver secuencialmente
                    </div>
               </div>
          `
        html += `<div class="grid grid-cols-1 md:grid-cols-${columns} gap-3 items-end">`
        let checked = '<span class="hidden absolute bottom-4 text-green-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-check"></i></span>'
        let warning = '<span class="hidden absolute bottom-4 text-red-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-exclamation-triangle"></i></span>'
        JSON.stringify(form_builder).startsWith("{") ? "" : form_builder?.forEach((el, i) => {
            let htmlDataAttributes = ""
            if (el.hasOwnProperty("data_attributes")) {
                Object.entries(el?.data_attributes).forEach(([key, value]) => {
                    htmlDataAttributes += `data-${key}='${value}'`
                })
            }
            let htmlInt = ""
            switch (el.type) {
                case "date":
                case "datetime-local":
                case "email":
                case "file":
                case "hidden":
                case "month":
                case "number":
                case "password":
                case "range":
                case "reset":
                case "search":
                case "submit":
                case "tel":
                case "text":
                case "time":
                case "url":
                case 'textarea':
                case "color":
                case 'radio':
                case "select":
                case "image":
                case "checkbox":
                    if (el.type == "select") {
                        el?.options && el?.options?.forEach(ele => {
                            let checked = null
                            if (values[el?.name] == ele.value) {
                                checked = true
                            }
                            if (values[el.name] && Object.keys(values[el.name]).length > 0) {
                                // if (values[el.name].some(el => el == ele.value)) {
                                //     checked = true
                                // }
                            }
                            let htmlDataAttributesByOptions = ""
                            if (ele.hasOwnProperty("data_attributes")) {
                                Object.entries(ele?.data_attributes).forEach(([key, value]) => {
                                    htmlDataAttributesByOptions += `data-${key}=${value} `
                                })
                            }
                            htmlInt += `
                                        <option 
                                             value="${ele.value}" 
                                             ${checked ? "selected" : ""} 
                                             ${htmlDataAttributesByOptions}>
                                             ${ele.title}
                                        </option>
                                   `
                        })
                    }
                    if (el.type == "checkbox") {
                        if (el?.options?.length > 0) {
                            htmlInt += `
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            `
                            el?.options.forEach(check => {
                                htmlInt += `
                                             <div class="relative flex rounded-xl w-full">
                                                  <input type="checkbox" class="cursor-pointer focus:outline-none focus:ring-4 ring-inset rounded-xl focus:ring-blue-200 absolute w-full h-full appearance-none form__checkbox" data-multiple="true" data-keyparent="${el.name}" data-fullkey="${key_parent || "" + check.title}" name="${check.title}" ${htmlDataAttributes} data-alternatename="${check.alternate_name || ""}" />
                                                  <div class="text-sm rounded-xl flex flex-col gap-2 items-center justify-center">
                                                       <div class="form__checkbox--circle absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-sm bg-opacity-30 rounded-full bg-white hidden">
                                                            <i class="fas fa-check"></i>
                                                       </div>
                                                       <div class="${!check?.icon && 'hidden'} bg-gray-100 p-2 rounded-lg">
                                                            <img src="${check?.icon}" style="max-width: 45px; max-height: 45px;"  />
                                                       </div>
                                                       <span class="flex font-medium text-center leading-4">${check.title}</span>
                                                  </div>
                                             </div>
                                        `
                            })
                            htmlInt += `</div>`
                        } else {
                            htmlInt += `
                                        <div class="relative w-full grid col-span-${el.columns ? el.columns : '3'} ${el.hidden ? "hidden" : ""}">
                                             <label class="flex w-full items-center py-4 border rounded-xl px-4 cursor-pointer">
                                                  ${warning}
                                                  <input type="checkbox" data-multiple="false" class="cursor-pointer" data-fullkey="${key_parent + el.name}" name="${el.name}" data-required="${el.required && 'true'}" />
                                                  ${checked}
                                                  <p class="ml-2">${el.label} ${el.required ? '*' : ''}</p>
                                             </label>
                                        </div>
                                   `
                        }
                    }
                    html += `
                              <div data-allfields="${formId}" data-indexblockfield="${i}" class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden ? "hidden" : ""}">
                                   <custom-field 
                                        type="${el.type}" 
                                        alternatename="${el.alternate_name || ""}"
                                        pattern="${el.pattern || ""}"
                                        fullkey="${key_parent || ""}
                                        autocomplete="${el.name}
                                        data-value="${values[el.name] ? values[el.name] : el.value || ''}"
                                        focus=${i}
                                        disabled="${el.disabled || false}" 
                                        required="${el.required || false}" 
                                        data-name='${el.name}'
                                        ${htmlDataAttributes}
                                        label="${el.label}">${htmlInt}</custom-field>
                              </div>
                         `
                    break;
                case 'radio-multiple':
                    let htmlOptions = ""
                    el?.options.forEach((check, i) => {
                        let checkedRadio = null
                        if (values[el.name] == check.value) {
                            checkedRadio = true
                        }
                        htmlOptions += `
                                   <custom-field 
                                        option="${check.title}"
                                        optionvalue="${check.value}"
                                        onlyfield="true"
                                        type="${el.type}" 
                                        alternatename="${el.alternate_name || ""}"
                                        pattern="${el.pattern || ""}"
                                        fullkey="${key_parent || ""}
                                        autocomplete="${el.name}
                                        value="${el.value || null}"
                                        focus=${i}
                                        disabled="${el.disabled || false}" 
                                        required="${el.required || false}" 
                                        name="${el.name}" 
                                        label="${el.label}">${htmlInt}</custom-field>
                              `
                    })
                    html += `
                         <div data-allfields="${formId}" data-indexblockfield="${i}" class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden ? "hidden" : ""}">
                              <custom-field 
                                   type="label" 
                                   required="${el.required || false}" 
                                   label="${el.label}"></custom-field>
                              <div class="flex flex-col gap-2">
                                   ${htmlOptions}
                              </div>
                         </div>
                         `
                    break;
                case 'button':
                    html += `
                         <div data-allfields="${formId}" data-indexblockfield="${i}" class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden ? "hidden" : ""} ${el.hide ? 'hidden' : ''}" name="blockform${el.name}">
                              <button type="button" class="${classInput} bg-blue-600 text-white"
                              data-fullkey="${key_parent || ""}${el.name}" name="${el.name}" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}">${el.label}</button>
                         </div>
                         `
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                case 'p':
                    html += `
                              <div data-allfields="${formId}" data-indexblockfield="${i}" class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden ? "hidden" : ""}" name="${el.name}">
                                   <custom-field type="${el.type}" label="${el.label}"></custom-field>
                              </div>`
                    break;
                case 'html':
                    html += `
                              <div data-allfields="${formId}" data-indexblockfield="${i}" class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden ? "hidden" : ""}" name="${el.name}">
                                   ${el.html}
                              </div>
                         `
                    break;
                default:
                    break
            }
        })
        if (showOptions) {
            html += `
                         <div data-allfields="${formId}" class="hidden grid col-span-${columns}" data-indexblockfield="${form_builder.length}" id="blockSentSequential${formId}" >
                              <button type="submit" class="w-full font-semibold text-lg mt-2 focus:outline-none focus:ring-4 focus:ring-blue-300 py-3.5 text-white rounded-lg bg-blue-600" id="sentSequential${formId}">Enviar</button>
                         </div>
                    `
        }
        html += `</div>`
        html += `
               <div class="hidden" data-sequentialbuttons="all">
                    <div class="mt-3" id="infoSteps${formId}">1/${form_builder.length + 1}</div>
                    <input type="hidden" data-skipValidation="true" data-finish="false" data-id="${formId}" data-info data-type="all" data-currentindex="0" data-totalfields="${form_builder.length}" id="infoStepsHidden${formId}" />
                    <div class="grid grid-cols-2 gap-3">
                         <button type="button" 
                              data-action="backblockfield" 
                              class="opacity-40 focus:outline-none focus:outline-none focus:ring-4 focus:ring-gray-300 text-gray-800 py-5 mt-3 bg-gray-200 text-white text-base justify-center font-semibold rounded-xl px-4 flex items-center">
                              <i class="fas fa-angle-left mr-2 mt-1"></i>
                              Atrás
                         </button>
                         <button type="button" 
                              data-action="nextblockfield" 
                              class="focus:outline-none focus:ring-4 focus:ring-blue-300 py-5 mt-3 bg-blue-600 text-white text-base justify-center font-semibold rounded-xl px-4 flex items-center">
                              Siguiente <i class="fas fa-angle-right ml-2 mt-1"></i>
                         </button>
                    </div>
               </div>
          `
        html += `</div>`
    }
    printForms()

    const focusElement = (index) => {
        if (document.querySelector(`[data-focus='${index + 1}']`))
            document.querySelector(`[data-focus='${index + 1}']`).focus()
    }

    const formatForm = (type) => {
        const $infoStepsHidden = document.getElementById("infoStepsHidden" + formId)
        const currentStep = $infoStepsHidden.getAttribute("data-currentindex")
        if (type === "sequential") {
            document.getElementById(formId).closest("form").querySelectorAll("[type='submit']").forEach(el => el.classList.add("hidden"))
            document.querySelector("[data-sequentialbuttons='all']").classList.remove("hidden")
            document.querySelectorAll(`[data-allfields='${formId}']`).forEach(el => el.classList.add("hidden"))
            document.querySelector(`[data-indexblockfield='${currentStep}']`).classList.remove("hidden")

            document.getElementById("sentSequential" + formId).classList.remove("hidden")

            document.getElementById("infoSteps" + formId).classList.remove("hidden")

            $infoStepsHidden.setAttribute("data-type", "sequential")
        }
        if (type === "all") {
            document.getElementById(formId).closest("form").querySelectorAll("[type='submit']").forEach(el => el.classList.remove("hidden"))
            document.querySelector("[data-sequentialbuttons='all']").classList.add("hidden")
            document.querySelectorAll(`[data-allfields='${formId}']`).forEach(el => el.classList.remove("hidden"))

            document.getElementById("sentSequential" + formId).classList.add("hidden")

            $infoStepsHidden.setAttribute("data-type", "all")
        }
    }

    const goToBlockField = (type) => {
        const $infoStepsHidden = document.getElementById("infoStepsHidden" + formId)
        const totalFields = parseFloat($infoStepsHidden.getAttribute("data-totalFields"))
        let index = parseFloat($infoStepsHidden.getAttribute("data-currentindex"))
        let toIndex = null
        if (type === "next") {
            toIndex = index + 1
        }
        if (type === "back") {
            toIndex = index - 1
        }
        const pass = () => {
            $infoStepsHidden.setAttribute("data-currentindex", toIndex)
            document.querySelectorAll(`[data-allfields='${formId}']`).forEach(el => el.classList.add("hidden"))
            document.querySelector(`[data-indexblockfield='${toIndex}']`).classList.remove("hidden")

            document.getElementById(`infoSteps${formId}`).textContent = (toIndex + 1) + "/" + (totalFields + 1)
        }

        if (type === "next") {
            validateForm({ selector: document.getElementById(formId).closest("form").id, form_builder: [], name: "", validateIndexes: [index] })
                .then(() => {
                    $infoStepsHidden.setAttribute("data-finish", false)
                    if (toIndex == 0) {
                        document.querySelector("[data-action='backblockfield']").classList.add("opacity-40")
                        document.querySelector("[data-action='backblockfield']").classList.add("pointer-events-none")
                    } else {
                        document.querySelector("[data-action='backblockfield']").classList.remove("opacity-40")
                        document.querySelector("[data-action='backblockfield']").classList.remove("pointer-events-none")
                    }

                    if (index == totalFields - 1) {
                        document.getElementById("infoSteps" + formId).classList.add("hidden")
                        $infoStepsHidden.setAttribute("data-finish", true)
                        document.querySelector("[data-action='nextblockfield']").classList.add("opacity-40")
                        document.querySelector("[data-action='nextblockfield']").classList.add("pointer-events-none")
                    } else {
                        document.querySelector("[data-action='nextblockfield']").classList.remove("opacity-40")
                        document.querySelector("[data-action='nextblockfield']").classList.remove("pointer-events-none")
                    }
                    pass()
                }).catch(err => {
                    console.log(err)
                })
        } else {
            document.getElementById("infoSteps" + formId).classList.remove("hidden")
            $infoStepsHidden.setAttribute("data-finish", false)
            if (toIndex == 0) {
                document.querySelector("[data-action='backblockfield']").classList.add("opacity-40")
                document.querySelector("[data-action='backblockfield']").classList.add("pointer-events-none")
            } else {
                document.querySelector("[data-action='backblockfield']").classList.remove("opacity-40")
                document.querySelector("[data-action='backblockfield']").classList.remove("pointer-events-none")
            }

            if (!index > 0) {
                document.querySelector("[data-action='nextblockfield']").classList.add("opacity-40")
                document.querySelector("[data-action='nextblockfield']").classList.add("pointer-events-none")
            } else {
                document.querySelector("[data-action='nextblockfield']").classList.remove("opacity-40")
                document.querySelector("[data-action='nextblockfield']").classList.remove("pointer-events-none")
            }
            pass()
        }
    }

    document.body.addEventListener("click", e => {
        switch (e.target.dataset.action) {
            case "nextfocus":
                const { index } = e.target.dataset
                focusElement(parseFloat(index))
                break;
            case "nextblockfield":
                goToBlockField('next')
                break;
            case "backblockfield":
                goToBlockField('back')
                break;
            case "tabs" + formId:
                const { type } = e.target.dataset
                formatForm(type)
                break;
        }
    })

    if (selector) {
        document.getElementById(selector).innerHTML = html
    } else {
        return html
    }
}

function constructFormValues({ builder, values }) {
    let types = {}
    builder.forEach(el => {
        types[el.name] = {
            type: el.type,
            title: el.label
        }
    })
    let html = ''
    html += `<div class="grid grid-cols-1 gap-2">`
    Object.entries(values).forEach(([key, value]) => {
        if (builder.length > 0 && types[key]) {
            switch (types[key].type) {
                case "field_text":
                case "field_date":
                case "field_hour":
                case "field_address":
                case "field_email":
                case "field_password":
                case "field_number":
                case "field_select":
                case "color":
                case "date":
                case "datetime-local":
                case "email":
                case "hidden":
                case "image":
                case "month":
                case "number":
                case "password":
                case "range":
                case "reset":
                case "search":
                case "tel":
                case "text":
                case "time":
                case "url":
                case "select":
                case "textarea":
                    html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <p>${value ? value : 'Empty.'}</p>
                              </div>
                         `
                    break;
                // case "p":
                // case "h1":
                // case "h2":
                // case "h3":
                // case "h4":
                // case "h5":
                // case "h6":
                // case "H1":
                // case "H2":
                // case "H3":
                // case "H4":
                // case "H5":
                // case "H6":
                //      html += `
                //           <div>
                //                <${types[key].type} class="font-semibold">${types[key].title}</${types[key].type}>
                //           </div>
                //      `
                //      break;
                case "radio":
                    html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <p>${value ? "Si" : 'No'}</p>
                              </div>
                         `
                    break;
                case "checkbox":
                case "field_checkbox":
                case "field_checkboxes":
                    let htmlValues = ""
                    if (typeof value == "boolean") {
                        htmlValues = value ? "Si" : "No"
                    } else {
                        htmlValues += `
                              <table class="max-w-sm rounded border-l border-r border-b w-full text-sm">
                                   <tbody>`
                        Object.entries(value).forEach(([key, value]) => {
                            htmlValues += `
                                   <tr class="border-t">
                                        <td class="p-2 font-semibold bg-gray-50 border-r">${key}</td>
                                        <td class="p-2 w-12">
                                             ${value?.checked === true || value === true ? "<i class='fas fa-check text-green-600'></i>" : "<i class='fas fa-times text-red-600'></i>"}
                                        </td>
                                   </tr>
                              `
                        })
                        htmlValues += `
                                   </tbody>
                              </table>`
                    }
                    html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <div class="flex flex-col">
                                        ${htmlValues}
                                   </div>
                              </div>
                         `
                    break;
                case "field_file":
                case "file":
                    let files = ''
                    value.length > 0 && value.forEach(el => {
                        files += `
                                        <a class="flex rounded px-2 py-1 bg-gray-50 w-max border border-solid border-gray-400" href="/static/uploads/${el.split('uploads/')[1]}" target="_blank">${el.split('uploads/')[1]}</a>
                                   `
                    })
                    html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <div class="flex">
                                        ${files}
                                   </div>
                              </div>
                              `
                    break;
                default:
                    break;
            }
        }
    })
    html += `</div>`
    return html
}

async function validateForm({ selector, form_builder = [], name = "", validateIndexes = [] }) {
    const formInfo = document.querySelector(`[id='${selector}'] [data-info]`)
    // let quantityFields = document.querySelectorAll(`[data-allfields='${formInfo.getAttribute("data-id")}']`)
    let forms = document.querySelectorAll(`[id='${selector}'] textarea, [id='${selector}'] input, [id='${selector}'] select`);
    let fd = new FormData()
    let filenames = []
    let form = {}

    if (validateIndexes.length > 0) {
        forms = document.querySelectorAll(`[data-indexblockfield='${validateIndexes[0]}'] input, [data-indexblockfield='${validateIndexes[0]}'] select, [data-indexblockfield='${validateIndexes[0]}'] textarea`)
    }

    if (formInfo) {
        if (validateIndexes.length <= 0 && formInfo.getAttribute("data-type") === "sequential" && formInfo.getAttribute("data-finish") == "false") {
            throw Error("no passed");
        }
    }

    const error = (e) => {
        e.classList.remove('border-gray-300')
        e.classList.add('border-red-400')
        e.previousElementSibling.classList.remove("hidden")
        e.nextElementSibling.classList.add("hidden")
    }
    const success = (e) => {
        e.classList.add('border-gray-300')
        e.classList.remove('border-red-400')
        e.previousElementSibling.classList.add("hidden")
        e.nextElementSibling.classList.remove("hidden")
    }
    let promise = new Promise((resolve, reject) => {
        let checked = []
        for (let i = 0; i < forms.length; i++) {
            let field = form_builder.find(el => el.name == forms[i].getAttribute("name"))
            if (field?.skipValidation == true || forms[i].getAttribute("data-skipValidation") == "true") {
                break;
            }
            switch (forms[i].type) {
                case "date":
                case "datetime-local":
                case "email":
                case "color":
                case "hidden":
                case "month":
                case "number":
                case "password":
                case "range":
                case "reset":
                case "search":
                case "tel":
                case "text":
                case "time":
                case "url":
                case "textarea":
                case "select-one":
                case "select":
                case "select-multiple":
                    if (forms[i].type == "select-multiple") {
                        let opts = [...forms[i].options].reduce((acc, cur) => {
                            if (cur.selected)
                                acc.push(cur.value)
                            return acc
                        }, [])
                        form[forms[i].getAttribute(name || "name")] = opts
                        fd.append(forms[i].getAttribute(name || "name"), opts)
                    } else {
                        form[forms[i].getAttribute(name || "name")] = forms[i].value
                        fd.append(forms[i].getAttribute(name || "name"), forms[i].value)
                    }
                    if (forms[i].dataset.required == 'true' && forms[i].getAttribute("pattern")) {
                        let patt = forms[i].getAttribute("pattern") || field.pattern
                        const [, pattern, flags] = patt.match(/\/(.*)\/([a-z]*)/);
                        const regex = new RegExp(pattern, flags);
                        if (!regex.test(forms[i].value)) {
                            error(forms[i])
                            checked.push(false)
                        } else {
                            success(forms[i])
                        }
                    } else if (forms[i].dataset.required == 'true' && !forms[i].value) {
                        error(forms[i])
                        checked.push(false)
                    } else {
                        success(forms[i])
                    }
                    break;
                case "radio":
                    if (!forms[i].dataset.multiple) {
                        const radioButtons = document.querySelectorAll(`input[name="${forms[i].name}"]`);
                        let selected;
                        for (const radioButton of radioButtons) {
                            if (radioButton.checked) {
                                selected = radioButton.getAttribute("data-value");
                                break;
                            }
                        }
                        if (forms[i].dataset.required == 'true' && !selected) {
                            checked.push(false)
                            forms[i].parentElement.classList.add("border-red-300")
                        } else {
                            forms[i].parentElement.classList.remove("border-red-300")
                        }
                        form[forms[i].getAttribute("name")] = selected == "true" ? true : false
                        fd.append(forms[i].getAttribute("name"), selected == "true" ? true : false)
                    } else {
                        const radioButtons = document.querySelectorAll(`input[name="${forms[i].name}"]`);
                        let selected;
                        for (const radioButton of radioButtons) {
                            if (radioButton.checked) {
                                selected = radioButton.getAttribute("data-value");
                                break;
                            }
                        }
                        form[forms[i].getAttribute("name")] = selected
                        fd.append(forms[i].getAttribute("name"), selected)

                        if (forms[i].dataset.required == 'true' && !form[forms[i].getAttribute("name")]) {
                            forms[i].parentElement.classList.add("border-red-300")
                            checked.push(false)
                        } else {
                            forms[i].parentElement.classList.remove("border-red-300")
                        }
                    }
                    break;
                case "field_checkboxes":
                case "field_checkbox":
                case "checkbox":
                    if (forms[i].getAttribute("data-multiple") == "true") {
                        form[forms[i].getAttribute("data-keyparent")] = { ...form[forms[i].getAttribute("data-keyparent")] }
                        form[forms[i].getAttribute("data-keyparent")][forms[i].getAttribute(name || "name")] = forms[i].checked
                    } else {
                        form[forms[i].getAttribute("name")] = forms[i].checked
                        fd.append(forms[i].getAttribute("name"), forms[i].checked)
                        if (!forms[i].checked && forms[i].dataset.required == 'true') {
                            error(forms[i])
                            checked.push(false)
                        } else {
                            success(forms[i])
                        }
                    }
                    break;
                case "file":
                    form[forms[i].getAttribute("name")] = ''
                    if (forms[i].dataset.required == 'true' && forms[i].files.length <= 0) {
                        error(forms[i])
                        checked.push(false)
                    } else {
                        success(forms[i])
                        for (let s = 0; s < forms[i].files.length; s++) {
                            fd.append("files[]", forms[i].files[s])
                            filenames.push(forms[i].getAttribute("name"))
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        if (!checked.length > 0) {
            fd.append('filenames', JSON.stringify({ 'file_details': filenames }))
            resolve([fd, form])
        } else {
            reject(false)
        }
    })
    return await promise;
}

function hookFormSetValues({ types, values }) {
    Object.entries(values).forEach(([k, v]) => {
        switch (types[k]) {
            case "text":
            case "number":
            case "date":
            case "select":
            case "textarea":
            case "select-one":
                if (document.querySelector(`[data-field][name='${k}']`)) {
                    document.querySelector(`[data-field][name='${k}']`).value = v
                }
                break;
            case "select-multiple":
                let options = document.querySelector(`[data-field][name='${k}']`).options
                for (let i = 0; i < options.length; i++) {
                    if (v.includes(options[i].value))
                        options[i].selected = true
                }
                break;
            case "radio":
                if (v) {
                    document.querySelector(`[data-field][name='${k}'][data-value='true']`).checked = true
                }
                if (v === false) {
                    document.querySelector(`[data-field][name='${k}'][data-value='false']`).checked = true
                }
                break;
            case "radio-multiple":
                if (document.querySelector(`[data-field][name='${k}'][data-value='${v}']`)) {
                    document.querySelector(`[data-field][name='${k}'][data-value='${v}']`).checked = true
                }
                break;
            case "checkbox":
                if (document.querySelector(`[data-field][name='${k}']`)) {
                    document.querySelector(`[data-field][name='${k}']`).checked = v
                }
                break;
            default:
                break;
        }
    })
}