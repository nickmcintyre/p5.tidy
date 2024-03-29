// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, TableRow } from 'p5';
import {
  addItems,
  addRows,
  arrange,
  complete,
  count,
  debug,
  distinct,
  desc,
  expand,
  fill,
  filter,
  fullJoin,
  groupBy,
  innerJoin,
  leftJoin,
  map,
  mutate,
  mutateWithSummary,
  pick,
  rename,
  replaceNully,
  select,
  slice,
  sliceHead,
  sliceTail,
  sliceMin,
  sliceMax,
  sliceSample,
  summarize,
  summarizeAll,
  summarizeAt,
  summarizeIf,
  sort,
  tally,
  total,
  totalAll,
  totalAt,
  totalIf,
  transmute,
  when,
  tidy,
} from '@tidyjs/tidy';

declare const p5: any;

p5.prototype.toTidy = function _toTidy(table: Table): object[] {
  // @ts-ignore
  const array: object[] = table.rows.map((row: TableRow) => row.obj);
  return array;
};

p5.prototype.toTable = function _toTable(array: object[]): Table {
  const table: Table = new Table();
  table.columns = Object.keys(array[0]);
  array.forEach((row: object) => {
    const newRow: TableRow = table.addRow();
    table.columns.forEach((col: string) => {
      newRow.set(col, row[col]);
    });
  });
  return table;
};

p5.prototype.tidy = function _tidy(data: object[] | Table, ...args: any[]): object[] | Table {
  let results: object[] | Table;
  if (data instanceof Table) {
    const array: object[] = this.toTidy(data);
    // @ts-ignore
    results = tidy(array, ...args);
    results = this.toTable(results);
  }
  if (data instanceof Array && typeof data[0] === 'object') {
    // @ts-ignore
    results = tidy(data, ...args);
  }
  return results;
};

p5.prototype.addItems = addItems;

p5.prototype.addRows = addRows;

p5.prototype.arrange = arrange;

p5.prototype.complete = complete;

p5.prototype.count = count;

p5.prototype.debug = debug;

p5.prototype.distinct = distinct;

p5.prototype.desc = desc;

p5.prototype.expand = expand;

// eslint-disable-next-line no-underscore-dangle
p5.prototype._pfill = p5.prototype.fill;
p5.prototype.fill = function _fill(...args: any[]) {
  if (args[0] instanceof Array) {
    // @ts-ignore
    return fill(...args);
  }
  // eslint-disable-next-line no-underscore-dangle
  return this._pfill(...args);
};

// eslint-disable-next-line no-underscore-dangle
p5.prototype._pfilter = p5.prototype.filter;
p5.prototype.filter = function _filter(...args: any[]) {
  if (args[0] instanceof Function) {
    // @ts-ignore
    return filter(...args);
  }
  // eslint-disable-next-line no-underscore-dangle
  return this._pfilter(...args);
};

p5.prototype.fullJoin = function _fullJoin(...args: any[]) {
  if (args[0] instanceof Table) {
    const other: any[] = args.slice(1);
    const data: object[] = this.toTidy(args[0]);
    return fullJoin(data, ...other);
  }
  // @ts-ignore
  return fullJoin(...args);
};

p5.prototype.groupBy = groupBy;

p5.prototype.innerJoin = function _innerJoin(...args: any[]) {
  if (args[0] instanceof Table) {
    const other: any[] = args.slice(1);
    const data: object[] = this.toTidy(args[0]);
    return innerJoin(data, ...other);
  }
  // @ts-ignore
  return innerJoin(...args);
};

p5.prototype.leftJoin = function _leftJoin(...args: any[]) {
  if (args[0] instanceof Table) {
    const other: any[] = args.slice(1);
    const data: object[] = this.toTidy(args[0]);
    return leftJoin(data, ...other);
  }
  // @ts-ignore
  return leftJoin(...args);
};

// eslint-disable-next-line no-underscore-dangle
p5.prototype._pmap = p5.prototype.map;
p5.prototype.map = function _map(...args: any[]) {
  if (args[0] instanceof Function) {
    // @ts-ignore
    return map(...args);
  }
  // eslint-disable-next-line no-underscore-dangle
  return this._pmap(...args);
};

p5.prototype.mutate = mutate;

p5.prototype.mutateWithSummary = mutateWithSummary;

p5.prototype.pick = pick;

p5.prototype.rename = rename;

p5.prototype.replaceNully = replaceNully;

// eslint-disable-next-line no-underscore-dangle
p5.prototype._pselect = p5.prototype.select;
// eslint-disable-next-line consistent-return
p5.prototype.select = function _select(...args: any[]) {
  if (typeof args[0] === 'string') {
    // eslint-disable-next-line no-underscore-dangle
    return this._pselect(...args);
  }
  // @ts-ignore
  return select(...args);
};

p5.prototype.slice = slice;

p5.prototype.sliceHead = sliceHead;

p5.prototype.sliceTail = sliceTail;

p5.prototype.sliceMin = sliceMin;

p5.prototype.sliceMax = sliceMax;

p5.prototype.sliceSample = sliceSample;

p5.prototype.summarize = summarize;

p5.prototype.summarizeAll = summarizeAll;

p5.prototype.summarizeAt = summarizeAt;

p5.prototype.summarizeIf = summarizeIf;

p5.prototype.sort = sort;

p5.prototype.tally = tally;

p5.prototype.total = total;

p5.prototype.totalAll = totalAll;

p5.prototype.totalAt = totalAt;

p5.prototype.totalIf = totalIf;

p5.prototype.transmute = transmute;

p5.prototype.when = when;
