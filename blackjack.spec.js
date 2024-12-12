

describe("dealerShouldDraw", function() {
    it("should return false for dealer hand of 9 and 10", function() {
      const dealerHand = [
        {displayVal: 'Nine', suit: 'hearts', val:9},
        {displayVal: 'Ten', suit: 'hearts', val:10}
      ]; // Example representation of a hand with a total of 19
      expect(dealerShouldDraw(dealerHand)).toBe(false);
    });
  
  });


  describe("dealerShouldDraw", function() {
    it("should return true for dealer hand of Ace, 6", function() {
        const dealerHand = [
            {displayVal: 'Ace', suit: 'hearts', val:1},
            {displayVal: 'Six', suit: 'hearts', val:6}
          ]; // Example representation of a hand with a total of 7
      expect(dealerShouldDraw(dealerHand)).toBe(true);
    });
  
  });


  describe("dealerShouldDraw", function() {
    it("should return false for dealer hand of Ace, 6 and 10", function() {
        const dealerHand = [
            {displayVal: 'Ace', suit: 'hearts', val:1},
            {displayVal: 'Six', suit: 'hearts', val:6},
            {displayVal: 'Ten', suit: 'hearts', val:10}
          ]; // Example representation of a hand with a total of 17
      expect(dealerShouldDraw(dealerHand)).toBe(false);
    });
  
  });


  describe("dealerShouldDraw", function() {
    it("should return true for dealer hand of 2, 4, 2, 5", function() {
        const dealerHand = [
            {displayVal: 'Two', suit: 'hearts', val:2},
            {displayVal: 'Four', suit: 'hearts', val:4},
            {displayVal: 'Two', suit: 'hearts', val:2},
            {displayVal: 'Five', suit: 'hearts', val:5}
          ]; // Example representation of a hand with a total of 13
      expect(dealerShouldDraw(dealerHand)).toBe(true);
    });
  
  });


  describe("unitTestTesting", function() {
    it("Testing unit test", function() {

        const random = Math.random()
        let result = (random > 0) ? true : false

      expect((random > 0) ? true : false).toBe(true);
    });
  
  });