/* eslint-disable max-lines */
import chai, { expect } from 'chai';
import Helper from '../e2e-helper';

chai.use(require('chai-fs'));

const assertArrays = require('chai-arrays');

chai.use(assertArrays);

describe('bit add command', function () {
  const helper = new Helper();
  after(() => {
    helper.destroyEnv();
  });
  describe('should add multiple components', function () {
    it('should add multiple components that depends with each other and has spec files', function () {
      this.timeout(10000);
      helper.reInitLocalScope();
      helper.copyFixtureComponents('add-multiple');
      helper.npmLink('bit-bin');
      helper.npmRunFile('add_multiple_test_files/index_three_components_with_specs.js');
      const status = helper.status();
      expect(status).to.have.string('add_multiple_test_files/a ... ok');
      expect(status).to.have.string('add_multiple_test_files/b ... ok');
      expect(status).to.have.string('add_multiple_test_files/c ... ok');
      const compData = helper.showComponent('add_multiple_test_files/a');
      expect(compData).to.have.string('Specs');
      expect(compData).to.have.string('add_multiple_test_files/a.spec.js');
    });
    it('should add 2 components that not depends with each other and has no spec files', function () {
      this.timeout(10000);
      helper.reInitLocalScope();
      helper.copyFixtureComponents('add-multiple');
      helper.npmLink('bit-bin');
      helper.npmRunFile('add_multiple_test_files/index_two_components_without_specs.js');
      const status = helper.status();
      expect(status).to.have.string('add_multiple_test_files/a ... ok');
      expect(status).to.have.string('add_multiple_test_files/c ... ok');
      const compData = helper.showComponent('add_multiple_test_files/a');
      expect(compData).to.not.have.string('Specs');
    });
  });
});
