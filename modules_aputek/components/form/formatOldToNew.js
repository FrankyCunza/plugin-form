export const formatOldFormToNewFormat = (data)=> {
    console.log(data, "data")
    const format = data.reduce((acc, cur) => {
        acc['constructor'] = { ...acc['constructor'] }
        const { alternateName, columns, hidden, info, label, name, options, pattern, position, required, type, value } = cur
        acc['constructor'][cur.name] = {
            alternateName, columns, hidden, info, label, name, options, pattern, position, required, type, value
        }

        acc['languages']['en'][cur.name] = {
            label
        }
        acc['languages']['es'][cur.name] = {
            label
        }
        return acc
    }, {
        constructor: {},
        languages: {
            en: {},
            es: {}
        }
    })
    return {
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
                        "fields": { ...format }
                    }
                ]
            }
        ]
    }
}