/* eslint-disable */
import {
  saveAs
} from 'file-saver'
import XLSX from 'xlsx'
import {
  BoFilter
} from '../../BoFilter/src/main.js'

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      };

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

function formatJson(filterVal, jsonData) {
  return jsonData.map((v) =>
    filterVal.map((j) => {
      return v[j]
    })
  )
}

function parseHeader(columns, starCol = 0, startRow = 0, rowSize = 0) {
  // ref: element-ui table-header
  const getAllColumns = (columns) => {
    const result = [];
    columns.forEach((column) => {
      if (column.children) {
        result.push(column);
        result.push.apply(result, getAllColumns(column.children));
      } else {
        result.push(column);
      }
    });
    return result;
  };

  const convertToRows = (originColumns) => {
    let maxLevel = 1;
    const traverse = (column, parent) => {
      if (parent) {
        column.level = parent.level + 1;
        if (maxLevel < column.level) {
          maxLevel = column.level;
        }
      }
      if (column.children) {
        let colSpan = 0;
        column.children.forEach((subColumn) => {
          traverse(subColumn, column);
          colSpan += subColumn.colSpan;
        });
        column.colSpan = colSpan;
      } else {
        column.colSpan = 1;
      }
    };

    originColumns.forEach((column) => {
      column.level = 1;
      traverse(column);
    });

    const rows = [];
    for (let i = 0; i < maxLevel; i++) {
      rows.push([]);
    }

    const allColumns = getAllColumns(originColumns);

    allColumns.forEach((column) => {
      if (!column.children) {
        column.rowSpan = maxLevel - column.level + 1;
      } else {
        column.rowSpan = 1;
      }
      rows[column.level - 1].push(column);
    });

    return rows;
  };

  // 計算 excel header 欄位給 xlsx 使用
  const excelHeader = (columns, header = [], merges = []) => {
    columns.forEach(_ => {
      header.push(new Array(rowSize).fill(null))
    })

    columns.forEach((arr, yIndex) => {
      let xIndex = 0

      arr.forEach((column) => {
        // console.log(`rowSpan: ${column.rowSpan} colSpan: ${column.colSpan} label: ${column.label}`)
        // find first  null
        xIndex = header[yIndex].findIndex(x => x === null)
        // console.log('column', column, header)
        // 垂直
        for (let y = 1; y < column.rowSpan; y++) {
          header[yIndex + y][xIndex] = column.label
        }
        // 水平
        for (let x = 0; x < column.colSpan; x++) {
          header[yIndex][xIndex + x] = column.label
        }

        if ((column.rowSpan > 1) || (column.colSpan > 1)) {
          const sc = starCol + xIndex
          const sr = startRow + yIndex
          const numberToAlphabet = (n) => String.fromCharCode(n + 'A'.charCodeAt(0))
          // ref: https://stackoverflow.com/questions/53516403/sheetjs-xlsx-how-to-write-merged-cells
          merges.push(`${numberToAlphabet(sc)}${sr + 1}:${numberToAlphabet(sc + column.colSpan - 1)}${sr + column.rowSpan}`)
        }

        xIndex += column.colSpan
      })
    })
    // console.log('header', header)

    return {
      header,
      merges
    }
  }

  const row = convertToRows(columns)
  const result = excelHeader(row)
  // console.log('row', row)
  // console.log('result', result)
  return result
}


function parseColumns(columns) {
  const labelList = []
  const propList = []
  let isGroupingTableHead = false
  const iterate = (arr, prefix = '') => {
    arr.forEach(item => {
      if (item.children) {
        isGroupingTableHead = true
        iterate(item.children, '(' + item.label + ')')
      } else {
        labelList.push(prefix + item.label)
        propList.push(item.prop)
      }
    })
  }
  iterate(columns)
  return {
    labelList,
    propList,
    isGroupingTableHead
  }
}

export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}

export function export_json_to_excel({
  multiHeader = [],
  header,
  filterVal,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx',
  columns,
  describe
} = {}) {
  const {
    labelList,
    propList,
    isGroupingTableHead
  } = parseColumns(columns)
  let sheetData = []

  header = header || labelList
  filterVal = filterVal || propList
  // map array.object to array.array
  data = formatJson(filterVal, data)

  const firstDataRow = (data && data.length) ? data[0] : []
  // ######### block1 describe: 额外添加描述 ######### 
  if (describe) {
    const formatDesc = describe.map(item => {
      let res = []
      firstDataRow.forEach(_ => {
        res.push('')
      })
      res[0] = item
      return res
    })
    // 空两行
    const nullArray = firstDataRow.map(_ => '')
    formatDesc.push(nullArray)
    formatDesc.push(nullArray)

    // 添加到 sheetData 里
    sheetData = formatDesc.concat(sheetData)

    // 增加merge合并 改成 10 col 寬
    merges = describe.map((_, index) => {
      return 'A' + (index + 1) + ':' + 'J' + (index + 1)
    }).concat(merges)
  }

  // ######### block2 multiHeader ######### 
  for (let i = 0; i < multiHeader.length; i++) {
    sheetData.push(multiHeader[i])
  }

  // auto width 以 block3 的第一行為基準
  const autoWidthBenchmark = sheetData.length

  if (columns) {
    // ######### block3 header ######### 
    if (isGroupingTableHead) {
      // 多級表頭
      const starCol = 0
      const startRow = sheetData.length
      // headerData: { header, merges}
      const headerData = parseHeader(columns, starCol, startRow, firstDataRow.length)
      sheetData = sheetData.concat(headerData.header);
      merges = merges.concat(headerData.merges)
    } else {
      // 一般表頭
      sheetData.push(header)
    }

    // ######### block4 body ######### 
    // 根据columns里的filter和render过滤data
    let filterObj = {}
    let renderObj = {}
    columns.forEach(col => {
      col.filter && (filterObj[col.prop] = col.filter)
      col.render && (renderObj[col.prop] = col.render)
    })

    const bodyData = data.map(item => {
      Object.keys(item).forEach(it => {
        if (filterObj[it]) {
          item[it] = BoFilter(item[it], filterObj[it])
        }
        if (renderObj[it]) {
          item[it] = renderObj[it](item)
        }
      })
      return item
    })

    sheetData = sheetData.concat(bodyData)
  }

  /* original data */
  filename = filename || 'excel-list'
  // data.unshift(header);

  var ws_name = "SheetJS";
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(sheetData);

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = sheetData.map(row => row.map(val => {
      /*先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        };
      }
      /*再判断是否为中文*/
      else if (val.toString().charCodeAt(0) > 255) {
        return {
          'wch': val.toString().length * 2
        };
      } else {
        return {
          'wch': val.toString().length
        };
      }
    }))
    // auto width 以 block3 的第一行為基準
    let result = colWidth[autoWidthBenchmark];
    for (let i = autoWidthBenchmark; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`);
}