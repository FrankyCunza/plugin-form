const types = [
     {
          title: "Button",
          type: "button"
     },
     {
          title: "Checkbox",
          type: "checkbox"
     },
     {
          title: "Color",
          type: "color"
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
          title: "Text",
          name: "text"
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
     }
]

class Form {
     constructor(selector, { sections }) {
          this.selector = selector
          this.sections = sections
          this.forms = [
               {
                    blocks: [
                         {
                              label: "Personal Data",
                              name: "personal_data",
                              position: 1,
                              fields: [
                                   {
                                        label: "Name",
                                        name: "name",
                                        type: "text",
                                        position: 1
                                   },
                                   {
                                        label: "Last Name",
                                        name: "last_name",
                                        type: "text",
                                        position: 2
                                   }
                              ]
                         },
                         {
                              title: "Personal Data Test",
                              name: "personal_data_test",
                              position: 2,
                              fields: [
                                   {
                                        label: "Name Field",
                                        name: "name",
                                        type: "field_text",
                                        position: 1
                                   },
                                   {
                                        label: "Last Name",
                                        name: "last_name",
                                        type: "text",
                                        position: 2
                                   }
                              ]
                         }
                    ],
                    title: "Personal Information",
                    name: "personal_information",
                    position: 2
               },
               {
                    blocks: [
                         {
                              title: "Passport",
                              name: "passport",
                              position: 1,
                              fields: [
                                   {
                                        label: "Pasaporte",
                                        name: "passport",
                                        position: 1
                                   }
                              ]
                         }
                    ],
                    label: "Passport Details",
                    name: "passport_details",
                    position: 1
               },
               {
                    blocks: [
                         {
                              label: "Test",
                              name: "test",
                              position: 1,
                              fields: [
                                   {
                                        label: "Test",
                                        name: "test",
                                        position: 1
                                   }
                              ]
                         }
                    ],
                    label: "Test",
                    name: "test",
                    position: null
               },
               {
                    blocks: [
                         {
                              label: "Test Two",
                              name: "test_two",
                              position: 1,
                              fields: [
                                   {
                                        label: "Test",
                                        name: "test",
                                        position: 1
                                   }
                              ]
                         }
                    ],
                    label: "Test Two",
                    name: "test_two",
                    position: null
               }
          ]
          this.indexSection = null
          this.indexBlock = null
          this.indexField = null
          this.modalSectionId = 'modalSection'
          this.modalBlockId = 'modalBlock'
          this.modalFieldId = 'modalField'
          this.colSectionId = 'colSections'
          this.colBlockId = 'colBlocks'
          this.colFieldId = 'colFields'
          this.modalSectionInput = 'modalSectionInput'
          this.modalBlockInput = 'modalBlockInpuit'
          this.sectionMethod = "add"
          this.blockMethod = "add"
          this.inputClass = 'w-full px-3 focus:outline-none focus:ring-4 focus:ring-blue-400 h-12 border border-gray-300 rounded-xl w-full'
          this.types = types
          this.idFields = {
               name: "fieldName",
               info: "fieldInfo",
               alternateName: "fieldAlternateName",
               columns: "fieldColumns",
               pattern: "fieldPattern",
               type: "fieldType",
               required: "fieldRequired"
          }
          this.idCustomFields = {
               options: "fieldOptions",
               optionsBody: "fieldOptionsBody"
          }
          this.indexSection = null;
          this.indexBlock = null;
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
          this.selectorsFields = {
               name: document.getElementById(this.idFields.name),
               info: document.getElementById(this.idFields.info),
               alternateName: document.getElementById(this.idFields.alternateName),
               columns: document.getElementById(this.idFields.columns),
               pattern: document.getElementById(this.idFields.pattern),
               type: document.getElementById(this.idFields.type),
               required: document.getElementById(this.idFields.required)
          }
          this.selectorsCustomFields = {
               options: document.getElementById(this.idCustomFields.options),
               optionsBody: document.getElementById(this.idCustomFields.optionsBody)
          }
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
                    return this.forms
                    break;
               case 2:
                    return this.forms
                    break;
               case 3:
                    return this.forms
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
       <div class="${i < this.sections - 1 ? 'border-r border-gray-300' : ''}">
                </div>
     `
          })
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
         <h2 class="font-bold text-xl text-gray-800 mb-3">Agregar sección</h2>
      <input type="text" id="${this.modalSectionInput}" 
      class="${this.inputClass}" />
      <button type="button" data-action="savesection" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Guardar</button>
    </div>
  </div>
`
          let htmlModalBlock = `
     <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20 hidden" id="${this.modalBlockId}">
       <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-full" data-action="modalForm" data-modaltarget="${this.modalBlockId}"></div>
    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full">
         <h2 class="font-bold text-xl text-gray-800 mb-3">Agregar bloque</h2>
      <input type="text" id="${this.modalBlockInput}" 
      class="${this.inputClass}" />
      <button type="button" data-action="saveblock" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Guardar</button>
    </div>
  </div>
`
          let htmlTypes = ""
          this.types.forEach(el => {
               htmlTypes += `
       <option value="${el.name}">${el.title}</option>
  `
          })
          let htmlModalField = `
     <div class="fixed w-screen h-screen top-0 left-0 py-10 flex items-center justify-center z-20 hidden" id="${this.modalFieldId}">
       <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-screen" data-action="modalForm" data-modaltarget="${this.modalFieldId}"></div>
    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full h-full overflow-y-auto">
         <h2 class="font-bold text-xl text-gray-800 mb-3">Agregar campo</h2>
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
           <div>
             <label class="text-gray-800 font-medium">Nombre</label>
             <input type="text" id="${this.idFields.name}" 
      class="${this.inputClass}" />
        </div>
        <div>
             <label class="text-gray-800 font-medium">Info</label>
             <input type="text" id="fieldInfo" 
      class="${this.inputClass}" />
        </div>
        <div>
             <label class="text-gray-800 font-medium">Nombre alternativo</label>
             <input type="text" id="${this.idFields.alternateName}" 
      class="${this.inputClass}" />
        </div>
        <div>
             <label class="text-gray-800 font-medium">Columns</label>
             <select class="border border-gray-300 rounded-xl h-12 px-4 w-full" id="${this.idFields.columns}">
               <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div>
             <label class="text-gray-800 font-medium">Expresión regular</label>
             <input type="text" id="${this.idFields.pattern}" 
      class="${this.inputClass}" />
        </div>
        <div>
             <label class="text-gray-800 font-medium">Tipo</label>
             <select class="border border-gray-300 rounded-xl h-12 px-4 w-full" data-action="fieldtype" id="${this.idFields.type}">
            <option hidden>Select</option>
            ${htmlTypes}
          </select>
        </div>
        <div>
             <label class="text-gray-800 font-medium">Requerido</label>
             <select class="border border-gray-300 rounded-xl h-12 px-4 w-full" id="${this.idFields.required}">
               <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div class="flex flex-col mt-4 border border-gray-300 rounded-xl p-3 hidden" id="${this.idCustomFields.options}">
           <div class="flex items-center gap-2 mb-2">
             <label class="text-gray-800 font-medium">Options</label>
          <button class="bg-blue-50 tetx-xs text-blue-600 px-2 py-2 rounded-md font-medium" data-action="addOption">Agregar</button>
        </div>
        <div class="border border-gray-200 rounded-xl overflow-hidden">
             <table class="w-full">
            <thead class="bg-gray-50 h-12">
              <tr>
                <th class="font-medium text-left px-3">Nombre</th>
                <th class="font-medium text-left px-3">Valor</th>
              </tr>
            </thead>
            <tbody id="${this.idCustomFields.optionsBody}"></tbody>
          </table>
        </div>
      </div>
      <button type="button" data-action="savefield" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Guardar</button>
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

     get Forms() {
          return this.forms
     }

     button({ index, column, el }) {
          let htmlField = ""
          if (column === "field") {
               switch (el.type) {
                    case "field_text":
                    case "field_date":
                    case "field_hour":
                    case "field_address":
                    case "field_email":
                    case "field_password":
                    case "field_file":
                    case "field_number":
                    case "text":
                    case "radio":
                    case "date":
                    case "checkbox":
                    case "":
                    case undefined:
                         htmlField = `<input type="${el.type.includes("field_") ? el.type.split("field_")[1] : el.type}" class="${this.inputClass}" placeholder="${el.placeholder || ""}" />`
                         break;

                    case "select":
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
                    default:
                         break;
               }
          }
          return `
     <button data-action="${column}" data-index="${index}" class="px-2 py-6 hover:bg-gray-50 cursor-pointer flex h-22 justify-between items-center border-b border-gray-300 w-full ring-inset focus:outline-none focus:ring-2 focus:ring-blue-200 relative text-left">
            <div class="flex flex-col w-full ${column !== "field" ? "pointer-events-none" : ""}">
           <div class="pointer-events-none">
          ${el.label || el.title} ${el.required ? "*" : ""}
        </div>
        ${htmlField}
      </div>
      <div class="flex gap-1.5 absolute top-1 right-1.5">
        <div data-action="edit${column}" data-index="${index}" class="text-xs font-medium text-blue-600">Edit</div>
        <div data-action="delete${column}" data-index="${index}" class="text-xs font-medium text-red-600">Delete</div>
        <div data-action="moveup${column}" data-index="${index}" class="text-xs font-medium text-yellow-600">Up</div>
        <div data-action="movedown${column}" data-index="${index}" class="text-xs font-medium text-yellow-600">Down</div>
      </div>
    </button>
`
     }

     printSections() {
          const selector = document.getElementById(this.colSectionId)
          let html = ""
          if (this.forms.length > 0) {
               this.forms.sort(function (a, b) {
                    return a.position - b.position
               }).forEach((el, i) => {
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
          if (this.forms[this.indexSection]['blocks']?.length > 0) {
               this.forms[this.indexSection]['blocks'].sort(function (a, b) {
                    return a.position - b.position
               }).forEach((el, i) => {
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
          if (this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].length > 0) {
               this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].sort(function (a, b) {
                    return a.position - b.position
               }).forEach((el, i) => {
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
                    this.forms[this.indexSection].label = value
                    this.forms[this.indexSection].name = value
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
                    this.forms[this.indexSection]['blocks'].push(data);
               } else {
                    this.forms[this.indexSection]['blocks'][this.indexBlock].label = value;
                    this.forms[this.indexSection]['blocks'][this.indexBlock].name = value;
               }
          }
          document.getElementById(this.modalBlockId).classList.toggle("hidden")
          this.printBlocks()
     }

     saveField() {
          const label = this.selectorsFields.name.value
          const name = this.selectorsFields.name.value
          const info = this.selectorsFields.info.value
          const alternateName = this.selectorsFields.alternateName.value
          const columns = this.selectorsFields.columns.value
          const pattern = String.raw`${this.selectorsFields.pattern.value}`
          const type = this.selectorsFields.type.value
          const required = this.selectorsFields.required.value
          const options = this.options
          if (label) {
               if (this.fieldMethod === "add") {
                    this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].push({
                         label,
                         name,
                         info,
                         alternateName,
                         columns,
                         pattern,
                         type,
                         required,
                         position: this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].length + 1,
                         options
                    })
               } else {
                    let item = this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
                    item.label = label
                    item.name = name
                    item.info = info
                    item.alternateName = alternateName
                    item.columns = columns
                    item.pattern = pattern
                    item.type = type
                    item.required = required
                    item.options = options
               }
          }
          document.getElementById(this.modalFieldId).classList.toggle("hidden")
          this.printFields()
     }

     deleteSection() {
          delete this.forms[this.indexSection]
          let res = this.forms.filter(el => el !== undefined)
          this.forms = res
          this.printSections()
     }

     deleteBlock() {
          delete this.forms[this.indexSection]['blocks'][this.indexBlock]
          let res = this.forms[this.indexSection]['blocks'].filter(el => el !== undefined)
          this.forms[this.indexSection]['blocks'] = res
          this.printBlocks()
     }

     deleteField() {
          delete this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
          let res = this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].filter(el => el !== undefined)
          this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'] = res
          this.printFields()
     }

     editSection() {
          let section = this.forms[this.indexSection]
          document.getElementById(this.modalSectionId).classList.toggle("hidden")
          document.getElementById(this.modalSectionInput).value = section.label
     }

     editBlock() {
          let block = this.forms[this.indexSection]['blocks'][this.indexBlock]
          document.getElementById(this.modalBlockId).classList.toggle("hidden")
          document.getElementById(this.modalBlockInput).value = block.label
     }

     editField() {
          let field = this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
          this.selectorsFields.name.value = field.label || ""
          this.selectorsFields.info.value = field.info || ""
          this.selectorsFields.alternateName.value = field.alternateName || ""
          this.selectorsFields.columns.value = field.columns || ""
          this.selectorsFields.pattern.value = field.pattern || ""
          this.selectorsFields.type.value = field.type || ""
          this.selectorsFields.required.value = field.required || ""
          this.customFields(field.type)
          document.getElementById(this.modalFieldId).classList.toggle("hidden")
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

     moveItem({ array, arrow }) {
          if (arrow === "up") {
               let positionFilterUp = array.filter(el => el.position >= 1).length
               array.forEach(el => {
                    if (!el.position) {
                         el.position = positionFilterUp
                         positionFilterUp++
                    } else if (el.position === 1) {
                         el.position = array.filter(el => el.position >= 1).length
                    } else if (el.position > 1) {
                         el.position = el.position - 1
                    }
               })
               return array
          }

          if (arrow === "down") {
               const lengthPosition = array.filter(ele => ele.position >= 1).length
               let positionDownFilter = array.filter(ele => ele.position >= 1).length
               positionDownFilter = positionDownFilter + 1
               array.forEach(el => {
                    if (!el.position) {
                         el.position = positionDownFilter
                         positionDownFilter++
                    } else if (el.position === lengthPosition) {
                         el.position = 1
                    } else if (el.position >= 1) {
                         el.position = el.position + 1
                    }
               })
               return array
          }
     }

     move({ column, arrow }) {
          switch (column) {
               case "section":
                    this.forms = this.moveItem({ array: this.forms, arrow })
                    this.printSections();
                    break;
               case "block":
                    this.forms[this.indexSection]['blocks'] = this.moveItem({ array: this.forms[this.indexSection]['blocks'], arrow })
                    this.printBlocks();
                    break;
               case "field":
                    this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'] = this.moveItem({ array: this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'], arrow })
                    this.printFields()
                    break;
               default:
                    break;
          }
     }

     customFields(type) {
          switch (type) {
               case "select":
                    this.selectorsCustomFields.options.classList.remove("hidden")
                    break;
               default:
                    this.selectorsCustomFields.options.classList.add("hidden")
                    break;
          }
     }

     resetForms(data) {
          this.forms = data
          this.printSections()
     }

     resetFields(data) {
          this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'] = data
          this.printFields();
     }

     get options() {
          let children = this.selectorsCustomFields.optionsBody.children
          let array = []
          for (let i = 0; i < children.length; i++) {
               array.push({
                    title: children[i].children[0].children[0].value,
                    value: children[i].children[1].children[0].value
               })
          }
          return array
     }

     optionHTML() {
          return `
     <tr class="h-12 border-t border-gray-300">
       <td class="p-3">
         <input type="text" placeholder="Name" class="${this.inputClass}" />
    </td>
    <td class="p-3">
         <input type="text" placeholder="Value" class="${this.inputClass}" />
    </td>
  </tr>
`
     }

     addOption() {
          this.selectorsCustomFields.optionsBody.insertAdjacentHTML("beforeend", this.optionHTML())
     }

     constructForm() {
          let html = `
     <div class="flex flex-col relative">
       ${this.constructLines()}
       ${this.constructTop()}
    ${this.constructBody()}
  </div>
  ${this.constructModals()}
`
          document.getElementById(this.selector).innerHTML = `${html}`
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
                         this.saveField();
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
                         this.move({ column: "section", arrow: "up" })
                         break;
                    case "movedownsection":
                         this.indexSection = e.target.dataset.index
                         this.move({ column: "section", arrow: "down" })
                         break
                    case "moveupblock":
                         this.indexBlock = e.target.dataset.index
                         this.move({ column: "block", arrow: "up" })
                         break;
                    case "movedownblock":
                         this.indexBlock = e.target.dataset.index
                         this.move({ column: "block", arrow: "down" })
                         break;
                    case "moveupfield":
                         this.indexField = e.target.dataset.index
                         this.move({ column: "field", arrow: "up" })
                         break;
                    case "movedownfield":
                         this.indexField = e.target.dataset.index
                         this.move({ column: "field", arrow: "down" })
                         break;
                    case "modalForm":
                         this.sectionMethod = "add";
                         this.blockMethod = "add";
                         this.fieldMethod = "add";
                         this.modalForm(e);
                         break;
                    case "addOption":
                         console.log("Nice")
                         this.addOption();
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