const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });
  it("Should Start with favorite number 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("Should store number 7 ", async function () {
    const tx = await simpleStorage.store(7);
    await tx.wait(1);
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "7";

    assert.equal(currentValue.toString(), expectedValue);
  });
});
