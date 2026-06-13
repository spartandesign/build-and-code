// helpers.js — shared design system for Build & Code handouts (matches Ch01 spec)
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType, LevelFormat, convertInchesToTwip,
} = require("docx");

const C = {
  navy: "1F3864", blue: "2E75B6", blueInk: "1F4D78", orange: "C55A11",
  softBlue: "F2F7FC", green: "E2EFDA", greenInk: "3F6B2A", amber: "FBEFD6",
  amberInk: "8A5400", ink: "1A1A1A", gray: "5B6470", hairline: "BFC7D2",
  bandEyebrow: "9DC3E6", bandSub: "DEEAF6",
};

const PAGE_W = 9360; // 6.5" content width in dxa

// --- text runs ---------------------------------------------------------
// spec: {t:"text", b:true, i:true, color:"..", sz:21}
const run = (s) => {
  if (typeof s === "string") s = { t: s };
  return new TextRun({
    text: s.t, bold: !!s.b, italics: !!s.i,
    color: s.color, size: s.sz, // size in half-points; default 21 set in doc styles
  });
};
const runs = (arr) => (Array.isArray(arr) ? arr : [arr]).map(run);

// --- paragraph builders -------------------------------------------------
const body = (content, opts = {}) =>
  new Paragraph({
    children: runs(content),
    spacing: { after: opts.after ?? 90, before: opts.before ?? 0, line: 264 },
    ...(opts.numbering ? { numbering: opts.numbering } : {}),
  });

const sectionHeading = (text) =>
  new Paragraph({
    children: [run({ t: text, b: true, color: C.blue, sz: 24 })],
    spacing: { before: 200, after: 70 },
    border: { bottom: { style: BorderStyle.SINGLE, color: C.blue, size: 6, space: 2 } },
  });

// numbered / bulleted list items; ref = numbering reference name
const listItem = (content, ref, opts = {}) =>
  new Paragraph({
    children: runs(content),
    numbering: { reference: ref, level: 0 },
    spacing: { after: opts.after ?? 40, before: opts.before ?? 0, line: 264 },
  });

// --- callout box: single-cell table, tinted fill, thick left rule -------
const calloutBox = (paragraphs, fill, borderColor) =>
  new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
      left: { style: BorderStyle.SINGLE, color: borderColor, size: 18 },
    },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: PAGE_W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill },
        margins: { top: 100, left: 170, bottom: 100, right: 150 },
        children: paragraphs,
      })],
    })],
  });

const infoBox  = (ps) => calloutBox(ps, C.softBlue, C.navy);     // teacher pacing / info
const safeBox  = (ps) => calloutBox(ps, C.amber, C.amberInk);    // safety / caution
const greenBox = (ps) => calloutBox(ps, C.green, C.greenInk);    // answers / positive
const blueBox  = (ps) => calloutBox(ps, C.softBlue, C.blue);     // student info callout

const answerBox = (text) =>
  greenBox([new Paragraph({
    children: [run({ t: "Answer:  ", b: true, color: C.greenInk }), ...runs(text)],
    spacing: { line: 264 },
  })]);

// --- data table: navy header row, hairline rows --------------------------
// header: array of strings; rows: array of arrays (string or run-spec arrays)
const dataTable = (header, rows, colWidths) => {
  const widths = colWidths || header.map(() => Math.floor(PAGE_W / header.length));
  const cellBorders = {
    top: { style: BorderStyle.SINGLE, color: C.hairline, size: 4 },
    bottom: { style: BorderStyle.SINGLE, color: C.hairline, size: 4 },
    left: { style: BorderStyle.SINGLE, color: C.hairline, size: 4 },
    right: { style: BorderStyle.SINGLE, color: C.hairline, size: 4 },
  };
  const headRow = new TableRow({
    tableHeader: true,
    children: header.map((h, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: C.navy },
      margins: { top: 60, left: 90, bottom: 60, right: 90 },
      borders: cellBorders,
      children: [new Paragraph({ children: [run({ t: h, b: true, color: "FFFFFF", sz: 19 })] })],
    })),
  });
  const bodyRows = rows.map((r, ri) => new TableRow({
    children: r.map((cell, i) => {
      const isBlank = cell === "" || (Array.isArray(cell) && cell.length === 0);
      return new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: C.softBlue } : undefined,
        margins: { top: 55, left: 90, bottom: 55, right: 90 },
        borders: cellBorders,
        children: [new Paragraph({
          children: runs(isBlank ? " " : cell),
          spacing: isBlank ? { before: 170, after: 170, line: 250 } : { line: 250 },
        })],
      });
    }),
  }));
  return new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    rows: [headRow, ...bodyRows],
  });
};

// --- header band: navy full-width table ---------------------------------
const headerBand = (eyebrow, title, subtitle) =>
  new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
    },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: PAGE_W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: C.navy },
        margins: { top: 150, left: 200, bottom: 150, right: 200 },
        children: [
          new Paragraph({ children: [run({ t: eyebrow, b: true, color: C.bandEyebrow, sz: 15 })], spacing: { after: 40 } }),
          new Paragraph({ children: [run({ t: title, b: true, color: "FFFFFF", sz: 36 })], spacing: { after: 30 } }),
          new Paragraph({ children: [run({ t: subtitle, i: true, color: C.bandSub, sz: 19 })] }),
        ],
      })],
    })],
  });

const nameLine = () =>
  new Paragraph({
    children: [
      run({ t: "Name: ", b: true }), run("______________________________     "),
      run({ t: "Date: ", b: true }), run("____________     "),
      run({ t: "Period: ", b: true }), run("________"),
    ],
    spacing: { before: 160, after: 60 },
  });

const footerBlock = (editionLabel) => [
  new Paragraph({
    children: [run(" ")],
    spacing: { before: 30, after: 30 },
    border: { bottom: { style: BorderStyle.SINGLE, color: C.hairline, size: 4, space: 6 } },
  }),
  new Paragraph({
    children: [run({ t: `Automation & Robotics · VEX EXP · C++ in VS Code — ${editionLabel}`, color: C.gray, sz: 15 })],
    spacing: { before: 200 },
    border: { top: { style: BorderStyle.SINGLE, color: C.orange, size: 4, space: 4 } },
  }),
];

// --- document shell ------------------------------------------------------
const makeDoc = (children, numberingRefs) =>
  new Document({
    styles: {
      default: {
        document: { run: { font: "Arial", size: 21, color: C.ink } },
      },
    },
    numbering: { config: numberingRefs },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 },
        },
      },
      children,
    }],
  });

// standard numbering configs: one bullet ref + ordered refs as needed
const bulletConfig = (ref) => ({
  reference: ref,
  levels: [{
    level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 460, hanging: 230 } } },
  }],
});
const decimalConfig = (ref) => ({
  reference: ref,
  levels: [{
    level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 460, hanging: 280 } } },
  }],
});

module.exports = {
  C, PAGE_W, run, runs, body, sectionHeading, listItem,
  infoBox, safeBox, greenBox, blueBox, answerBox, dataTable,
  headerBand, nameLine, footerBlock, makeDoc, bulletConfig, decimalConfig,
  Packer, Paragraph,
};
