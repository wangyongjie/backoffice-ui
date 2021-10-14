import {
  flatColumns
} from '../../packages/utils/table'

describe('table', () => {
  it('flatColumns ', () => {
    const columns = [{
        label: "Delivery Info",
        children: [{
            label: "Delivery Info",
            children: [{
                prop: "name",
                label: "Name",
                minWidth: 140,
                align: "center",
              },
              {
                prop: "currency",
                label: "Currency",
                minWidth: 140,
                filter: "number",
              },
            ],
          },
          {
            prop: "mobile",
            label: "Mobile",
            minWidth: 180,
            align: "center"
          },
        ],
      },
      {
        prop: "sex",
        label: "Sex",
        minWidth: 80,
        align: "center",
      },
    ]
    const result = [{
      "align": "center",
      "label": "Name",
      "minWidth": 140,
      "prop": "name"
    }, {
      "filter": "number",
      "label": "Currency",
      "minWidth": 140,
      "prop": "currency"
    }, {
      "align": "center",
      "label": "Mobile",
      "minWidth": 180,
      "prop": "mobile"
    }, {
      "align": "center",
      "label": "Sex",
      "minWidth": 80,
      "prop": "sex",
    }]

    expect(flatColumns(columns)).toEqual(result)
  });
});