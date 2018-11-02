QUnit.test("Here's a test that should always pass", function (assert) {
    assert.ok(1 <= "3", "1<3 - the first agrument is 'truthy', so we pass!");
});

QUnit.test('Testing analyzeGame function with several sets of inputs', function (assert) {
  assert.equal(analyzeGame([ ['X','X','X'],
                            ['O',undefined,'O'],
                            ['O',undefined,undefined] ] ), 'X', 'Tested with Row for X');
  assert.equal(analyzeGame([ ['X','O','X'],
                            ['O','O','O'],
                            ['X','X',undefined] ]), 'O', 'Tested with Row for O');
  assert.equal(analyzeGame([ ['X','','X'],
                            ['O','',''],
                            ['O','X',undefined] ]), false, 'Tested with no winner case');
  assert.equal(analyzeGame([ [,,],
                            [,,],
                            [,,] ]), false, 'Tested with Empty array');
//   assert.equal(analyzeGame(500, 500), 250000, 'Tested with two large positive numbers. ');
//   assert.equal(analyzeGame(-5, -5), 1, 'Tested with two negative numbers. Any arguments less than 1 will be set to 1.');
//  assert.throws(function () { analyzeGame('a', 'b'); }, /The given argument is not a number/, 'Passing in a string correctly raises an Error');
});
