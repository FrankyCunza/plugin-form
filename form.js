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
     },
     {
          title: "H1",
          name: "H1"
     },
     {
          title: "H2",
          name: "H2"
     },
     {
          title: "H3",
          name: "H3"
     },
     {
          title: "H4",
          name: "H4"
     },
     {
          title: "H5",
          name: "H5"
     },
     {
          title: "H6",
          name: "H6"
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
                                   },
                                   {
                                        label: "Titulo 1",
                                        name: "last_name",
                                        type: "h1",
                                        position: 2
                                   },
                                   {
                                        label: "Titulo 2",
                                        name: "last_name",
                                        type: "h2",
                                        position: 2
                                   },
                                   {
                                        label: "Titulo 3",
                                        name: "last_name",
                                        type: "h3",
                                        position: 2
                                   },
                                   {
                                        label: "Titulo 4",
                                        name: "Titulo 4",
                                        type: "h4",
                                        position: 2
                                   },
                                   {
                                        label: "Titulo 5",
                                        name: "Titulo 5",
                                        type: "h5",
                                        position: 2
                                   }, {
                                        label: "Titulo 6",
                                        name: "h6",
                                        type: "h6",
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
                                   },
                                   {
                                        label: "Last Name",
                                        name: "last_name",
                                        type: "field_select",
                                        position: 3,
                                        options: [
                                             {
                                                  title: "Peru",
                                                  value: "peru"
                                             }
                                        ]
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
                                   },
                                   {
                                        label: "Select",
                                        name: "select",
                                        position: 2,
                                        type: "select",
                                        options: [
                                             {
                                                  title: "Peru",
                                                  value: "peru"
                                             },
                                             {
                                                  title: "Argentina",
                                                  value: "argentina"
                                             }
                                        ]
                                   }
                              ]
                         }
                    ],
                    label: "Test Two",
                    name: "test_two",
                    position: null
               }
          ]
          this.titles = {
               h1: {
                    class: "font-bold text-xl"
               },
               h2: {
                    class: "font-bold text-2xl"
               },
               h3: {
                    class: "font-bold text-3xl"
               },
               h4: {
                    class: "font-bold text-5xl"
               },
               h5: {
                    class: "font-bold text-5xl"
               },
               h6: {
                    class: "font-bold text-6xl"
               }
          }
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
               required: "fieldRequired",
               value: "fieldValue"
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
               value: document.getElementById(this.idFields.value),
               columns: document.getElementById(this.idFields.columns),
               pattern: document.getElementById(this.idFields.pattern),
               type: document.getElementById(this.idFields.type),
               required: document.getElementById(this.idFields.required)
          }
          this.selectorsCustomFields = {
               options: document.getElementById(this.idCustomFields.options), // FATHER OPTIONS
               optionsBody: document.getElementById(this.idCustomFields.optionsBody) // CHILD OPTIONS
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
               <label class="text-gray-800 font-medium">Value</label>
               <input type="text" id="${this.idFields.value}" 
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
                    case "checkbox":
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
                    case "checkbox":
                         htmlField = `<input ${el.type == "image" ? `src="${el.value}"` : ""} type="${el.type.includes("field_") ? el.type.split("field_")[1] : el.type}" class="${this.inputClass}" placeholder="${el.placeholder || ""}" />`
                         break;
                    case "image":
                         htmlField = `<input src="${el.value}" type="image" class="w-full" placeholder="${el.placeholder || ""}" />`
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
                         htmlField += `<${el.type} class="${this.titles[el.type].class}">${el.label || el.title}</${el.type}>`
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
          let name = this.selectorsFields.name.value
          if (this.selectorsFields.alternateName.value === '') {
               name = this.selectorsFields.name.value.toLowerCase().replace(/\s{1,}/g, '_').replace(/[^\w\s]/gi, '');
          }
          else {
               name = this.selectorsFields.alternateName.value
          }
          const info = this.selectorsFields.info.value
          const alternateName = this.selectorsFields.alternateName.value
          const columns = this.selectorsFields.columns.value
          const pattern = String.raw`${this.selectorsFields.pattern.value}`
          const type = this.selectorsFields.type.value
          const required = Boolean(this.selectorsFields.required.value)
          const value = this.selectorsFields.value.value
          const options = this.options
          if (label) {
               if (this.fieldMethod === "add") {
                    this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].push({
                         label,
                         name,
                         info,
                         alternateName: this.selectorsFields.name.value.toLowerCase().replace(/\s{1,}/g, '_').replace(/[^\w\s]/gi, ''),
                         value,
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
                    item.value = value
                    item.columns = columns
                    item.pattern = pattern
                    item.type = type
                    item.required = required
                    item.options = options
                    console.log(item)
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
          this.selectorsFields.value.value = field.value || ""
          this.selectorsFields.columns.value = field.columns || ""
          this.selectorsFields.pattern.value = field.pattern || ""
          this.selectorsFields.type.value = field.type || ""
          this.selectorsFields.required.value = field.required || ""
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
               case "field_select":
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

     resetSections() {

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

     optionHTML(option) {
          return `
     <tr class="h-12 border-t border-gray-300">
       <td class="p-3">
         <input type="text" value="${option?.title || ""}" placeholder="Name" class="${this.inputClass}" />
    </td>
    <td class="p-3">
         <input type="text" value="${option?.value || ""}" placeholder="Value" class="${this.inputClass}" />
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
          /* document.body.insertAdjacentHTML("beforeend", this.constructScript()) */
          /*  document.getElementById(this.selector).insertAdjacentHTML("beforeend", this.constructScript()) */
     }
}

function Forms({ form_builder, selector, key_parent, columns }) {
     const info = (info) => {
          return `
            <div class="ml-2">
                <div class="w-5 h-5 bg-gray-100 text-gray-700 flex items-center justify-center rounded-full text-xs tooltip relative cursor-pointer">
                    <i class="fas fa-info"></i>
                    <p class="text-xs mb-1 absolute p-2 rounded-md -top-10 hidden whitespace-nowrap bg-gray-700 text-white border border-gray-300">${info}</p>
                </div>
            </div>`
     }

     const label = (label, info) => {
          return `<div class="flex items-center mb-0.5">${label} ${info}</div>`
     }

     const classInput = "bg-white placeholder-gray-500 w-full border border-gray-300 hover:border-blue-600 py-2.5 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"

     let html = ''
     html += `
        <style>
            .tooltip:hover p {
                display: flex;
            }
        </style>
    `
     const printForms = () => {
          html += `<div class="grid grid-cols-1 md:grid-cols-${columns} gap-3 items-end">`
          let checked = '<span class="hidden absolute bottom-4 text-green-500 right-2 pointer-events-none"><i class="fas fa-check"></i></span>'
          let warning = '<span class="hidden absolute bottom-4 text-red-500 right-2 pointer-events-none"><i class="fas fa-exclamation-triangle"></i></span>'
          form_builder.forEach((el, i) => {
               let htmlDataAttributes = ""
               if (el.hasOwnProperty("data_attributes")) {
                    Object.entries(el?.data_attributes).forEach(([key, value]) => {
                         htmlDataAttributes += `data-${key}=${value}`
                    })
               }
               switch (el.type) {
                    case "field_text":
                    case "field_date":
                    case "field_hour":
                    case "field_address":
                    case "field_email":
                    case "field_password":
                    case "field_file":
                    case "field_number":
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
                         html += `
                              <div class="relative grid col-span-${el.columns ? el.columns : '3'}">
                                   ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required == "true" ? '*' : ''}</label>`, el.info ? info(el.info) : '')}                            
                                   ${warning}
                                   <input value="${el.value || ""}" ${el.type == "image" ? `src='${el.value}'` : ""} type="${el.type.includes("field_") ? el.type.split("field_")[1] : el.type}" ${el.type == "file" ? 'multiple' : ''} data-fullkey="${key_parent || ""}${el.name}" name="${el.name}" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}" pattern="${el.pattern}" data-required="${el.required}" data-placeholder="${el.placeholder || el.label}" autocomplete="${el.name}" 
                                   class="${classInput}">
                                   ${checked}
                              </div>
                         `
                         break;
                    case "color":
                         html += `
                      <div class="relative grid col-span-${el.columns ? el.columns : '3'}">
                        ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required == "true" ? '*' : ''}</label>`, el.info ? info(el.info) : '')}     
                        ${warning}
                        <input value="${el.value}" type="color" name="${el.name}" class="w-full h-8">
                        ${checked}
                      </div>
                      `
                         break;
                    case "image":
                         html += `
                              <div class="relative grid col-span-${el.columns ? el.columns : '3'}">
                                   ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required == "true" ? '*' : ''}</label>`, el.info ? info(el.info) : '')}     
                                   <input src="${el.value}" type="image" name="${el.name}" class="w-full">
                              </div>
                         `
                         break;
                    case 'field_select':
                    case 'select':
                         html += `
                              <div class="relative grid col-span-${el.columns ? el.columns : '3'}">
                              ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required == "true" ? '*' : ''}</label>`, el.info ? info(el.info) : '')} 
                              ${warning}
                              <select type="${types[el.type]}" value="${el.value || ""}" data-fullkey="${key_parent || ""}${el.name}" name="${el.name}" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}"  data-required="${el.required}" data-placeholder="${el.placeholder || el.label}" autocomplete="${el.name}" 
                              class="${classInput}">
                         `
                         html += `<option hidden value="">Select</option>`
                         el?.options && el?.options?.forEach((el, i) => {
                              let htmlDataAttributesByOptions = ""
                              if (el.hasOwnProperty("data_attributes")) {
                                   Object.entries(el?.data_attributes).forEach(([key, value]) => {
                                        htmlDataAttributesByOptions += `data-${key}=${value} `
                                   })
                              }
                              html += `
                            <option value="${el.value}" ${htmlDataAttributesByOptions}>${el.title}</option>
                        `
                         })
                         html += `
                        </select>
                        ${checked}
                    </div>
                    `
                         break
                    case 'field_radio':
                    case 'radio':
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'}">
                              ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required == "true" ? '*' : ''}</label>`, el.info ? info(el.info) : '')} 
                              <div class="flex">
                                   <div>
                                        <label class="flex border border-gray-200 px-3 py-2 rounded-xl w-max items-center">
                                             <input type="radio" name="${el.name}" data-value="true" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}" />
                                             <span class="ml-2">Yes</span>
                                        </label>
                                   </div>
                                   <div class="ml-2">
                                        <label class="flex border border-gray-200 px-3 py-2 rounded-xl w-max items-center">
                                             <input type="radio" name="${el.name}" data-value="false" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}" />
                                             <span class="ml-2">No</span>
                                        </label>
                                   </div>
                              </div>
                         </div>
                         `
                         break
                    case 'field_checkboxes':
                    case 'field_checkbox':
                    case "checkbox":
                         let htmlChekboxes = ""
                         el?.options?.length > 0 ? el?.options.forEach((check, i) => {
                              htmlChekboxes += `
                                   <label class="bg-gray-50 hover:bg-gray-100 p-4 border border-gray-300 rounded-xl relative cursor-pointer">
                                        <span class="text-left">${check.title}</span>
                                        <input type="checkbox" class="cursor-pointer" data-multiple="true" data-keyparent="${el.name}" data-fullkey="${key_parent || "" + check.title}" name="${check.title}" ${htmlDataAttributes} data-alternatename="${check.alternate_name || ""}" />
                                   </label>
                              `
                         }) :
                              htmlChekboxes += `
                              <div class="relative w-full grid col-span-${el.columns ? el.columns : '3'}">
                                   <label class="flex w-full items-center py-4 border rounded-xl px-4 cursor-pointer">
                                        ${warning}
                                        <input type="checkbox" data-multiple="false" class="cursor-pointer" data-fullkey="${key_parent + el.name}" name="${el.name}" data-required="${el.required && 'true'}" />
                                        ${checked}
                                        <p class="ml-2">${el.label} ${el.required == "true" ? '*' : ''}</p>
                                   </label>
                              </div>
                              `
                         html += `
                              <div class="relative grid col-span-${el.columns ? el.columns : '3'}">
                                   <label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required == "true" ? '*' : ''}</label>
                                   <div class="grid ${el?.options?.length > 0 ? "grid-cols-4 gap-3" : ""} w-full">
                                        ${htmlChekboxes}
                                   </div>
                              </div>
                         `
                         break
                    case 'field_textarea':
                    case 'textarea':
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hide ? 'hidden' : ''}" name="blockform${el.name}">
                              ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required == "true" ? '*' : ''}</label>`, el.info ? info(el.info) : '')} 
                              ${warning}
                              <textarea data-fullkey="${key_parent || "" + el.name}" spellcheck="false" autocomplete="off" name="${el.name}" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}" pattern="${el.pattern}" data-required="${el.required}" data-placeholder="${el.placeholder || el.label}" autocomplete="${el.name}" 
                              class="${classInput}"></textarea>
                              ${checked}
                         </div>
                         `
                         break
                    case 'h1':
                         html += `
                     <div class="relative grid col-span-${el.columns ? el.columns : '3'}" name="${el.name}">
                         <h1 class="text-2xl font-bold">${el.label}</h1>
                     </div>
                     `
                         break
                    case 'h2':
                         html += `
                     <div class="relative grid col-span-${el.columns ? el.columns : '3'}" name="${el.name}">
                         <h2 class="text-xl font-bold">${el.label}</h2>
                     </div>
                     `
                         break
                    case 'h3':
                         html += `
                     <div class="relative grid col-span-${el.columns ? el.columns : '3'}" name="${el.name}">
                         <h3 class="text-md font-bold">${el.label}</h3>
                     </div>
                     `
                         break
                    case 'p':
                         html += `
                     <div class="relative grid col-span-${el.columns ? el.columns : '3'}" name="${el.name}">
                         <p>${el.label}</p>
                     </div>
                     `
                         break
                    default:
                         break
               }
          })
          html += `</div>`
     }
     printForms()
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
     Object.entries(values).forEach(([key, value]) => {
          if (builder.length > 0 && types[key]) {
               switch (types[key].type) {
                    case "field_text":
                    case "field_date":
                    case "field_hour":
                    case "field_address":
                    case "field_email":
                    case "field_password":
                    case "field_file":
                    case "field_number":
                    case "color":
                    case "date":
                    case "datetime-local":
                    case "email":
                    case "file":
                    case "hidden":
                    case "image":
                    case "month":
                    case "number":
                    case "password":
                    case "radio":
                    case "range":
                    case "reset":
                    case "search":
                    case "tel":
                    case "text":
                    case "time":
                    case "url":
                    case "textarea":
                         html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <p>${value ? value : 'Empty.'}</p>
                              </div>
                         `
                         break;
                    case "checkbox":
                    case "field_checkbox":
                    case "field_checkboxes":
                         let htmlValues = ""
                         if (typeof value == "boolean") {
                              htmlValues = value
                         } else {
                              Object.entries(value).forEach(([key, value]) => {
                                   htmlValues += `
                          	<div class="flex">
                            	<h2 class="font-semibold">${key}:</h2>
                              <p>${value}</p>
                            </div>
                          `
                              })
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
     return html
}

async function validateForm({ selector, form_builder, name }) {
     let forms = document.getElementById(selector).elements
     let fd = new FormData()
     let filenames = []
     let form = {}

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
               switch (forms[i].type) {
                    case "field_text":
                    case "field_date":
                    case "field_hour":
                    case "field_address":
                    case "field_email":
                    case "field_password":
                    case "field_file":
                    case "field_number":
                    case "date":
                    case "datetime-local":
                    case "email":
                    case "color":
                    case "file":
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
                         form[forms[i].getAttribute(name || "name")] = forms[i].value
                         fd.append(forms[i].getAttribute(name || "name"), forms[i].value)
                         if (forms[i].dataset.required == 'true' && forms[i].getAttribute("pattern")) {
                              let patt = form_builder.find(el => el.name == forms[i].getAttribute("name")).pattern
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
                         const radioButtons = document.querySelectorAll(`input[name="${forms[i].name}"]`);
                         let selected;
                         for (const radioButton of radioButtons) {
                              if (radioButton.checked) {
                                   selected = radioButton.getAttribute("data-value");
                                   break;
                              }
                         }
                         form[forms[i].getAttribute("name")] = selected == "true" ? true : false  
                         fd.append(forms[i].getAttribute("name"), selected == "true" ? true : false)
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
     return await promise
}