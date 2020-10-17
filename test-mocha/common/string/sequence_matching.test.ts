import { assert } from "chai";

import { fuzzySequentialMatch } from "../../../src/common/string/filter/sequence-matching";

describe("fuzzySequentialMatch", () => {
  const entity = { entity_id: "automation.ticker", friendly_name: "Stocks" };

  const createExpectation: (
    pattern,
    expected
  ) => {
    pattern: string;
    expected: string | number | undefined;
  } = (pattern, expected) => ({
    pattern,
    expected,
  });

  const shouldMatchEntity = [
    createExpectation("", "automation.ticker"),
    createExpectation("automation.ticker", 138),
    createExpectation("automation.ticke", 129),
    createExpectation("automation.", 89),
    createExpectation("au", 17),
    createExpectation("automationticker", 107),
    createExpectation("tion.tick", 18),
    createExpectation("ticker", 1),
    createExpectation("automation.r", 89),
    createExpectation("tick", 1),
    createExpectation("aumatick", 15),
    createExpectation("aion.tck", 14),
    createExpectation("ioticker", 19),
    createExpectation("atmto.ikr", 1),
    createExpectation("uoaintce", 1),
    createExpectation("au.tce", 17),
    createExpectation("tomaontkr", 9),
    createExpectation("s", 7),
    createExpectation("stocks", 48),
    createExpectation("sks", 7),
  ];

  const shouldNotMatchEntity = [
    " ",
    "abcdefghijklmnopqrstuvwxyz",
    "automation.tickerz",
    "automation. ticke",
    "1",
    "noitamotua",
    "autostocks",
    "stox",
  ];

  describe(`Entity '${entity.entity_id}'`, () => {
    for (const expectation of shouldMatchEntity) {
      it(`matches '${expectation.pattern}' with return of '${expectation.expected}'`, () => {
        const res = fuzzySequentialMatch(
          expectation.pattern,
          entity.entity_id,
          entity.friendly_name
        );
        assert.equal(res, expectation.expected);
      });
    }

    for (const badFilter of shouldNotMatchEntity) {
      it(`fails to match with '${badFilter}'`, () => {
        const res = fuzzySequentialMatch(
          badFilter,
          entity.entity_id,
          entity.friendly_name
        );
        assert.equal(res, undefined);
      });
    }
  });
});
