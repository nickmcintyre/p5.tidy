/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Joins', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('fullJoin()', function () {
    it('Should work with objects', function () {
      const data = [{ a: 1, b: 2 }, { a: 2, b: 5 }];
      const joinData = [{ a: 1, c: 3 }, { a: 4, c: 4 }];
      const results = pInst.tidy(data,
        pInst.fullJoin(
          joinData,
          { by: 'a' },
        )
      )
      expect(results).to.eql(
        [
          { a: 1, b: 2, c: 3 },
          { a: 2, b: 5, c: undefined },
          { a: 4, b: undefined, c: 4 },
        ]
      );
    });

    it('Should work with p5.Tables', function () {
      const data = pInst.toTable([{ a: 1, b: 2 }, { a: 2, b: 5 }]);
      const joinData = pInst.toTable([{ a: 1, c: 3 }, { a: 4, c: 4 }]);
      let results = pInst.tidy(data,
        pInst.fullJoin(
          joinData,
          { by: 'a' },
        )
      );
      results = pInst.toTidy(results);
      expect(results).to.eql(
        [
          { a: 1, b: 2, c: 3 },
          { a: 2, b: 5, c: undefined },
          { a: 4, b: undefined, c: 4 },
        ]
      );
    });

    it('Should work with p5.Tables + objects', function () {
      const data = pInst.toTable([{ a: 1, b: 2 }, { a: 2, b: 5 }]);
      const joinData = [{ a: 1, c: 3 }, { a: 4, c: 4 }];
      let results = pInst.tidy(data,
        pInst.fullJoin(
          joinData,
          { by: 'a' },
        )
      );
      results = pInst.toTidy(results);
      expect(results).to.eql(
        [
          { a: 1, b: 2, c: 3 },
          { a: 2, b: 5, c: undefined },
          { a: 4, b: undefined, c: 4 },
        ]
      );
    });

    it('Should work with objects + p5.Tables', function () {
      const data = [{ a: 1, b: 2 }, { a: 2, b: 5 }];
      const joinData = pInst.toTable([{ a: 1, c: 3 }, { a: 4, c: 4 }]);
      const results = pInst.tidy(data,
        pInst.fullJoin(
          joinData,
          { by: 'a' },
        )
      );
      expect(results).to.eql(
        [
          { a: 1, b: 2, c: 3 },
          { a: 2, b: 5, c: undefined },
          { a: 4, b: undefined, c: 4 },
        ]
      );
    });
  });

  describe('innerJoin()', function () {
    it('Should work with objects', function () {
      const data = [
        { a: 1, J: 'j', b: 10, c: 100 },
        { a: 1, J: 'k', b: 60, c: 600 },
        { a: 1, J: 'J', b: 30, c: 300 },
        { a: 2, J: 'j', b: 20, c: 200 },
        { a: 3, J: 'x', b: 50, c: 500 },
      ];
      const joinData = [
        { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
        { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
        { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
      ];
      const results = pInst.tidy(
        data,
        pInst.innerJoin(joinData, { by: ['a', 'J'] }),
      );
      expect(results).to.eql(
        [
          { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
          { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
          { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
        ]
      );
    });

    it('Should work with p5.Tables', function () {
      const data = pInst.toTable([
        { a: 1, J: 'j', b: 10, c: 100 },
        { a: 1, J: 'k', b: 60, c: 600 },
        { a: 1, J: 'J', b: 30, c: 300 },
        { a: 2, J: 'j', b: 20, c: 200 },
        { a: 3, J: 'x', b: 50, c: 500 },
      ]);
      const joinData = pInst.toTable([
        { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
        { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
        { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
      ]);
      let results = pInst.tidy(
        data,
        pInst.innerJoin(joinData, { by: ['a', 'J'] }),
      );
      results = pInst.toTidy(results);
      expect(results).to.eql(
        [
          { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
          { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
          { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
        ]
      );
    });

    it('Should work with p5.Tables + objects', function () {
      const data = pInst.toTable([
        { a: 1, J: 'j', b: 10, c: 100 },
        { a: 1, J: 'k', b: 60, c: 600 },
        { a: 1, J: 'J', b: 30, c: 300 },
        { a: 2, J: 'j', b: 20, c: 200 },
        { a: 3, J: 'x', b: 50, c: 500 },
      ]);
      const joinData = [
        { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
        { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
        { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
      ];
      let results = pInst.tidy(
        data,
        pInst.innerJoin(joinData, { by: ['a', 'J'] }),
      );
      results = pInst.toTidy(results);
      expect(results).to.eql(
        [
          { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
          { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
          { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
        ]
      );
    });

    it('Should work with objects + p5.Tables', function () {
      const data = [
        { a: 1, J: 'j', b: 10, c: 100 },
        { a: 1, J: 'k', b: 60, c: 600 },
        { a: 1, J: 'J', b: 30, c: 300 },
        { a: 2, J: 'j', b: 20, c: 200 },
        { a: 3, J: 'x', b: 50, c: 500 },
      ];
      const joinData = [
        { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
        { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
        { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
      ];
      let results = pInst.tidy(
        data,
        pInst.innerJoin(joinData, { by: ['a', 'J'] }),
      );
      expect(results).to.eql(
        [
          { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
          { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
          { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
        ]
      );
    });
  });

  describe('leftJoin()', function () {
    it('Should work with objects', function () {
      const data = [
        { a: 1, J: 'j', b: 10, c: 100 },
        { a: 1, J: 'k', b: 60, c: 600 },
        { a: 1, J: 'J', b: 30, c: 300 },
        { a: 2, J: 'j', b: 20, c: 200 },
        { a: 3, J: 'x', b: 50, c: 500 },
      ];
      const joinData = [
        { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
        { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
        { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
      ];
      const results = pInst.tidy(
        data,
        pInst.leftJoin(joinData, { by: ['a', 'J'] }),
      );
      expect(results).to.eql(
        [
          { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
          { a: 1, J: 'k', altJ: undefined, b: 60, c: 600, x: undefined, y: undefined },
          { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
          { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
          { a: 3, J: 'x', altJ: undefined, b: 50, c: 500, x: undefined, y: undefined },
        ]
      );
    });

    it('Should work with p5.Tables', function () {
      const data = pInst.toTable([
        { a: 1, J: 'j', b: 10, c: 100 },
        { a: 1, J: 'k', b: 60, c: 600 },
        { a: 1, J: 'J', b: 30, c: 300 },
        { a: 2, J: 'j', b: 20, c: 200 },
        { a: 3, J: 'x', b: 50, c: 500 },
      ]);
      const joinData = pInst.toTable([
        { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
        { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
        { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
      ]);
      let results = pInst.tidy(
        data,
        pInst.leftJoin(joinData, { by: ['a', 'J'] }),
      );
      results = pInst.toTidy(results);
      expect(results).to.eql(
        [
          { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
          { a: 1, J: 'k', altJ: undefined, b: 60, c: 600, x: undefined, y: undefined },
          { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
          { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
          { a: 3, J: 'x', altJ: undefined, b: 50, c: 500, x: undefined, y: undefined },
        ]
      );
    });

    it('Should work with p5.Tables + objects', function () {
      const data = pInst.toTable([
        { a: 1, J: 'j', b: 10, c: 100 },
        { a: 1, J: 'k', b: 60, c: 600 },
        { a: 1, J: 'J', b: 30, c: 300 },
        { a: 2, J: 'j', b: 20, c: 200 },
        { a: 3, J: 'x', b: 50, c: 500 },
      ]);
      const joinData = [
        { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
        { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
        { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
      ];
      let results = pInst.tidy(
        data,
        pInst.leftJoin(joinData, { by: ['a', 'J'] }),
      );
      results = pInst.toTidy(results);
      expect(results).to.eql(
        [
          { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
          { a: 1, J: 'k', altJ: undefined, b: 60, c: 600, x: undefined, y: undefined },
          { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
          { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
          { a: 3, J: 'x', altJ: undefined, b: 50, c: 500, x: undefined, y: undefined },
        ]
      );
    });

    it('Should work with objects + p5.Tables', function () {
      const data = [
        { a: 1, J: 'j', b: 10, c: 100 },
        { a: 1, J: 'k', b: 60, c: 600 },
        { a: 1, J: 'J', b: 30, c: 300 },
        { a: 2, J: 'j', b: 20, c: 200 },
        { a: 3, J: 'x', b: 50, c: 500 },
      ];
      const joinData = pInst.toTable([
        { a: 1, J: 'j', altJ: 'j', x: 'x1', y: 'y1' },
        { a: 1, J: 'J', altJ: 'J', x: 'x9', y: 'y9' },
        { a: 2, J: 'j', altJ: 'j', x: 'x2', y: 'y2' },
      ]);
      const results = pInst.tidy(
        data,
        pInst.leftJoin(joinData, { by: ['a', 'J'] }),
      );
      expect(results).to.eql(
        [
          { a: 1, J: 'j', altJ: 'j', b: 10, c: 100, x: 'x1', y: 'y1' },
          { a: 1, J: 'k', altJ: undefined, b: 60, c: 600, x: undefined, y: undefined },
          { a: 1, J: 'J', altJ: 'J', b: 30, c: 300, x: 'x9', y: 'y9' },
          { a: 2, J: 'j', altJ: 'j', b: 20, c: 200, x: 'x2', y: 'y2' },
          { a: 3, J: 'x', altJ: undefined, b: 50, c: 500, x: undefined, y: undefined },
        ]
      );
    });
  });
});
